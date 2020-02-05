const form = document.getElementById('form');

form.addEventListener('submit', function(e) {
    e.preventDefault()

    const myData = JSON.stringify(formDataToJson(new FormData(this)));
    //if (!name.value().trim() || !email.value().trim() || !password.value().trim())
    //    return alert('Preencha todas as informações!');

    fetch('/signup', {
        method: 'POST',
        body: myData,
        headers: {
            "Content-Type": "application/json"
        },      
    })
    .then(result => result.json())
    .then(json => {
        console.log(json);
        if (json.ok)
            location.reload();
    });
    
});
