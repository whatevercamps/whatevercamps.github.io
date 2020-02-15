"use strict";

var spanishContent = [];
var spanishParents = [];

var englishContent = [];
var englishParents = [];

var currentLang = "en";

const changeLanguage = english => {
  console.log("change to english", english);
  if (english) {
    spanishContent = document.querySelectorAll("*[lang='es']");
    spanishContent.forEach(element => element.remove());

    englishParents.forEach((parent, index) => {
      parent.appendChild(englishContent[index]);
    });
  } else {
    englishContent = document.querySelectorAll("*[lang='en']");

    englishContent.forEach(element => element.remove());

    spanishParents.forEach((parent, index) => {
      parent.appendChild(spanishContent[index]);
    });
  }
};

window.onload = () => {
  watchSidebar();

  spanishContent = document.querySelectorAll("*[lang='es']");
  englishContent = document.querySelectorAll("*[lang='en']");

  spanishContent.forEach(element => {
    var parent = element.parentElement;
    spanishParents.push(parent);
    parent.removeChild(element);
  });

  englishContent.forEach(element => {
    var parent = element.parentElement;
    englishParents.push(parent);
  });

  if ($(".typed-space").length == 1) {
    console.log("jeje");
    var words = [
      "Hi, I'm David ",
      "Hola, soy David ",
      "Salut, je m'appelle David ",
      "Olá, eu sou o David ",
      "Hi, ich bin David ",
      "Ciao, sono David ",
      "Hoi, ik ben David ",
      "Witam, jestem David ",
      "Привет, я Дэвид "
    ];

    var options = {
      strings: words,
      typeSpeed: 110,
      loop: true,
      backDelay: 2000,
      backSpeed: 30
    };
    // eslint-disable-next-line no-unused-vars
    var typed = new Typed(".typed-space", options);
  }
};

const enButton = document.querySelector("#enButton");
const esButton = document.querySelector("#esButton");
if (enButton && esButton) {
  enButton.addEventListener("click", () => {
    if (currentLang != "en") {
      changeLanguage(true);
      currentLang = "en";
    }
  });

  esButton.addEventListener("click", () => {
    if (currentLang != "es") {
      changeLanguage(false);
      currentLang = "es";
    }
  });
}
