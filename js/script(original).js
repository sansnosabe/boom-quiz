const URL = 'https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json';

// Función asincrona, hace la petición y nos devuelve los datos en formato JSON.
async function fetchJSON() {
  try {
    const response = await fetch(URL);
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

// Se encarga de gestionar el orden en que se ejecuta el programa llamando a fetchJSON() y createElementsFromArray(jsonArray)
//Estas funciones son llamadas en un orden específico para asegurar que se obtengan los datos desde la URL y se creen los elementos en el DOM en el orden correcto.
async function main() {
  const jsonArray = await fetchJSON();
  createElementsFromArray(jsonArray)
}
main()

// Se encarga de crear los elementos del DOM a partir del array de datos.
function createElementsFromArray(jsonArray) {
  if (jsonArray) {
    const value = jsonArray.map((entries, i) => {
      const question = entries.question
      const answers = entries.answers
      const indexQuestions = i
      return { question, answers, indexQuestions }
    });

    const section = document.querySelector("section")
    if (section) {
      value.forEach(element => {
        const index = Object.keys(jsonArray).findIndex(key => jsonArray[key].question === element.question)

        if (element.indexQuestions === index) {
          const article = document.createElement('article')
          section.appendChild(article)

          const header = document.createElement('header')
          article.appendChild(header)

          const main = document.createElement('main')
          article.appendChild(main)

          const questionTitleH2 = document.createElement('h2')
          header.appendChild(questionTitleH2)
          questionTitleH2.textContent = `${index + 1}. ${element.question}`

          const divQuestions = document.createElement('div')
          main.appendChild(divQuestions).classList.add("questions")

          const figure = document.createElement('figure')
          main.appendChild(figure)

          const indexImage = index.toString().padStart(2, '0');

          const image = document.createElement('img')
          image.src = `img/questions-images/question-${indexImage}.png`;
          image.alt = "caratula de pelicula";
          figure.appendChild(image)

          element.answers.forEach(answer => {
            const buttonAnswers = document.createElement('button')
            buttonAnswers.textContent = answer
            divQuestions.appendChild(buttonAnswers)
          })
        }
      })
    }
  }
}






