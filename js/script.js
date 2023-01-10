const URL = 'https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json';

async function getJSON() {
  try {
    const response = await fetch(URL);
    return await response.json();
  } catch (error) {
    console.error(error.message)
  }
}

async function iterarArray() {
  const data = await getJSON();

  if (data.)

  // console.log(question);
  // return question;
}

iterarArray()

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

