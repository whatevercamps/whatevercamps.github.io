"use strict";

window.onload = () => {
  watchSidebar();

  if ($(".typed-space").length == 1) {
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
