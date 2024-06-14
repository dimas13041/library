(function () {
  var btn = document.querySelector('.burger-btn');
  var menu = document.querySelector('.nav-list')
  
  btn.addEventListener('click', function(e) {
    this.classList.toggle('opened');
    menu.classList.toggle('nav-list--opened');

  });
})();