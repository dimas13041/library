window.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.burger-btn'),
    menu = document.querySelector('.nav-list'),
    inputs = document.querySelectorAll('[data-season]'),
    books = document.querySelectorAll('.favorites-items');

  btn.addEventListener('click', (e) => {
    btn.classList.toggle('opened');
    menu.classList.toggle('nav-list--opened');
  })

  async function hideContent() {
    for (const book of books) {
      book.classList.remove('fadeIn', 'show');
      book.classList.add('fadeOut');
    }
    await new Promise(resolve => setTimeout(resolve, 900));
    for (const book of books) {
      book.classList.add('none');

    }
  }
  

  function showContent(i = 0) {
    books[i].classList.add('show', 'fadeIn');

    books[i].classList.remove('none', 'fadeOut');
  };
  books.forEach((book, num) => {
    inputs.forEach((input, i) => {
      input.addEventListener('change', async () => {
        if (i === num) {
          await hideContent();
          showContent(i);
        }
      });
    })
  });


});
