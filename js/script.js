const URL = 'https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json';

async function getJSON() {
  try {
    const response = await fetch(URL);
    return await response.json();
  } catch (error) {
    console.error(message.error)
  }
}

async function iterarArray() {
  const data = await getJSON();
  const question = data.map((element, i) => {
    return {
      "question": element.question,
      "answer": element.answers,
      "correct": element.correct,
      "index": i
    }
  });
  return question;
}

async function generateQuestions() {
  const array = await iterarArray();

  const questionsIndex = array.find(element => element.index === 0);

  if (questionsIndex) {
    const questionTitle = document.querySelector('main h1');
    questionTitle.innerHTML = questionsIndex.question;

    const answerTitle = document.querySelector('main button');
    answerTitle.innerHTML = questionsIndex.answer;

  }
}

generateQuestions();

async function getPeticion() {
  const response = await fetch('https://raw.githubusercontent.com/Cjavierlopez/REP-DeliveriesHAB/main/projectONE/questions-images/question01.png');
  const image = await response.blob();

  const imagen = document.querySelector('main img');
  imagen.src = URL.createObjectURL(image);
  imagen.alt = "portada peliculas";
}
getPeticion()