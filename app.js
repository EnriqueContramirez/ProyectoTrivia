function obtenerPreguntas () {
    fetch('https://opentdb.com/api.php?amount=10')
        .then((response)=>response.json ())
        .then((data)=> {
            let questions = data.results
            console.log(questions)
        })

}

obtenerPreguntas ();