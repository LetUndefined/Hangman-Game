const raad = document.querySelector("#submit");
const letter = document.querySelector("#guess");
const lines = document.querySelectorAll("circle, line");
const submit = document.querySelector("#submit");
const mistakesText = document.querySelector("#mistakes-text");
const reset = document.querySelector("#reset");
const mistakesArray = document.querySelector("#mistakes-array");
const word = document.querySelector("#word");

let words = ["coding"];
let toBeGuessed = "";
let mistakes = 0;
let arrayIndex = lines.length - 1;
let mistakesVisual = [];
let correctLetters = [];

// Resets the game on button press
function resetGame() {
  lines.forEach((item) => {
    item.style.display = "none";
  });
  submit.disabled = false;
  submit.classList.remove("disable");
  arrayIndex = lines.length - 1;
  mistakes = 0;
  mistakesVisual = [];
  toBeGuessed = "";
  mistakesText.textContent = `Fouten: ${mistakes}`;
  mistakesArray.textContent = "Incorrecte letters:";
  correctLetters = [];
  wordGenerator();
}

// Generates a word for the game
function wordGenerator() {
  guess.value = "";
  let wordIndex = Math.floor(Math.random() * words.length);
  toBeGuessed = words[wordIndex];
  console.log(toBeGuessed);

  // Transforms word to underscores
  createUnderscore(toBeGuessed);
}

// Function to check if the letter is in the word
function checkWord() {
  if (guess.value.trim() === "") {
    alert("Het veld kan niet leeg zijn!");
    return;
  }

  // If the input value is in the toBeGuessed word
  if (toBeGuessed.includes(guess.value)) {
    if (!correctLetters.includes(guess.value)) {
      correctLetters.push(guess.value);
    }
  }

  // Update the visual status of the word
  wordUpdate();

  // If the letter is not in the word, handle mistakes
  if (!toBeGuessed.includes(guess.value)) {
    mistakes++;
    mistakesText.textContent = `Fouten: ${mistakes}`;
    lines[arrayIndex].style.display = "block";
    arrayIndex--;

    // Handle incorrect letters
    if (!mistakesVisual.includes(guess.value)) {
      mistakesVisual.push(guess.value);
      mistakesArray.textContent = `Incorrecte letters: ${mistakesVisual.join(", ")}`;
    } else {
      alert("Deze letter is al gebruikt!");
    }

    checkGameOver();
  }

  // Clear the guess input
  guess.value = "";
}

// Check if the game is lost (win condition not added yet)
function checkGameOver() {
  if (mistakes === lines.length) {
    alert("Je hebt verloren!");
    endGame();
  }
}

// Transforms the word into underscores
function createUnderscore(toBeGuessed) {
  let underscores = toBeGuessed
    .split("")
    .map(() => "_")
    .join(" ");
  word.textContent = underscores;
}

// Updates the word display with correct guesses
function wordUpdate() {
  let updatedWord = toBeGuessed
    .split("")
    .map((letter) => (correctLetters.includes(letter) ? letter : "_"))
    .join(" ");

  word.textContent = updatedWord;

  if (updatedWord.replace(/\s/g, "") === toBeGuessed) {
    alert("Gefeliciteerd! Je hebt het woord geraden!");
    endGame();
  }
}

function endGame() {
  submit.disabled = true;
  submit.classList.add("disable");
}

resetGame();

submit.addEventListener("click", checkWord);
reset.addEventListener("click", resetGame);
