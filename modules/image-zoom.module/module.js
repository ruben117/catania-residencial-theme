(function () {
  var root = document.getElementById('image-zoom-{{ module.unique_id }}');
  if (!root) return;

  var img = root.querySelector('.image-zoom__img');
  var lens = root.querySelector('.image-zoom__lens');
  if (!img || !lens) return;

  var zoomFactor = 2.5;

  function updateLens(clientX, clientY) {
    var rect = img.getBoundingClientRect();
    var x = clientX - rect.left;
    var y = clientY - rect.top;

    x = Math.max(0, Math.min(x, rect.width));
    y = Math.max(0, Math.min(y, rect.height));

    var lensSize = lens.offsetWidth;

    lens.style.left = (x - lensSize / 2) + 'px';
    lens.style.top = (y - lensSize / 2) + 'px';
    lens.style.backgroundSize = (rect.width * zoomFactor) + 'px ' + (rect.height * zoomFactor) + 'px';
    lens.style.backgroundPosition = ((x / rect.width) * 100) + '% ' + ((y / rect.height) * 100) + '%';
  }

  root.addEventListener('mouseenter', function () {
    lens.classList.add('is-active');
  });

  root.addEventListener('mouseleave', function () {
    lens.classList.remove('is-active');
  });

  root.addEventListener('mousemove', function (e) {
    updateLens(e.clientX, e.clientY);
  });
})();
