// Comienzo declarando e inicializando mis variables y constantes
let difficulty = 0; 
let type = 0;
let category = 0; 
let puntaje = 0;
let panels;
const containerOptions = document.getElementById("container_options");
const containerquestions = document.getElementById("container_questions");
const containerPuntaje = document.getElementById("container_puntaje");

//Con esta función obtendré la información de las preguntas y respuestas de acuerdo con los parametros que indique el usuario para guardarlas en una variable
function getData () {
    const URL =`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`;
    console.log(URL)
    return fetch(URL)
        .then((response)=>response.json ())
        .then((data)=> {
            panels = data.results;
            console.log(panels);
            return panels;
            })
        .catch(error => console.error(error));
}
// con esta función validamos que el usuario haya seleccionado una opción por categoria, tipo y dificultad para continuar
function validarOpcionesCompletas () {
    if (difficulty == 0 && type == 0 && category == 0){
        alert("Debe seleccionar una opción valida");
    } else {
        getData().then((data) => {
            panels = data;
            mostrarPregunta(0);
        });
    }
}
// con esta función se muestra la pregunta con sus posibles respuestas para que el usuario pueda seleccionar una de ellas, una vez seleccione una se mostrará la siguiente pregunta hasta llegar a la pregunta 10.
function mostrarPregunta(index){
    containerOptions.style.display = "none";
    const pregunta = panels[index];
    const respuestas = pregunta.incorrect_answers.concat(pregunta.correct_answer).sort();
    containerquestions.innerHTML = `
    <ul class="questions_list">
        <li>QUESTION N° ${index + 1}</li>
        <li>${pregunta.question}</li>
        ${respuestas
          .map(
            (respuesta) => 
            `<li><button id="answer_${index}" onclick="mostrarSiguientePregunta(${index + 1}, panels)">${respuesta}</button></li>`
            )
          .join(" ")}
      </ul>
    `
}
// con esta función se van corriend por cada una de las preguntas hasta llegar a la 10 para mostar mensaje final y puntaje
function mostrarSiguientePregunta(index, panels){
    if(index >= panels.length){
        containerquestions.innerHTML = `
        <p>Trivia Completed! Puntaje Total: ${puntaje}</p>


        `
    } else if (index < 10){
        const pregunta = panels[index - 1];
        const respuestaCorrecta = pregunta.correct_answer;
        console.log(respuestaCorrecta)
        const respuestaSeleccionada = event.currentTarget.textContent;
        console.log(respuestaSeleccionada)
        if(respuestaSeleccionada === respuestaCorrecta){
            puntaje += 100;
            containerPuntaje.innerText = `Puntaje: ${puntaje}`;
        }
        mostrarPregunta(index);
    }
  }


// Obtenemos los valores definidos por el usuario en la lista de selección de dificultad
difficulty = document.getElementById("difficulty").value;
document.getElementById("difficulty").addEventListener("change", (e) => {
    console.log(e.target.value);
    difficulty = e.target.value;
})

// Obtenemos los valores definidos por el usuario en la lista de selección de tipo de pregunta
type = document.getElementById("type").value;
document.getElementById("type").addEventListener("change", (e) => {
    console.log(e.target.value);
    type = e.target.value;
})

// Obtenemos los valores definidos por el usuario en la lista de selección de categoria
category = document.getElementById("category").value;
document.getElementById("category").addEventListener("change", (e) => {
    console.log(e.target.value);
    category = e.target.value;
})

// definimos la función de obtener la información de la API cuando el usuario le de clic al boton Generar Trivia
let buttomStart = document.getElementById("generar-trivia")
buttomStart.addEventListener("click", validarOpcionesCompletas);