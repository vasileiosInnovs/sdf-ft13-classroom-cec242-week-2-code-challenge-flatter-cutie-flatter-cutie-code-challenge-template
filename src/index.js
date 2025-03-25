// Your code here

let selectedCharacter = null;
const characterVotes = {};

function fetchCharacters() {
    fetch('http://localhost:3000/characters')
        .then((response) => response.json())
        .then((characters) => {
            renderCharacterNames(characters);
        })
        .catch(error => console.error('Error fetching characters:', error));
}

function renderCharacterNames(characters) {
    const characterNames = document.getElementById('character-bar');

    characters.forEach(character => {
        const span = document.createElement('span');
        span.textContent = character.name;
        characterNames.appendChild(span);

        if (!(character.id in characterVotes)) {
            characterVotes[character.id] = character.votes || 0;
        }

        span.addEventListener("click", () => handleClick(character));
    });
}

function handleClick(character) {
    selectedCharacter = character;

    const charName = document.querySelector('p#name');
    charName.textContent = character.name;

    const charImg = document.querySelector('img#image');
    charImg.src = character.image;
    charImg.alt = character.name;

    const displayVotes = document.getElementById('vote-count');
    displayVotes.textContent = characterVotes[character.id];es
}

function handleSubmissions() {
    document.querySelector('#votes-form').addEventListener('submit', (event) => {
        event.preventDefault();

        if (!selectedCharacter) {
            alert("Please select a character first!");
            return;
        }

        const newVote = document.getElementById('votes');
        const inputVote = parseInt(newVote.value) || 0;

        characterVotes[selectedCharacter.id] += inputVote;

        const displayVotes = document.getElementById('vote-count');
        displayVotes.textContent = characterVotes[selectedCharacter.id];

        newVote.value = "";
    });
}

document.addEventListener('DOMContentLoaded', function () {
    fetchCharacters();
    handleSubmissions();
});
