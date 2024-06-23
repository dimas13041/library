class NewUser {
  constructor(fullName, email, password, cardNumber, statusLogin, counter, booksCounter) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.loginStatus = statusLogin;
    this.cardNumber = cardNumber;
    this.counter = counter;
    this.booksCounter  = booksCounter;
  }
}
class Modal {
  constructor(modal) {
    this.modal = modal;
  }

  show() {
    this.modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  hide() {
    this.modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}


const btn = document.querySelector('.burger-btn'),
  menu = document.querySelector('.nav-list'),
  inputs = document.querySelectorAll('[data-season]'),
  books = document.querySelectorAll('.favorites-items'),
  profileIcon = document.querySelector('[data-profileIcon]'),
  menuNoAuth = document.querySelector('.menu__no-auth'),
  menuAuth = document.querySelector('.menu__auth'),
  modal = document.querySelectorAll('.modal'),
  body = document.querySelector('body'),
  btnBuyInForm = document.querySelector('#buyInForm'),
  btnReg = document.querySelector('[data-register]'),
  btnCheck = document.querySelector('.check')
btnsLogIn = document.querySelectorAll('[data-LogIn]'),
  btnsBuy = document.querySelectorAll('.buy'),
  btnsReg = document.querySelectorAll('[data-Reg]'),
  btnLogOut = document.querySelector('[data-logout]'),
  formLog = document.querySelector('#formLog'),
  forms = document.querySelectorAll('form')
formReg = document.querySelector('#formReg'),
  formCardBody = document.querySelector('.card-body')
modalReg = new Modal(document.querySelector('#modalReg')),
  modalLogIn = new Modal(document.querySelector('#modalLogIn')),
  modalProf = new Modal(document.querySelector('#modalProfile')),
  modalCard = new Modal(document.querySelector('#modalCard')),
  modalIcon = document.querySelector('.modal__icon'),
  modalCardNumber = document.querySelector('.modal__card-number'),
  modalName = document.querySelector('.modal__name'),
  visitsCounter = document.querySelectorAll('[data-visitCounter]')
booksCounter = document.querySelectorAll('[data-booksCounter]')
iconAuth = document.querySelector('.icon__auth'),
  buyForm = document.querySelector('.buy__form'),
  inputsBuyForm = buyForm.querySelectorAll('input'),
  inputCardNumber = document.querySelector('#cardNumber'),
  cardInputs = document.querySelectorAll('.card-input'),
  pText = document.querySelector('#PText'),
  pNum = document.querySelector('#PNum'),
  titleFindCard = document.querySelector('.find')
getCard = document.querySelector('.getcard'),
  visitProfile = document.querySelector('.visit-profile'),
  countersBlock = document.querySelector('.modal__counters'),
  booksList = document.querySelector('.modal__books-list'),
  cardCopy = document.querySelector('.modal__card-copy');
dataStorage = JSON.parse(localStorage.getItem('formData')) || [];
window.addEventListener('DOMContentLoaded', () => {
  checkLoginAndLogIn();

  // Space interval in inputs Card Number
  inputCardNumber.addEventListener('input', (e) => {
    let value = e.target.value;
    value = value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = value;
  });

  // Check fill inputs in modal Buy Card
  function checkInputs() {
    let allFilled = true;
    inputsBuyForm.forEach(function (input) {
      if (input.value === '') {
        allFilled = false;
      }
    });
    btnBuyInForm.disabled = !allFilled;
  }

  inputsBuyForm.forEach(function (input) {
    input.addEventListener('keyup', checkInputs);
  });

  //buy abonement

  buyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const foundObj = dataStorage.find(obj => obj.fullName === document.querySelector('.modal__name').innerHTML);
    if (foundObj) {
      foundObj['abonement'] = true;
      localStorage.setItem('formData', JSON.stringify(dataStorage));
      closeModal();
      updateBtnAfterBuyAbonement();
    }

  })


  // Update buttons in section Favorites after login
  function updateBtn() {
    btnsBuy.forEach((btn) => {
      btn.setAttribute('data-buy', '1');
    })
  }

  // Update buttons in section Favorites after buy aboniment
  function updateBtnAfterBuyAbonement() {
    btnsBuy.forEach(btn => {
      btn.setAttribute('data-buy', '2');
    })
  }



  function updateDigitalCard() {
    cardInputs.forEach(item => {
      item.classList.add('none');
    });
    pText.textContent = searchItem('fullName');
    pText.classList.remove('none');
    pNum.textContent = searchItem('cardNumber');
    pNum.classList.remove('none');
    btnCheck.classList.add('none');
    countersBlock.classList.remove('none');
    titleFindCard.textContent = 'Your Library card';
  }
  function returnDigitalCard() {
    cardInputs.forEach(item => {
      item.classList.add('add');
    });
    pText.classList.add('none');
    pNum.classList.add('none');
    btnCheck.classList.remove('none');
    countersBlock.classList.add('none');
    titleFindCard.textContent = 'Find your Library card';
  }


  // Function login 
  function LogIn() {
    closeModal();
    updateIcon();
    postNumber();
    updateBtn();
    updateDigitalCard();
    iconAuth.setAttribute('title', searchItem('fullName'));
    modalName.textContent = searchItem('fullName');
    getCard.classList.add('none');
    visitProfile.classList.remove('none');
    updateBooks();
  };
  // Get capitalize first letters for profile
  function capitalizeFirstLetters(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  // add number for profile
  function postNumber() {
    const menuTitle = menuAuth.firstElementChild;
    menuTitle.textContent = searchItem('cardNumber');
    modalCardNumber.textContent = searchItem('cardNumber');
  };


  // update books
  function updateBooks() {
    const modalNameElement = document.querySelector('.modal__name');
    if (!modalNameElement) {
      console.error('.modal__name element not found');
      return;
    }
    
    const modalName = modalNameElement.innerHTML;
    const foundObj = dataStorage.find(obj => obj.fullName === modalName);
  
    if (!foundObj) {
      console.error('Object not found in dataStorage');
      return;
    }
  
    booksCounter.forEach(e => {
      console.log('Books Counter:', foundObj.booksCounter);
      e.innerHTML = foundObj.booksCounter;
    });
  
    for (let i = 0; i < foundObj.books.length; i++) {
      const book = document.createElement('li');
      book.textContent = foundObj.books[i];
      booksList.append(book);
      
      const nameBook = foundObj.books[i].substring(0, foundObj.books[i].indexOf(','));
      console.log('Book Name:', nameBook);
      
      const nameBooks = document.querySelectorAll('.name-book');
      nameBooks.forEach(e => {
        if (e.innerHTML === nameBook) {
          const btn = e.parentElement.querySelector('.buy');
          if (btn) {
            btn.innerHTML = 'Own';
            btn.className = 'Own';
            btn.disabled = true;
          } else {
            console.error('.buy button not found');
          }
        }
      });
    }
  }


  //  search initials, counters, toggle icons, update info in icons
  function updateIcon() {
    const initials = searchItem('fullName').match(/\b\w/g).join('');
    const counter = searchItem('counter');
    profileIcon.classList.toggle('none');
    iconAuth.classList.toggle('none');
    iconAuth.textContent = initials;
    modalIcon.textContent = initials;
    visitsCounter.forEach(item => {
      item.textContent = counter;
    });
  };
  // generate card number
  function generateCardNumber() {
    const hexNumber = Math.floor(Math.random() * 0x1000000000).toString(16).toUpperCase();
    return hexNumber.padStart(9, '0');
  }
  //check login status and toggle false
  function updateLoginStatus() {
    const dataStorage = JSON.parse(localStorage.getItem('formData')) || [];
    const loggedInUser = dataStorage.find(user => user.loginStatus === true);

    if (loggedInUser) {
      loggedInUser.loginStatus = false;
      localStorage.setItem('formData', JSON.stringify(dataStorage));
    }
  }




  // Check login user
  function checkLoginAndLogIn() {
    const dataStorage = JSON.parse(localStorage.getItem('formData')) || [];
    const loggedInUser = dataStorage.find(user => user.loginStatus === true);

    if (loggedInUser) {
      LogIn();
      const foundObj = dataStorage.find(obj => obj.abonement === true);
      if (foundObj) {
        btnsBuy.forEach(e => {
          updateBtnAfterBuyAbonement();
        })
      }
    }
  }
  // Search item by ke in local storage
  function searchItem(property) {
    const foundObj = dataStorage.find(obj => obj.loginStatus === true);
    if (foundObj && foundObj.hasOwnProperty(property)) {
      return foundObj[property];
    }
  }


  // registration
  formReg.addEventListener('submit', (e) => {
    const firstName = document.getElementById('firstName').value,
      lastName = document.getElementById('lastName').value,
      fullName = firstName + ' ' + lastName,
      email = document.getElementById('email').value,
      cardNumber = generateCardNumber();
    passReg = document.getElementById('passReg').value;

    e.preventDefault();

    dataStorage.push(new NewUser(fullName, email, passReg, cardNumber, true, 1, 0));

    localStorage.setItem('formData', JSON.stringify(dataStorage));
    closeModal();
    LogIn();
  })



  cardCopy.addEventListener('click', () => {
    const elementContent = document.querySelector('.modal__card-number').textContent;
    navigator.clipboard.writeText(elementContent);
  })




  // close modals
  function closeModal() {
    modalLogIn.hide();
    modalReg.hide();
    modalProf.hide();
    modalCard.hide();
    forms.forEach(form => form.reset());
  };

  // check match login and pass
  formLog.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = document.querySelector('#login').value;
    const pass = document.querySelector('#pass').value;
    const dataStorage = JSON.parse(localStorage.getItem('formData')) || [];

    dataStorage.forEach(obj => {
      const isPasswordMatch = obj.password === pass;
      const isLoginMatch = obj.cardNumber === login || obj.email === login;

      if (isPasswordMatch && isLoginMatch) {
        obj.loginStatus = true;
        obj.counter += 1;
        localStorage.setItem('formData', JSON.stringify(dataStorage));
        checkLoginAndLogIn()
      }
    });
  });



