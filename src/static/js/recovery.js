form.addEventListener('submit', function(e) {
    e.preventDefault()

    if (!email.value.trim())
        return alert('Email vazio');

    const myData = JSON.stringify(formDataToJson(new FormData(this)));
    
    fetch('/recoveryacc', {
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
            alert('Email enviado!');
        else {
            alert(json.error);
        }
    });
});
