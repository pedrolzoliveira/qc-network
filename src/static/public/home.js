form =  document.getElementById('formulario');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('deslogando...');
    fetch('/logout', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(json => {
        if (json.ok)
            location.reload();
    })
    .catch(err => console.log(err.message))
});