
// fetch('https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json')
//   .then(response => response.json())
//   .then(data => {
//     arrayVacio = data;
//   });

// let arrayVacio;





let data;

async function getJSON() {
  try {
    const response = await fetch('https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json');
    data = await response.json();
  } catch (error) {
    console.error(message.error)
  }
}

getJSON()



//Pruebas

// let arrayVacio = [];

// async function getJsonQuestions() {
//   const response = await fetch('https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json')

//   let json = await response.json()
//   arrayVacio.push(json)
// }

// getJsonQuestions()

// console.log(arrayVacio);



// async function getJsonQuestions() {
//   try {
//     const response = await fetch('https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json')
//     let json = await response.json()
//     console.log(json);
//     return json;
//   } catch (error) {
//     console.error(error)
//   }
// }
// console.log(getJsonQuestions());



//Recuperar imagen

async function getPeticion() {
  const response = await fetch('https://raw.githubusercontent.com/Cjavierlopez/REP-DeliveriesHAB/main/projectONE/questions-images/question01.png');
  const peticion = await response.blob();

  const imagen = document.querySelector('#imagen');
  imagen.src = URL.createObjectURL(peticion);
  imagen.alt = "portada peliculas";
}
getPeticion()

