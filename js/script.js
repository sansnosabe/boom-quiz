const URL = 'https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json';

async function getJSON() {
  try {
    const response = await fetch(URL);
    return await response.json();
  } catch (error) {
    console.error(error.message)
  }
}

async function iterateArray() {
  const jsonArray = await getJSON();

  const value = jsonArray.map((entries, i) => {
    const question = entries.question
    const answers = entries.answers
    const indexQuestions = i
    return { question, answers, indexQuestions }
  })

  const sectionParent = document.querySelector("#my-section header")
  const containerQuestions = document.querySelector("#container-preguntas")

  value.forEach(element => {
    const index = Object.keys(jsonArray).findIndex(key => jsonArray[key].question === element.question)

    if (element.indexQuestions === index) {

      const questionTitleH2 = document.createElement('h2')
      sectionParent.appendChild(questionTitleH2)
      questionTitleH2.textContent = element.question

      element.answers.forEach(answer => {
        const buttonAnswers = document.createElement('button')
        buttonAnswers.textContent = answer
        containerQuestions.appendChild(buttonAnswers)
      })
    }
  })
}
iterateArray()





















// async function iterateArray() {
//   const jsonArray = await getJSON();

//   const value = jsonArray.map((entries, i) => {
//     const question = entries.question
//     const answerAndCorrect = [entries.answers, entries.correct]
//     const indexQuestions = i
//     return { question, answerAndCorrect, indexQuestions }
//   })
//   //Si indexQuestions es igual al Object keys de entries.question devuelve en el DOM un h2 con el question, un boton por cada entries.answer


//   if (value.map(elem => elem.indexQuestions) === index) {
//     console.log("hola")
//   }

// }

// iterateArray()

// async function generateQuestions() {
//   const array = await iterarArray();

//   const questionsIndex = array.find(element => element.index === 0);

//   if (questionsIndex) {
//     const questionTitle = document.querySelector('main section header h2');
//     questionTitle.innerHTML = questionsIndex.question;
//   }

//   return questionsIndex
// }

// generateQuestions();

