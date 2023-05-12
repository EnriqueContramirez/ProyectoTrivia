// Comienzo declarando e inicializando mis variables y constantes
let difficulty = 0; 
let type = 0;
let category = 0; 
let puntaje = 0;
let panels;
const containerWelcome = document.getElementById("PantallaBienvenida")
const containerOptions = document.getElementById("container_options");
const containerquestions = document.getElementById("container_questions");
const containerPuntaje = document.getElementById("container_puntaje");
const buttonWelcome = document.getElementById("buttonWelcome");
const buttomStart = document.getElementById("generar-trivia")
const containerReinicio = document.getElementById("containerReinicio")
const Regresar_Inicio = document.getElementById("Regresar_Inicio")

buttonWelcome.addEventListener("click", configurarTrivia)
buttomStart.addEventListener("click", validarOpcionesCompletas);
Regresar_Inicio.addEventListener("click", configurarTrivia);

//con esta función se crea la pantalla de bienvenida a la trivia
function iniciarTrivia () {
    containerWelcome.style.display = "flex";
    containerOptions.style.display = "none";
    containerquestions.style.display = "none";
    containerPuntaje.style.display = "none";
    containerReinicio.style.display = "none";
}
// Con esta función se habilita para que aparezcan las opciones de configurar la trivia
function configurarTrivia () {
    containerWelcome.style.display = "none";
    containerOptions.style.display = "flex";
    containerquestions.style.display = "none";
    containerPuntaje.style.display = "none";
    containerReinicio.style.display = "none";   
}


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
// con esta función se muestra la pregunta con sus posibles respuestas para que el usuario pueda seleccionar una de ellas.
function mostrarPregunta(index){
    containerOptions.style.display = "none";
    containerquestions.style.display = "flex";
    containerReinicio.style.display = "flex";
    containerPuntaje.style.display = "flex";
    const pregunta = panels[index];
    const respuestas = pregunta.incorrect_answers.concat(pregunta.correct_answer).sort();
    containerquestions.innerHTML = `
    <ul class="questions_list">
        <li class="h3">QUESTION N° ${index + 1}</li>
        <li class="h4">${pregunta.question}</li>
        ${respuestas
          .map(
            (respuesta) => 
            `<a class="btn btn-outline-light" id="answer_${index}" onclick="mostrarSiguientePregunta(${index + 1}, panels)">${respuesta}</a>`
            )
          .join(" ")}
    </ul>
    `
}
// con esta función se van corriendo por cada una de las preguntas hasta llegar a la 10 para mostrar mensaje final y puntaje
function mostrarSiguientePregunta(index, panels){
    const pregunta = panels[index - 1];
    const respuestaCorrecta = pregunta.correct_answer;
    const respuestaSeleccionada = event.currentTarget.textContent;
    console.log(respuestaSeleccionada)
    if(index >= 10 ){
        if(respuestaSeleccionada === respuestaCorrecta){
            puntaje += 100;
        }
        containerquestions.innerHTML = `
        <p>Trivia Completed! Total Score: ${puntaje}</p>
        `
        containerPuntaje.style.display = "none"
    } else {      
        if(respuestaSeleccionada === respuestaCorrecta){
            puntaje += 100;
            containerPuntaje.innerText = `Score: ${puntaje}`;
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



window.addEventListener('load', iniciarTrivia)