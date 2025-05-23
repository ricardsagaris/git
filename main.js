const atminetaisVards = vardi[Math.floor(Math.random() * vardi.length)];

let currentRow = 0;

const guessInput = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-btn");
const message = document.getElementById("message");
const rows = document.querySelectorAll(".Rezgis");

submitBtn.addEventListener("click", () => {
  let guess = guessInput.value.trim().toUpperCase();

  if (guess.length !== 5) {
    message.textContent = "Vārdam jābūt tieši 5 burtiem!";
    return;
  }

  if (currentRow >= rows.length) {
    message.textContent = "Vairs nav brīvu mēģinājumu!";
    return;
  }

  const boxes = rows[currentRow].querySelectorAll(".letter-box");
  const result = salidziniVardus(guess, atminetaisVards);

  result.forEach((status, i) => {
    boxes[i].textContent = guess[i];
    boxes[i].classList.remove("ir", "navte", "nav");

    if (status === "ir") boxes[i].classList.add("ir");
    else if (status === "navte") boxes[i].classList.add("navte");
    else boxes[i].classList.add("nav");
  });

  if (guess === atminetaisVards) {
    message.textContent = "Apsveicu! Tu uzminēji vārdu!";
    submitBtn.disabled = true;
    guessInput.disabled = true;
  } else {
    currentRow++;
    guessInput.value = "";
    guessInput.focus();
    message.textContent = "";

    if (currentRow >= rows.length) {
      message.textContent = `Spēle beigusies! Pareizais vārds bija: ${atminetaisVards}`;
      submitBtn.disabled = true;
      guessInput.disabled = true;
    }
  }
});

function salidziniVardus(guess, target) {
  const result = Array(5).fill("nav");
  const targetLetters = target.split("");
  const guessLetters = guess.split("");

  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      result[i] = "ir";
      targetLetters[i] = null;
      guessLetters[i] = null;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (guessLetters[i]) {
      const idx = targetLetters.indexOf(guessLetters[i]);
      if (idx !== -1) {
        result[i] = "navte";
        targetLetters[idx] = null;
      }
    }
  }

  return result;
}