  formCardBody.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#inputName').value;
    const number = document.querySelector('#inputNumber').value;
    const dataStorage = JSON.parse(localStorage.getItem('formData')) || [];

    const matchedObject = dataStorage.find(obj => obj.fullName === name && obj.cardNumber === number);
    if (matchedObject) {
      const counterP = document.querySelector('[data-visitCounter]');
      counterP.textContent = matchedObject.counter;
      countersBlock.classList.remove('none');
      btnCheck.classList.add('none');

      setTimeout(() => {
        btnCheck.classList.remove('none');
        countersBlock.classList.add('none');
        formCardBody.reset();
      }, 10000);

    }
  });




  //  log out
  btnLogOut.addEventListener('click', () => {
    updateLoginStatus();
    updateIcon();
    returnDigitalCard();
  });





  //Toggle Burger menu

  btn.addEventListener('click', (e) => {
    btn.classList.toggle('opened');
    menu.classList.toggle('nav-list--opened');
  });


  function buyBook(event) {
    const title = event.target.parentElement.querySelector('.name-book').innerHTML;
    const author = event.target.parentElement.querySelector('.writter').innerHTML.substring(3);
    const bookName = `${title}, ${author}`;
    const book = document.createElement('li');
    book.textContent = bookName;
    booksList.append(book);
    const modalName = document.querySelector('.modal__name').innerHTML;
    const foundObj = dataStorage.find(obj => obj.fullName === modalName);
    if (foundObj) {
      if (!foundObj.books) {
        foundObj.books = [];
      }
      if (!foundObj.booksCounter) {
        foundObj.booksCounter = 0;
      }
      foundObj.books.push(bookName);
      foundObj.booksCounter += 1;
      booksCounter.forEach(e => {
        e.innerHTML = foundObj.booksCounter;
      });
      localStorage.setItem('formData', JSON.stringify(dataStorage));
    }
    event.target.innerHTML = 'Own';
    event.target.className = 'Own';
    event.target.disabled = true;
  }




  //toggle Modal 
  document.addEventListener('click', (event) => {
    if (event.target.matches('[data-profile]')) {
      modalProf.show();
    } else if (event.target.matches('[data-LogIn]')) {
      modalLogIn.show();
      modalReg.hide();
    } else if (event.target.matches('[data-Reg]')) {
      modalReg.show();
      modalLogIn.hide();
    } else if (event.target.matches('[data-buy="1"]')) {
      modalCard.show();
    } else if (event.target.matches('[data-buy="2"]')) {
      buyBook(event);
    } else if (event.target.matches('.buy')) {
      modalLogIn.show();
    }
  });



  // close modal if click on X
  body.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal__close')) {
      closeModal();
    }
  });

  // close modal if click outside

  modal.forEach(e => {
    e.addEventListener('mousedown', (event) => {
      if (event.target === e) {
        closeModal();

      }
    })
  });

  // close modal if press Escape

  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape") {
      closeModal();
    };
  });



  //Toggle menu if no authorisation

  document.addEventListener('click', (e) => {
    if (e.target !== profileIcon) {
      menuNoAuth.classList.add('none');
    } else {
      menuNoAuth.classList.toggle('none');
      btn.classList.remove('opened');
      menu.classList.remove('nav-list--opened');
    }
  })
  //Toggle menu if yes authorisation

  document.addEventListener('click', (e) => {
    if (e.target !== iconAuth) {
      menuAuth.classList.add('none');
    } else {
      menuAuth.classList.toggle('none');
      btn.classList.remove('opened');
      menu.classList.remove('nav-list--opened');
    }
  })



  // Favorites

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

