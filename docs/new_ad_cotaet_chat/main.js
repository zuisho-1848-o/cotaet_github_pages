const searchWindow = document.querySelector(".searchWindow");
const suggest = document.querySelector(".suggest");
// const suggest_lis = document.querySelectorAll(".suggest li");

const suggestWords = [
    { "display": "広告の企画を探したい", "kana": "こうこくのきかくをさがしたい", "index": 0},
    { "display": "プランナーとして登録したい", "kana": "ぷらんなーとしてとうろくしたい", "index": 1},
    { "display": "このサービスについて聞きたい", "kana": "このさーびすについてききたい", "index": 2},
    { "display": "広告について聞きたいことがある", "kana": "こうこくについてききたいことがある", "index": 3},
];


document.addEventListener("click", (e) => {
    if(e.target.classList.contains("suggest_li")) {
        let index = e.target.id.split("_")[1];
        let askText = e.target.innerHTML;
        console.log(index);
        console.log(askText);
        window.location.href = `chat/?index=${index}&text=${askText}`; 
    }
})


searchWindow.addEventListener("focusin", (e) => {
    suggest.classList.add("is_active");
})

searchWindow.addEventListener("focusout", (e) => {
    suggest.classList.remove("is_active");
}, true)

searchWindow.addEventListener("input", (e) => {
    let inputText = e.target.value;
    // console.log(inputText);
    let toBeDisplayedWords = suggestWords.filter(word => word.display.includes(inputText)).concat(suggestWords.filter(word => !word.display.includes(inputText) && word.kana.includes(inputText)));
    // console.log(toBeDisplayedWords.length);
    suggest.innerHTML = toBeDisplayedWords.map(word => {
        // `<li id="suggest_${word.index}" class="suggest_li"><a href="chat/?index=${word.index}&text=${word.display}">${word.display}</a></li>`
        return `<li id="suggest_${word.index}" class="suggest_li">${word.display}</li>`
    }).slice(0,4).join("\n");
})

