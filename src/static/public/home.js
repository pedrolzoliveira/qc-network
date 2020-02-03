form =  document.getElementById('formulario');
form.addEventListener('submit', function(e) {
    e.preventDefault();

    fetch('/logout', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err.message))
});