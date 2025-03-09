const entryTitle = document.getElementById('entry-title');
const entryBody = document.getElementById('entry-body');
const submitButton = document.getElementById('submit-button');
const postedEntries = document.getElementById('entries');
const errorMsg = document.getElementById('error-msg');

document.addEventListener("DOMContentLoaded", function(){

    loadEntries();

    submitButton.addEventListener('click', () => {
        if (!entryTitle.value.trim() === '' && !entryBody.value.trim() === '') {
            const entryPost = {title: entryTitle.value.trim(), body: entryBody.value.trim()};
            // submitButton.removeAttribute(disabled);
            addEntry(entryPost);
            entryTitle.value = '';
            entryBody.value = '';
        } else {
            errorMsg.textContent = 'Parts of your entry are missing!'
        }
    });

    function addEntry(entry) {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
        displayEntry();
    }

    function displayEntry(entry) {
        const entryContainer = document.createElement('div');
        entryContainer.innerHTML = `<h2>${entry.title}</h2>
        <p>${entry.body}</p>`
        postedEntries.appendChild(entryContainer);
    }

    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.forEach((entry) =>
        displayEntry(entry));
    }
});