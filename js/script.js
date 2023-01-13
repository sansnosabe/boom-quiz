const URL = 'https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json';
let score = 0;
let scoreLocal = 0;
let currentQuestion = 0;

async function fetchJSON(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const jsonArray = data;
    createDOM(jsonArray)
  } catch (error) {
    console.error(error.message);
  }
}
fetchJSON(URL)


function createDOM(jsonArray) {
  let articles = [];
  if (jsonArray) {
    const value = jsonArray.map((entries, i) => {
      const question = entries.question;
      const answers = entries.answers;
      const correct = entries.correct;
      const indexQuestions = i;
      return { question, answers, correct, indexQuestions };
    });

    const section = document.querySelector("section");
    if (section) {
      value.forEach(element => {
        const index = Object.keys(jsonArray).findIndex(
          key => jsonArray[key].question === element.question
        );

        if (element.indexQuestions === index) {


          const article = document.createElement("article");
          const header = document.createElement("header");
          const main = document.createElement("main");
          const questionTitleH2 = document.createElement("h2");
          const divQuestions = document.createElement("div");
          const figure = document.createElement("figure");
          const indexImage = index.toString().padStart(2, "0");
          const image = document.createElement("img");

          articles.push(article);
          console.log(articles);

          const textScore = document.querySelector(".textScore")
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

          element.answers.forEach(answer => {
            const buttonAnswers = document.createElement("button");
            buttonAnswers.textContent = answer;
            divQuestions.appendChild(buttonAnswers);


            buttonAnswers.addEventListener("click", () => {
              if (answer === element.correct) {
                updateScore()
                textScore.textContent = `Score ${scoreLocal}/${articles.length}`
                buttonAnswers.style.backgroundColor = "#0aaf0a"; //verde oscuro
              } else {
                textScore.textContent = `Score ${scoreLocal}/${articles.length}`
                buttonAnswers.style.backgroundColor = "#880000"; // rojo oscuro
              }
              Array.from(divQuestions.children).forEach(btn => {
                if (btn.textContent === element.correct) {
                  btn.style.backgroundColor = "#0aaf0a"; //verde oscuro
                } else if (btn !== buttonAnswers) {
                  btn.style.backgroundColor = "#ce1818"; //rojo claro
                }
                btn.setAttribute("disabled", true);
              });

              setTimeout(() => {
                changeQuestion(articles, section);
              }, 500);
            });





          });
        }
      });
    }
  }
}

function changeQuestion(articles, section) {
  if (currentQuestion < articles.length - 1) {
    currentQuestion++;
    console.log("currentQuestion" + currentQuestion);
    articles[currentQuestion].style.display = "block";
    articles[currentQuestion - 1].style.display = "none";
  } else if (currentQuestion === articles.length - 1) {
    articles[currentQuestion].style.display = "none";
    const h3score = document.querySelector(".textScore")
    h3score.style.display = "none";
    const resultScreen = document.createElement("div");
    resultScreen.innerHTML = `<h1>Tu puntación es: ${scoreLocal}</h1>`;
    section.appendChild(resultScreen).classList.add("finalScore");
    articles.forEach((article) => {
      article.style.display = "none";
    });
  }
}

function updateScore() {
  scoreLocal++;
  localStorage.setItem("score", scoreLocal);
}

