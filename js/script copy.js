const URL = 'https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json';

async function getJSON() {
  try {
    const response = await fetch(URL);
    return await response.json();
  } catch (e) {
    console.error(e.message)
  }
}

console.log(getJSON());

async function iterarArray() {
  const data = await getJSON();

  let questions = [];

  data.map((element, i) => {
    questions.push(element.question)
  })

  // let elementoP = document.querySelector("p");
  // elementoP.textContent = questions[1];


}

iterarArray()

