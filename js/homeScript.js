const banner = document.getElementById("banner");
const anim = document.getElementById("mainAnim");
const cursorElement = document.getElementById("text-cursor");
cursorElement.classList.add("animatedCursor");

const bannerFontSize = 50; //manually set this when changing banner font size in css

const typingSpeed = 80;
const showMS = 2000;
const hideMS = 1000;
const swapDelay = 0;

const textArr = [
  "Data Talks Etkinlikleri",
  "Python & SQL Database Eğitimi",
  "Excel Eğitimleri",
];
let currentTextIndex = 0;
let currentText = {
  text: textArr[0],
  delay: textArr[0].length * typingSpeed * 2 + showMS + swapDelay,
};

let typingStop = 0;
let noBannerText = true;

function typeText(stringInput, speed) {
  let currentStringIndex = 0;
  let currentCharIndex = 0;

  function type() {
    cursorElement.classList.remove("animatedCursor");
    const currentString = stringInput;
    if (currentCharIndex < currentString.length) {
      const charSpan = document.createElement("span");
      charSpan.textContent = currentString.charAt(currentCharIndex);
      charSpan.classList.add("typing-animation");
      anim.appendChild(charSpan);
      currentCharIndex++;
      updateCursorPosition();
      setTimeout(type, speed);
    } else {
      updateCursorPosition();
      cursorElement.classList.add("animatedCursor");
      setTimeout(deleteText, showMS, typingSpeed); // Delay between strings
    }
  }
  noBannerText = false;
  type();
}

function deleteText(speed) {
  var letterNodes = anim.children;
  var currentIndex = anim.childElementCount - 1;
  cursorElement.classList.remove("animatedCursor");
  function deleteOne() {
    if (anim.hasChildNodes) {
      const currentLetter = letterNodes[currentIndex];
      currentLetter.classList.remove("typing-animation");
      currentLetter.classList.add("delete-animation");
      if (currentIndex > 0) {
        currentIndex--;
        setTimeout(deleteOne, speed);
        updateCursorPosition();
      } else {
        cursorElement.classList.add("animatedCursor");
        noBannerText = true;
        swapText();
      }

      currentLetter.addEventListener(
        "animationend",
        () => {
          anim.removeChild(currentLetter);
        },
        false
      );
    }
  }
  deleteOne();
}

function swapText() {
  currentTextIndex++;
  let circularIndex = currentTextIndex % textArr.length;
  currentText = {
    text: textArr[circularIndex],
    delay: textArr[circularIndex].length * typingSpeed * 2 + showMS + swapDelay,
  }; //circular indexing
  updateBannerText();
}

function selectUpdate() {
  if (noBannerText) {
    resetCursorPosition();
  } else {
    updateCursorPosition();
  }
}

function updateCursorPosition() {
  if (anim.hasChildNodes) {
    const lastSpan = anim.lastChild;
    const rect = lastSpan.getBoundingClientRect();
    const bannerBox = banner.getBoundingClientRect();
    cursorElement.style.left =
      rect.right - bannerBox.left + window.scrollX + "px";
    cursorElement.style.top = rect.top - bannerBox.top + window.scrollY + "px";
  }
}

function resetCursorPosition() {
  cursorElement.style.left = "0px";
}

typeText(currentText.text, typingSpeed);

function updateBannerText() {
  resetCursorPosition();
  setTimeout(
    (a, b) => {
      typeText(a, b);
    },
    hideMS,
    currentText.text,
    typingSpeed
  );
}

window.addEventListener("resize", selectUpdate);
