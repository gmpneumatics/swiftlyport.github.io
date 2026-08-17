(function () {
  var menuButton = document.querySelector(".menu-button");
  var menu = document.querySelector(".site-menu");
  var productButton = document.querySelector(".menu-group > button");
  var group = document.querySelector(".menu-group");
  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  var prev = document.querySelector(".slider-arrow.prev");
  var next = document.querySelector(".slider-arrow.next");
  var forms = Array.prototype.slice.call(document.querySelectorAll(".contact-form"));
  var current = 0;
  var timer;

  function showSlide(index) {
    slides[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
  }

  function restart() {
    window.clearInterval(timer);
    timer = window.setInterval(function () {
      showSlide(current + 1);
    }, 8000);
  }

  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
  }

  if (productButton && group) {
    productButton.addEventListener("click", function () {
      group.classList.toggle("open");
    });
  }

  forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
    });
  });

  if (slides.length) {
    if (prev) {
      prev.addEventListener("click", function () {
        showSlide(current - 1);
        restart();
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        showSlide(current + 1);
        restart();
      });
    }
    restart();
  }
}());
