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