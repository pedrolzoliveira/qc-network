/*formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('deslogando...');
    fetch('/logout', {
        method: 'POST'
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


setInterval(() => {
    location.reload();
}, 3000);*/
