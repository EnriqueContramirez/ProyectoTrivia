let difficulty 
let type
let category 
let containerOptions = document.getElementById("container_options")
function getData () {
    const URL =`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`;
    console.log(URL)
    fetch(URL)
        .then((response)=>response.json ())
        .then((data)=> {
            let panels = data.results
            console.log(panels)
            containerOptions.innerHTML = panels.map((panel) =>{
                return (
                    `
                    <ul class="characters_list">
					<li>QUESTIONS</li>
					<li>${panels.question}</li>
					<li>${panels.incorrect_answers}</li>
				    </ul>
                    `
                )

            }).join('')

        })
        .catch(error => console.error(error));
}

function validarOpcionesCompletas () {
    if (difficulty == 0 && type == 0 && category == 0){
        alert("Debe seleccionar una opción valida");
    } else {
        getData ();
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