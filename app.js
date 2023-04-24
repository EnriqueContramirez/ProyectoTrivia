// Obtenemos los valores definidos por el usuario en la lista de selección de dificultad
let difficulty = document.getElementById("difficulty");
difficulty.addEventListener("change", (e) => {
    console.log(e.target.value);
    difficulty = e.target.value;
    return difficulty;
})
// obtenemos los valores definidos por el usuario en la lista de selección de tipo de pregunta
let type = document.getElementById("type");
type.addEventListener("change", (e) => {
    console.log(e.target.value);
    type = e.target.value;
    return type;
})
// obtenemos los valores definidos por el usuario en la lista de selección de categoria
let category = document.getElementById("category")
category.addEventListener("change", (e) => {
    console.log(e.target.value);
    category = e.target.value;
    return category;
})

//Ahora definimos la URL de la API con los valores preterminados por el usuario antes de obtener la información
const URL =`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`;

function getData () {
    console.log(URL)
    fetch(URL)
        .then((response)=>response.json ())
        .then((data)=> {
            let questions = data.results
            console.log(questions)
        })
        .catch(error => console.error(error));
}

// definimos la función de obtener la información de la API cuando el usuario le de clic al boton Generar Trivia
let buttomStart = document.getElementById("generar-trivia")
buttomStart.addEventListener("click", getData);