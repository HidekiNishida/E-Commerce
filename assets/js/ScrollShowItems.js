window.addEventListener('scroll', function() {
  let items = document.querySelectorAll('.item');
  
  items.forEach(item => {
    if (isElementInViewport(item)) {
      item.classList.add('visible');
    }
  });
});

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}