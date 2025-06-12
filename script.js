const notesContainer = document.querySelector('.notes-container');
const createBtn = document.querySelector('.create-btn');

function updateStorage() {
    const notes = Array.from(notesContainer.querySelectorAll('.input-box')).map(
        note => note.innerHTML
    );
    localStorage.setItem('notes', JSON.stringify(notes));
}

function addNoteListeners(noteDiv) {
    const inputBox = noteDiv.querySelector('.input-box');
    const deleteImg = noteDiv.querySelector('img');
    inputBox.addEventListener('input', updateStorage);
    deleteImg.addEventListener('click', () => {
        noteDiv.remove();
        updateStorage();
    });
}

function createNote(content = '') {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';

    const inputBox = document.createElement('p');
    inputBox.className = 'input-box';
    inputBox.setAttribute('contenteditable', 'true');
    inputBox.setAttribute('aria-label', 'Note');
    inputBox.innerHTML = content;

    const deleteImg = document.createElement('img');
    deleteImg.src = 'images/delete.png';
    deleteImg.alt = 'Delete Note';
    deleteImg.title = 'Delete this note';

    noteDiv.appendChild(inputBox);
    noteDiv.appendChild(deleteImg);
    notesContainer.appendChild(noteDiv);

    addNoteListeners(noteDiv);
}

function showNotes() {
    notesContainer.innerHTML = '';
    const saved = localStorage.getItem('notes');
    if (saved) {
        const notes = JSON.parse(saved);
        notes.forEach(content => createNote(content));
    }
}

showNotes();

createBtn.addEventListener('click', () => {
    createNote();
    updateStorage();
});