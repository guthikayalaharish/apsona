document.addEventListener('DOMContentLoaded', () => {
    const addTextButton = document.getElementById('addTextButton');
    const noteInputContainer = document.getElementById('noteInputContainer');
    const noteTitle = document.getElementById('noteTitle');
    const noteInput = document.getElementById('noteInput');
    const addNoteButton = document.getElementById('addNoteButton');
    const noteList = document.getElementById('noteList');
    const binContent = document.getElementById('binContent');
    const binNoteList = document.getElementById('binNoteList');
    const binLink = document.getElementById('binLink');
    const notesLink = document.getElementById('notesLink');
    const mainContent = document.getElementById('mainContent');

    let notes = [];
    let bin = [];

    addTextButton.addEventListener('click', () => {
        noteInputContainer.style.display = 'flex';
    });

    addNoteButton.addEventListener('click', () => {
        const titleText = noteTitle.value.trim();
        const noteText = noteInput.value.trim();
        if (noteText) {
            addNote(titleText, noteText);
            noteTitle.value = '';
            noteInput.value = '';
            noteInputContainer.style.display = 'none';
        }
    });

    binLink.addEventListener('click', () => {
        mainContent.style.display = 'none';
        binContent.style.display = 'block';
        renderBinNotes();
    });

    notesLink.addEventListener('click', () => {
        binContent.style.display = 'none';
        mainContent.style.display = 'block';
        renderNotes();
    });

    function addNote(title, text) {
        const note = {
            id: Date.now(),
            title,
            text
        };
        notes.push(note);
        renderNotes();
    }

    function renderNotes() {
        noteList.innerHTML = '';
        if (notes.length === 0) {
            noteList.innerHTML = `
                <div class="empty-notes">
                    <img src="lightbulb-icon.png" alt="Lightbulb">
                    <p>Notes you add appear here</p>
                </div>
            `;
        } else {
            notes.forEach(note => {
                const noteElement = document.createElement('div');
                noteElement.classList.add('note');
                noteElement.innerHTML = `
                    <div class="note-content">
                        <div>
                            <h3>${note.title}</h3>
                            <p>${note.text}</p>
                        </div>
                        <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
                    </div>
                `;
                noteList.appendChild(noteElement);
            });
        }
    }

    function renderBinNotes() {
        binNoteList.innerHTML = '';
        if (bin.length === 0) {
            binNoteList.innerHTML = `
                <div class="empty-notes">
                    <img src="lightbulb-icon.png" alt="Lightbulb">
                    <p>No notes in the bin</p>
                </div>
            `;
        } else {
            bin.forEach(note => {
                const noteElement = document.createElement('div');
                noteElement.classList.add('note');
                noteElement.innerHTML = `
                    <div class="note-content">
                        <div>
                            <h3>${note.title}</h3>
                            <p>${note.text}</p>
                        </div>
                        <button class="delete-btn" onclick="restoreNote(${note.id})">Restore</button>
                    </div>
                `;
                binNoteList.appendChild(noteElement);
            });
        }
    }

    function deleteNote(id) {
        const noteIndex = notes.findIndex(note => note.id === id);
        if (noteIndex !== -1) {
            bin.push(notes[noteIndex]);
            notes.splice(noteIndex, 1);
            renderNotes();
        }
    }

    function restoreNote(id) {
        const noteIndex = bin.findIndex(note => note.id === id);
        if (noteIndex !== -1) {
            notes.push(bin[noteIndex]);
            bin.splice(noteIndex, 1);
            renderNotes();
            renderBinNotes();
        }
    }

    window.deleteNote = deleteNote;
    window.restoreNote = restoreNote;
});
