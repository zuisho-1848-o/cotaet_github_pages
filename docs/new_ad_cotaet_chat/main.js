const searchWindow = document.querySelector(".searchWindow");
const suggest = document.querySelector(".suggest");


const suggestWords = [
    { "display": "広告の企画を探したい", "kana": "こうこくのきかくをさがしたい", "index": 0},
    { "display": "プランナーとして登録したい", "kana": "ぷらんなーとしてとうろくしたい", "index": 1},
    { "display": "このサービスについて聞きたい", "kana": "このさーびすについてききたい", "index": 2},
    { "display": "広告について聞きたいことがある", "kana": "こうこくについてききたいことがある", "index": 3},
];




searchWindow.addEventListener("focusin", (e) => {
    suggest.classList.add("is_active");
})

searchWindow.addEventListener("focusout", (e) => {
    suggest.classList.remove("is_active");
})

searchWindow.addEventListener("input", (e) => {
    let inputText = e.target.value;
    // console.log(inputText);
    let toBeDisplayedWords = suggestWords.filter(word => word.display.includes(inputText));
    suggest.innerHTML = toBeDisplayedWords.map(word => `<li id="suggest_${word.index}">${word.display}</li>`).join("\n")
})


