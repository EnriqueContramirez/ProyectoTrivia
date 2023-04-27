let difficulty = 0; 
let type = 0;
let category= 0; 
let panels;
let containerOptions = document.getElementById("container_options");
let containerquestions = document.getElementById("container_questions");
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

function mostrarPregunta(index){
    const pregunta = panels[index];
    const respuestas = pregunta.incorrect_answers.concat(pregunta.correct_answer).sort();
    containerquestions.innerHTML = `
    <ul class="questions_list">
        <li>QUESTION N° ${index + 1}</li>
        <li>${pregunta.question}</li>
        ${respuestas
          .map(
            (respuesta) => 
            `<li><button onclick='mostrarSiguientePregunta(${index + 1})'>${respuesta}</button></li>`
            )
          .join(" ")}
      </ul>
    `
}


function mostrarSiguientePregunta(index, panels){
    if(index >= panels.length){
      containerquestions.innerHTML = `
      <p>¡Trivia finalizada!</p>
      `
    } else {
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