form.addEventListener('submit', function(e) {
    e.preventDefault()

    if (!nome.value.trim() || !email.value.trim() || !password.value.trim())
        return alert('Preencha todas as informações!');


    const myData = JSON.stringify(formDataToJson(new FormData(this)));
    
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
