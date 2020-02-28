formulario.addEventListener('submit', function(e) {
    
    const myData = JSON.stringify(formDataToJson(new FormData(this)));

    e.preventDefault();
    fetch('/player', {
        method: 'POST',
        body: myData,
        headers: {
            "Content-Type": "application/json"
        },     
    })
    .then(response => response.json())
    .then(json => {
        if (json.ok)
            location.reload();
        else {
            alert(json.error);
        }
    })
    .catch(err => console.log(err.message))
});

