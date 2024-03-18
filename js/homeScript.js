const banner = document.getElementById("banner");
const anim = document.getElementById("mainAnim");
const cursorElement = document.getElementById("text-cursor");

const textArr = [
  "hello",
  "sample text",
  "lorem ipsum dolor sin blah blah blab",
];

function typeText(stringsArray, speed) {
  let currentStringIndex = 0;
  let currentCharIndex = 0;

  function type() {
    if (currentStringIndex < stringsArray.length) {
      const currentString = stringsArray[currentStringIndex];
      if (currentCharIndex < currentString.length) {
        const charSpan = document.createElement("span");
        charSpan.textContent = currentString.charAt(currentCharIndex);
        charSpan.classList.add("typing-animation");
        anim.appendChild(charSpan);
        currentCharIndex++;
        updateCursorPosition();
        setTimeout(type, speed);
      } else {
        currentStringIndex++;
        currentCharIndex = 0;
        const spaceSpan = document.createElement("span");
        spaceSpan.textContent = " ";
        anim.appendChild(spaceSpan);
        updateCursorPosition();
        setTimeout(type, speed * 2); // Delay between strings
      }
    }
  }

  type();
}

function updateCursorPosition() {
  const lastSpan = anim.lastChild;
  const rect = lastSpan.getBoundingClientRect();
  const bannerBox = banner.getBoundingClientRect();
  cursorElement.style.left =
    rect.right - bannerBox.left + window.scrollX + "px";
  cursorElement.style.top = rect.top - bannerBox.top + window.scrollY + "px";
}

setTimeout(() => {
  typeText(textArr, 200);
}, 1500);

window.addEventListener("resize", updateCursorPosition);
