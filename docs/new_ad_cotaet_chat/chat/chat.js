const chatArea = document.querySelector(".chatArea");

chatArea.insertAdjacentHTML("beforeend",`<h2>ご用件は、"${decodeURI(window.location.href.split("=")[2])}" ですね</h2>`);