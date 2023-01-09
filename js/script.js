
const arrayVacio = [];
const arrayVacio2 = [];

function getJSON() {
  fetch('https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json')
    .then(res => res.json())
    .then(data => {
      arrayVacio
      let prueba = data.map(questions => {
        return {
          "question": questions.question,
          "answers": questions.answers,
          "correct": questions.correct
        }
      })
      arrayVacio.push(prueba)
    })
}

getJSON()

console.log(arrayVacio);
console.log(arrayVacio2);

