(function () {
  'use strict';

  function initGallery(root) {
    var triggers = Array.prototype.slice.call(root.querySelectorAll('[data-gallery-trigger]'));
    var dialog = root.querySelector('[data-gallery-lightbox]');
    if (!dialog || !triggers.length) return;

    var lightboxImg = dialog.querySelector('[data-gallery-image]');
    var counter = dialog.querySelector('[data-gallery-counter]');
    var closeBtn = dialog.querySelector('[data-gallery-close]');
    var prevBtn = dialog.querySelector('[data-gallery-prev]');
    var nextBtn = dialog.querySelector('[data-gallery-next]');
    var currentIndex = 0;

    var images = triggers.map(function (trigger) {
      var img = trigger.querySelector('img');
      return { src: img.getAttribute('src'), alt: img.getAttribute('alt') || '' };
    });

    function show(index) {
      currentIndex = (index + images.length) % images.length;
      var current = images[currentIndex];
      lightboxImg.setAttribute('src', current.src);
      lightboxImg.setAttribute('alt', current.alt);
      if (counter) {
        counter.textContent = (currentIndex + 1) + ' / ' + images.length;
      }
    }

    triggers.forEach(function (trigger, index) {
      trigger.addEventListener('click', function () {
        show(index);
        dialog.showModal();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () { dialog.close(); });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () { show(currentIndex - 1); });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () { show(currentIndex + 1); });
    }

    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) dialog.close();
    });

    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') show(currentIndex + 1);
      if (e.key === 'ArrowLeft') show(currentIndex - 1);
    });
  }

  function init() {
    document.querySelectorAll('[data-gallery]').forEach(initGallery);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
