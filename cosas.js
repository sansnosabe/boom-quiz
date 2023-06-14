//Asi es como estaba al princio
// function updateTimer(articles) {
// 	const timerSpan = document.querySelector(".timer");
// 	timerSpan.textContent = timeLeft;

// 	if (timeLeft <= 0) {
// 		clearTimeout(timer);
// 		changeQuestion(articles);
// 	} else {
// 		timer = setTimeout(() => {
// 			timeLeft--;
// 			updateTimer(articles);
// 		}, 1000);
// 	}
// }

//opcion2
// function updateTimer(articles) {
// 	const timerSpan = document.querySelector(".timer");
// 	timerSpan.textContent = timeLeft;

// 	if (timeLeft <= 0) {
// 		clearTimeout(timer);
// 		changeQuestion(articles);
// 	} else {
// 		timer = setTimeout(() => {
// 			timeLeft--;
// 			updateTimer(articles);
// 			timerDiv.style.width = (timeLeft / 10) * 100 + "%"; // Actualizar el ancho de la barra de progreso
// 		}, 1000);
// 	}
// }

// document.addEventListener("DOMContentLoaded", function() {
// 	var timerDiv = document.querySelector(".timer");
// 	timerDiv.style.width = "100%"; // Establecer el ancho inicial de la barra de progreso
// 	setTimeout(function() {
// 		timerDiv.style.width = "0%";
// 	}, 10000);
// });