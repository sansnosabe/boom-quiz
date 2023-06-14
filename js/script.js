"use estrict";

const URL = "https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json";

const numberOfQuestions = 10;

let score = 0;
let scoreLocal = 0;
let currentQuestion = 0;
let timeLeft;
let timer;

async function fetchJSON(URL) {
	try {
		const response = await fetch(URL);
		const data = await response.json();
		// const jsonArray = data.slice(0, numberOfQuestions);
		const jsonArray = data;
		createDOM(jsonArray);
	} catch (error) {
		console.error(error.message);
	}
}
fetchJSON(URL);

function createDOM(jsonArray) {
	let articles = [];
	if (jsonArray) {
		const value = jsonArray.map((entries, index) => {
			const question = entries.question;
			const answers = entries.answers;
			const correct = entries.correct;
			const indexQuestions = index;
			return { question, answers, correct, indexQuestions };
		});

		const section = document.querySelector("section");
		if (section) {
			value.forEach((element) => {
				const index = Object.keys(jsonArray).findIndex((key) => jsonArray[key].question === element.question);
				if (element.indexQuestions === index) {
					const arrayElementsToCreate = ["article", "header", "main", "h2", "div", "figure", "img"];
					const elements = arrayElementsToCreate.map((element) => document.createElement(element));
					const [article, header, main, questionTitleH2, divQuestions, figure, image] = elements;
					const indexImage = index.toString().padStart(2, "0");
					const textScore = document.querySelector(".textScore");

					articles.push(article);
					textScore.textContent = `Score ${scoreLocal}/${articles.length}`;

					section.appendChild(article);
					article.appendChild(header);
					article.appendChild(main);
					header.appendChild(questionTitleH2);
					main.appendChild(divQuestions).classList.add("questions");
					main.appendChild(figure);
					figure.appendChild(image);

					article.style.display = index === currentQuestion ? "block" : "none";
					questionTitleH2.textContent = `${index + 1}. ${element.question}`;
					image.src = `img/questions-images/question-${indexImage}.png`;
					image.alt = "caratula de pelicula";

					createButtonsForAnswers(element, articles, divQuestions, textScore);
				}
			});
		}
	}
	startTimer(articles);
}

function mixAnswers(array) {
	array.forEach((element, index) => {
		const randomIndex = Math.floor(Math.random() * array.length);
		array[index] = array[randomIndex];
		array[randomIndex] = element;
	});
	return array;
}

function createButtonsForAnswers(element, articles, divQuestions, textScore) {
	mixAnswers(element.answers);
	element.answers.forEach((answer) => {
		const buttonAnswers = document.createElement("button");
		buttonAnswers.textContent = answer;
		divQuestions.appendChild(buttonAnswers);

		changeBackground(buttonAnswers, answer, element, textScore, articles, divQuestions);
	});
}

function startTimer(articles) {
	timeLeft = 10;
	updateTimer(articles);
}

function updateTimer(articles) {
	const timerSpan = document.querySelector(".timer");
	timerSpan.textContent = timeLeft;

	if (timeLeft <= 0) {
		clearTimeout(timer);
		changeQuestion(articles);
	} else {
		timer = setTimeout(() => {
			timeLeft--;
			updateTimer(articles);
		}, 1000);
	}
}

function changeBackground(buttonAnswers, answer, element, textScore, articles, divQuestions) {
	buttonAnswers.addEventListener("click", () => {
		clearTimeout(timer);
		if (answer === element.correct) {
			updateScore();
			textScore.textContent = `Score ${scoreLocal}/${articles.length}`;
			buttonAnswers.style.backgroundColor = "#0aaf0a";
		} else {
			textScore.textContent = `Score ${scoreLocal}/${articles.length}`;
			buttonAnswers.style.backgroundColor = "#ce1818";
		}

		Array.from(divQuestions.children).forEach((btn) => {
			if (btn.textContent === element.correct) {
				btn.style.backgroundColor = "#0aaf0a";
			}
			btn.setAttribute("disabled", true);
			btn.classList.remove("hover-class");
		});

		setTimeout(() => {
			changeQuestion(articles);
		}, 900);
	});
}

function changeQuestion(articles) {
	if (currentQuestion < articles.length - 1) {
		currentQuestion++;
		articles[currentQuestion].style.display = "block";
		articles[currentQuestion - 1].style.display = "none";
		startTimer(articles);
	} else if (currentQuestion === articles.length - 1) {
		articles[currentQuestion].style.display = "none";
		const h3score = document.querySelector(".textScore");
		h3score.style.display = "none";

		const timerSpan = document.querySelector(".timer");
		timerSpan.style.display = "none";

		const resultDiv = document.querySelector(".finalScore");

		const resultTitle = document.createElement("h3");
		const ancorButton = document.createElement("a");
		const returnButton = document.createElement("button");

		resultDiv.appendChild(resultTitle);
		resultDiv.appendChild(ancorButton);
		ancorButton.appendChild(returnButton);

		resultTitle.innerHTML = `Your score is: ${scoreLocal}/${articles.length}`;
		ancorButton.href = "index.html";
		returnButton.innerHTML = "Return";

		articles.forEach((article) => {
			article.style.display = "none";
		});
	}
}

function updateScore() {
	scoreLocal++;
	localStorage.setItem("score", scoreLocal);
}
