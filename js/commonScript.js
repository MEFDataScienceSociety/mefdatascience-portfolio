const navElement = document.querySelector("header nav");
const toggleButton = document.querySelector("#navToggle");
const toggleEffect1 = document.querySelector(".symbolLine:nth-child(odd)");
const toggleEffect2 = document.querySelector(".symbolLine:nth-child(even)");
let navButtonDisabled = false;

function navToggle() {
  if (navElement.classList.contains("enabled")) {
    navElement.classList.remove("enabled");
    toggleEffect1.classList.remove("enabled");
    toggleEffect2.classList.remove("enabled");
  } else {
    navElement.classList.add("enabled");
    toggleEffect1.classList.add("enabled");
    toggleEffect2.classList.add("enabled");
  }
}

window.addEventListener("resize", () => {
  if (window.innerWidth < 900 && navButtonDisabled) {
    navButtonDisabled = false;
    toggleButton.classList.remove("invis");
    navElement.classList.remove("enabled");
  }
  //window width 900px isn't considered on purpose.
  else if (window.innerWidth > 900 && !navButtonDisabled) {
    toggleButton.classList.add("invis");
    navButtonDisabled = true;
    navElement.classList.add("enabled");
  }
});
