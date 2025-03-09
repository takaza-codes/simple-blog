const entryTitle = document.getElementById('entry-title');
const entryBody = document.getElementById('entry-body');
const submitButton = document.getElementById('submit-button');
const postedEntries = document.querySelector('.entries');
const errorMsg = document.getElementById('error-msg');

document.addEventListener("DOMContentLoaded", function() {

    loadEntries();

    submitButton.addEventListener('click', () => {
            const entryPost = {title: entryTitle.value.trim(), body: entryBody.value.trim()};
            if (entryPost.title === '' || entryPost.body === '') {
                errorMsg.textContent = 'Both fields are required!';
                return;
            } else {
                errorMsg.textContent = '';
            }
            addEntry(entryPost);
            entryTitle.value = '';
            entryBody.value = '';
    });

    function addEntry(entry) {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(entry),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save entry');
            }
            return response.json();
        })
        .then(savedEntry => {
            const entries = JSON.parse(localStorage.getItem('entries')) || [];
            entries.push(savedEntry);
            localStorage.setItem('entries', JSON.stringify(entries));
            displayEntry(savedEntry);
        })
        .catch((error) => {
            errorMsg.textContent = `Failed to save entry: ${error}`;
        });
    }
    
    function displayEntry(entry) {
        const entryContainer = document.createElement('div');
        entryContainer.classList.add('new-entry');
        entryContainer.innerHTML = `<h3>${entry.title}</h3>
        <p>${entry.body}</p>`
        postedEntries.prepend(entryContainer);
    }

    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.forEach((entry) =>
        displayEntry(entry));
    }
});

// localStorage.removeItem('entries');
// console.log(JSON.parse(localStorage.getItem('entries')));