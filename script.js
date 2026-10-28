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
  var requested = 0;
  var slideRequest = 0;
  var timer;

  function showSlide(index) {
    requested = (index + slides.length) % slides.length;
    var target = requested;
    var request = ++slideRequest;
    var slide = slides[target];

    // Hidden slides have no source until requested, so they cannot compete
    // with the first banner for bandwidth. Keep the current slide visible
    // until its replacement is ready, including on slow connections.
    if (slide.dataset.src) {
      slide.srcset = slide.dataset.srcset;
      slide.src = slide.dataset.src;
      delete slide.dataset.srcset;
      delete slide.dataset.src;
    }

    function activate() {
      if (request !== slideRequest || !slide.naturalWidth) return;
      slides[current].classList.remove("active");
      current = target;
      slide.classList.add("active");
    }

    if (slide.decode) {
      slide.decode().then(activate).catch(function () {});
    } else if (slide.complete) {
      activate();
    } else {
      slide.addEventListener("load", activate, { once: true });
    }
  }

  function restart() {
    window.clearInterval(timer);
    timer = window.setInterval(function () {
      showSlide(requested + 1);
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
        showSlide(requested - 1);
        restart();
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        showSlide(requested + 1);
        restart();
      });
    }
    restart();
  }
}());
