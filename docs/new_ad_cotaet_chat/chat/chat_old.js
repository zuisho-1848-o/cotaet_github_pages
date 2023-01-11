class ChatManager {
    constructor(defaultSleepTime, chatElementClassName, chatMainElementClassName) {
        this.chat = document.getElementsByClassName(chatElementClassName)[0];
        this.chatMain = document.getElementsByClassName(chatMainElementClassName)[0];
        this.defaultSleepTime = defaultSleepTime;
    }

    /**
    * Chat にbot からの textChat を代入する
    * @param {string} inputText - textChat の text
    */
    async insertTextChatFromBot(inputText, sleepTime=this.defaultSleepTime, id=undefined) {
        console.log(inputText);
        const texts = inputText.split("\n");
        console.log(texts);
        for(let text of texts) {
            text = text.split("＊").join("<br>");
            await sleep(sleepTime);
            let insertHTML = `<div class='chatMessageBlock chatFromBot'`
            if(id) {
                insertHTML += ` id="${id}"`
            }
            insertHTML += `'>${text}</div>`
            this.chatMain.insertAdjacentHTML("beforeend", insertHTML);
            this.chatMain.scrollTop = this.chatMain.scrollHeight;
            sleepTime = this.defaultSleepTime;  // これがないと sleepTime が0などで渡された時に全部のメッセージが一瞬で出てしまう。
        }
    }
}

// class utilities {
//     constructor() {}

//     sleep() {}
// }


const defaultSleepTime = 500;
const chat = document.getElementsByClassName("chat")[0];
const chatMain = document.getElementsByClassName("chatMain")[0];
const tags = [
    {
        category: "ターゲット業種",
        values: ["学校", "高校", "大学", "専門学校", "専門スクール"]
    }
]



/**
 * 指定したミリ秒、非同期で待機する。
 * @param {number} milliSeconds - 何ミリ秒待つか
 * @returns {Promise<null>}
*/
sleep = (milliSeconds) => new Promise(resolve => setTimeout(resolve, milliSeconds));


/**
 * Chat にbot からの textChat を代入する
 * @param {Element} element - bot からの textChat を代入する HTML 要素
 * @param {string} qText - textChat の text
 */
const insertTextChatFromBot = async (element, qText, sleepTime=defaultSleepTime, id=undefined) => {
    console.log(qText);
    // qText = replaceById(qText, getAllChatAnswerDataFromLocalStorage());
    const texts = qText.split("\n");
    console.log(texts);

    for(let text of texts) {
        text = text.split("＊").join("<br>");
        await sleep(sleepTime);
        let insertHTML = `<div class='chatMessageBlock chatFromBot'`
        if(id) {
            insertHTML += ` id="${id}"`
        }
        insertHTML += `'>${text}</div>`
        element.insertAdjacentHTML("beforeend", insertHTML);
        element.scrollTop = element.scrollHeight;
        sleepTime = defaultSleepTime;  // これがないと sleepTime が0などで渡された時に全部のメッセージが一瞬で出てしまう。
    }
}


const insertPDFInputBlock = async (element) => {
    let insertHTML = `<div class="chatMessageBlock choiceBlock" id="PDFInputBlock">
    <input type="file" id="PDFInput" accept=".pdf" class="PDFInput">
    <label for="PDFInput">アップロードするPDFを選択してください。</label>
</div>`;
    await sleep(defaultSleepTime);
    element.insertAdjacentHTML("beforeend", insertHTML);
    element.scrollTop = element.scrollHeight;
}

const handlePDFInput = async (chatMain, target) => {
    const PDF = target.files[0];
    console.log(PDF.name);
    console.log(PDF.size);
    console.log(PDF.type);
    await insertTextChatFromBot(chatMain, `${PDF.name} という名前のPDFをご登録いただきありがとうございます。\n続いて、このPDFの企画に合うタグを次からお選びください。`);
    await insertTags(chatMain, tags[0], "tag0");
}



const insertTags = async (element, tag, id) => {
    const category = tag.category;
    const tagValues = tag.values;
    let insertHTML = `<div class="chatMessageBlock choiceBlock tagMultiChoiceInputBlock">
    <span class="TagInputTitle">${category}</span>
    <div class="tagMultiChoiceInputLabelBlock" id="tagMultiChoiceInputLabelBlock-${id}">\n`;
    for(let i in tagValues) {
        let value = tagValues[i];
        let HTMLId = `tagMultiChoiceInput-${id}-${i}`;
        insertHTML += `<input type="checkbox" class="tagMultiChoiceInput" id="${HTMLId}" value="${value}"></input>
    <label for="${HTMLId}" class="tagMultiChoiceInputLabel">${value}</label>\n`
    }
    insertHTML += `</div>\n`;
    insertHTML += `<input id="${id + "-submit"}" class="answerSubmitButton" type="button" value="次へ" >\n`

    insertHTML += `</div>\n`;
    await sleep(defaultSleepTime);
    element.insertAdjacentHTML("beforeend", insertHTML);
    element.scrollTop = element.scrollHeight;
}


const handleAnswerSubmit = async (element, target) => {
    // tag だけ実装
    const category = "ターゲット業種"
    const tagInputs = document.querySelectorAll(".tagMultiChoiceInputLabelBlock input");
    console.log(tagInputs);
    const checkedTagInputs = [...tagInputs].filter(elem => elem.checked);
    const checkedTagTexts = checkedTagInputs.map(elem => elem.value);
    console.log(checkedTagTexts);
    await insertTextChatFromBot(element, `${category} は ${checkedTagTexts.join(", ")} ですね。`);
};



async function main() {
    const matterText = decodeURI(window.location.href.split("=")[2]);
    await insertTextChatFromBot(chatMain, `ご用件は、"${matterText}" ですね。`)
    if(matterText != "プランナーとして登録したい") return;
    await insertTextChatFromBot(chatMain, "まず初めに、プランのPDFを登録してください。");
    await insertPDFInputBlock(chatMain);
}



// 増加する可能性のある要素に対する click event をまとめて受け取る
document.addEventListener('click', async (e) => {
    [...document.querySelectorAll(".choiceBlock")].forEach(elem => {elem.style["pointer-events"] = "none"});

    if (e?.target?.classList?.contains("singleChoiceOptionLabel")) {
        // 単一選択のlabelに対するクリックイベントを設定
        // await handleSingleChoiceOptionLabelClick(chatMain, e.target);

    } else if(e?.target?.classList?.contains("chatStart") || e?.target?.classList?.contains("closeButton")) {
        // chat の開閉を操作
        chatStart.classList?.toggle("display-none");
        chat?.classList?.toggle("display-none");

        // 必要ならば全画面にする。
        if(e?.target?.classList?.contains("closeButton") && useFullScreen && document.exitFullscreen) document.exitFullscreen();

    } else if(e?.target?.classList?.contains("answerSubmitButton")) {
        // 複数選択やテキスト入力に対するクリックイベントを設定
        await handleAnswerSubmit(chatMain, e.target);
    }

    setTimeout(() => {
        [...document.querySelectorAll(".choiceBlock")].forEach(elem => {elem.style["pointer-events"] = "auto"});
    }, 2000);
});

document.addEventListener("change", async (e) => {
    if(e?.target?.classList?.contains("PDFInput")) {
        await handlePDFInput(chatMain, e.target);
    }
})


main()
