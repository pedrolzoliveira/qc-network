
const form = document.getElementById('form');

form.addEventListener('submit', function(e) {
    e.preventDefault()

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
    });
});
