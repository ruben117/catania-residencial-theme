(function () {
  'use strict';

  function initSlider(root) {
    var track = root.querySelector('[data-amenity-track]');
    var slides = Array.prototype.slice.call(root.querySelectorAll('[data-amenity-slide]'));
    var prevBtn = root.querySelector('[data-amenity-prev]');
    var nextBtn = root.querySelector('[data-amenity-next]');
    var dots = Array.prototype.slice.call(root.querySelectorAll('[data-amenity-dot]'));
    if (!track || !slides.length) return;

    var currentIndex = 0;

    function setActiveDot(index) {
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === index);
      });
    }

    function goTo(index) {
      currentIndex = Math.max(0, Math.min(index, slides.length - 1));
      slides[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      setActiveDot(currentIndex);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () { goTo(currentIndex - 1); });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () { goTo(currentIndex + 1); });
    }

    dots.forEach(function (dot, index) {
      dot.addEventListener('click', function () { goTo(index); });
    });

    /* Sincroniza el dot activo cuando el usuario hace swipe/scroll manual
       (sin pasar por las flechas) — el scroll-snap nativo sigue funcionando
       aunque JS no cargue; esto solo mantiene los dots al día. */
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var index = slides.indexOf(entry.target);
          if (index === -1) return;
          currentIndex = index;
          setActiveDot(currentIndex);
        });
      }, { root: track, threshold: 0.6 });

      slides.forEach(function (slide) { observer.observe(slide); });
    }
  }

  function init() {
    document.querySelectorAll('[data-amenity-slider]').forEach(initSlider);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
