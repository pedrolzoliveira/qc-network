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


form_tournament = document.getElementById('tournament_form')
form_tournament.addEventListener('submit', function(e) {
    e.preventDefault();

    json = JSON.parse(document.getElementById('json').value);
    console.log(json);
    fetch('/ctournament', {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            "Content-Type": "application/json"
        }, 
        
    })
    .then(result => result.json())
    .then(jsn => console.log(jsn))
    .catch(err => console.log(err.message));
});
