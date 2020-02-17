function InsertInTable(table, content) {
    table.insertRow(table.rows.length).insertCell(0).innerHTML = content;
}

/*
let data = '{}';
fetch('/mytournaments', {
    method: 'POST',
    body: data,
    headers: {
        "Content-Type": "application/json"
    }
})
.then(response => response.json())
.then(json => {
    if (json.error) {
        return alert(json.error);
    } else {
        return console.log(json);
    }
})
.catch();*/