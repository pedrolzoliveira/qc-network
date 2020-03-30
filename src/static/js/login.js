
form.addEventListener('submit', function(e) {
    e.preventDefault()

    if (!email.value.trim() || !password.value)
        return alert('informações em branco!');

    const myData = JSON.stringify(formDataToJson(new FormData(this)));
    
    fetch('/session', {
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
        else {
            alert(json.error);
        }
    });
});
