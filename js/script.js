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

  const section = document.querySelector("section")

  value.forEach(element => {
    const index = Object.keys(jsonArray).findIndex(key => jsonArray[key].question === element.question)

    if (element.indexQuestions === index) {

      const questionTitleH2 = document.createElement('h2')
      section.appendChild(questionTitleH2)
      questionTitleH2.textContent = element.question

      element.answers.forEach(answer => {
        const buttonAnswers = document.createElement('button')
        buttonAnswers.textContent = answer
        section.appendChild(buttonAnswers)
      })
    }
  })
}
iterateArray()