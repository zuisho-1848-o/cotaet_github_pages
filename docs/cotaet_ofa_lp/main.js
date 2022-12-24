const hamburgerBtn = document.getElementById("hamburgerBtn");
hamburgerBtn.addEventListener("click", (e) => {
    document.querySelector("header nav ul").classList.toggle("active");
});


let popUpTargets = document.querySelectorAll('.scrollPopUp,.scrollLeftPop,.scrollRightPop');

window.addEventListener('scroll', function () {
    var scroll = window.scrollY; //スクロール量を取得
    var windowHeight = window.innerHeight; //画面の高さを取得
    for (let target of popUpTargets) { //ターゲット要素がある分、アニメーション用のクラスをつける処理を繰り返す
        var targetPos = target.getBoundingClientRect().top + scroll; //ターゲット要素の位置を取得
        if (scroll > targetPos - windowHeight) { //スクロール量 > ターゲット要素の位置
            target.classList.add('blockIn');
        }
    }
});


// const internalATag = document.querySelectorAll('a[href^="#"]');
// internalATag.forEach(aTag => aTag.addEventListener("click", (e) => {
//     e.target.getAttribute('href');
// }))


// https://pengi-n.co.jp/blog/smoothscroll/

// $(function () {
//     $('a[href^="#"]').click(function () {
//         var href = $(this).attr("href");
//         var target = $(href == "#" || href == "" ? 'html' : href);
//         var position = target.offset().top;
//     　　 var speed = 500;
//         $("html, body").animate({
//             scrollTop: position
//         }, speed, "swing");
//         return false;
//         });
//     });