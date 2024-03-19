const banner = document.getElementById("banner");
const anim = document.getElementById("mainAnim");
const cursorElement = document.getElementById("text-cursor");
cursorElement.classList.add("animatedCursor");
const bannerImageContainer = document.getElementById("bannerImage");

const bannerFontSize = 60; //manually set this when changing banner font size in css

const typingSpeed = 100;
const showMS = 2000;
const hideMS = 1000;
const swapDelay = 0;

const textArr = [
  //the strings to be cycled for the banner animation.
  "Data Talks Etkinlikleri",
  "Python & SQL Database Eğitimi",
  "Excel Eğitimleri",
];
const imageURLs = [
  //the file names of the banner slides, it is ordered.
  "Logo-full.jpg",
  "logo.png",
];
let currentTextIndex = 0;
let currentText = {
  text: textArr[0],
  delay: textArr[0].length * typingSpeed * 2 + showMS + swapDelay,
};
let imageCircularIndex = 0;

let typingStop = 0;
let noBannerText = true;

function typeText(stringInput, speed) {
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

  type();
  noBannerText = false;
}

function deleteText(speed) {
  var letterNodes = anim.children;
  cursorElement.classList.remove("animatedCursor");
  function deleteOne() {
    if (anim.hasChildNodes) {
      const currentLetter = letterNodes[anim.childElementCount - 1];
      currentLetter.classList.remove("typing-animation");
      currentLetter.classList.add("delete-animation");
      currentLetter.addEventListener("animationend", () => {
        if (anim.lastChild == currentLetter) anim.removeChild(currentLetter);
      });
      if (anim.childElementCount > 1) {
        //if not the last node
        setTimeout(deleteOne, speed);
        updateCursorPosition();
      } else {
        cursorElement.classList.add("animatedCursor");
        noBannerText = true;
        swapText();
      }
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
    try {
      const lastSpan = anim.lastChild;
      const rect = lastSpan.getBoundingClientRect();
      const bannerBox = banner.getBoundingClientRect();
      cursorElement.style.left = rect.right - bannerBox.left + "px";
      cursorElement.style.top = rect.top - bannerBox.top + "px";
    } catch (error) {
      //handle error appropriately
      console.log(error);
    }
  }
}

function resetCursorPosition() {
  cursorElement.style.left = "0px";
}

typeText(currentText.text, typingSpeed);
changeBannerImage(imageURLs[imageCircularIndex++ % imageURLs.length]);

function updateBannerText() {
  resetCursorPosition();
  changeBannerImage(imageURLs[imageCircularIndex++ % imageURLs.length]);
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

function changeBannerImage(imageFileName) {
  function appendNewImage() {
    const newImage = new Image();
    newImage.src = "images/" + imageFileName;
    newImage.addEventListener("load", () => {
      newImage.style.animationName = "fadeIn";
      bannerImageContainer.appendChild(newImage);
    });
  }

  if (bannerImageContainer.firstChild) {
    const currentImage = bannerImageContainer.firstChild;
    currentImage.style.animationName = "fadeOut";
    currentImage.addEventListener("animationend", () => {
      bannerImageContainer.innerHTML = "";
      appendNewImage();
    });
  } else {
    appendNewImage();
  }
}

//changeBannerImage(fileNameAndExtension) for changing banner image
