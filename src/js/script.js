const btn = document.querySelector('.burger-btn'),
  menu = document.querySelector('.nav-list'),
  inputs = document.querySelectorAll('[data-season]'),
  books = document.querySelectorAll('.favorites-items'),
  profileIcon = document.querySelector('[data-profileIcon]'),
  menuNoAuth = document.querySelector('.menu__no-auth'),
  menuAuth = document.querySelector('.menu__auth'),
  modalLogIn = document.querySelector('#modalLogIn'),
  modalReg = document.querySelector('#modalReg'),
  btnsLogIn = document.querySelectorAll('[data-LogIn]'),
  modal = document.querySelectorAll('.modal'),
  body = document.querySelector('body'),
  btnReg = document.querySelector('[data-register]'),
  formLog = document.querySelector('#formLog'),
  btnsReg = document.querySelectorAll('[data-Reg]'),
  btnLogOut = document.querySelector('[data-logout]'),
  forms = document.querySelectorAll('.modal__inner')
  formReg = document.querySelector('#formReg'),
  btnProf = document.querySelector('[data-profile]'),
  modalProf = document.querySelector('#modalProfile'),
  modalIcon = document.querySelector('.modal__icon'),
  modalName = document.querySelector('.modal__name'),
  modalCounter = document.querySelector('.modal__counter')
  modalCardNumber = document.querySelector('.modal__card-number'),
  iconAuth = document.querySelector('.icon__auth'),
  dataStorage = JSON.parse(localStorage.getItem('formData'));
  window.addEventListener('DOMContentLoaded', () => {
  checkLoginAndLogIn();


  function checkLoginAndLogIn() {
    const dataStorage = JSON.parse(localStorage.getItem('formData')) || [];
    const loggedInUser = dataStorage.find(user => user.loginStatus === true);
    
    if (loggedInUser) {
      LogIn();
      loggedInUser.visitsCounter = (loggedInUser.visitsCounter || 0) + 1;
      localStorage.setItem('formData', JSON.stringify(dataStorage));
    }
  }
  
  function searchItem(property) {
    const foundObj = dataStorage.find(obj => obj.loginStatus === true);
    if (foundObj && foundObj.hasOwnProperty(property)) {
      return foundObj[property];
    }
  }
  

  
  function LogIn() {
    closeModal();
    updateIcon();
    postNumber();
    iconAuth.setAttribute('title', searchItem('FullName'));
    modalName.textContent = searchItem('FullName');
  };
  
  function capitalizeFirstLetters(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  function postNumber() {
    const menuTitle = menuAuth.firstElementChild;
    menuTitle.textContent = searchItem('cardNumber');
    modalCardNumber.textContent = searchItem('cardNumber');
  };
  
  
  function updateIcon() {
    const initials = searchItem('FullName').match(/\b\w/g).join('');
    const counter = searchItem('visitsCounter');
    profileIcon.classList.toggle('none');
    iconAuth.classList.toggle('none');
    iconAuth.textContent = initials;
    modalIcon.textContent = initials;
    modalCounter.textContent = counter;
  };
  
  function generateCardNumber() {
    const hexNumber = Math.floor(Math.random() * 0x1000000000).toString(16);
    return hexNumber.padStart(9, '0');
  };
  
  function updateLoginStatus(newStatus) {
    const dataStorage = JSON.parse(localStorage.getItem('formData')) || [];
    const loggedInUser = dataStorage.find(user => user.loginStatus === true);
    
    if (loggedInUser) {
      loggedInUser.loginStatus = newStatus;
      localStorage.setItem('formData', JSON.stringify(dataStorage));
    }
  }
  
  function SignIn(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const value1 = document.getElementById('firstName').value;
      const value2 = document.getElementById('lastName').value;
      const combinedValue = value1 + ' ' + value2;
      const cardNumber = generateCardNumber();
      
      const formSubmission = {
        ...Object.fromEntries(formData.entries()),
        FullName: capitalizeFirstLetters(combinedValue),
        cardNumber,
        loginStatus: true,
        visitsCounter: 1
      };
  
      const dataStorage = JSON.parse(localStorage.getItem('formData')) || [];
      dataStorage.push(formSubmission);
      localStorage.setItem('formData', JSON.stringify(dataStorage));
      closeModal();
      LogIn();
    });
  };
  

  SignIn(formReg);
  

  function closeModal() {
    modalLogIn.classList.remove('show');
    modalReg.classList.remove('show');
    modalProf.classList.remove('show')
    document.body.style.overflow = '';
    forms.forEach(form => form.reset());
  };
  

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
        localStorage.setItem('formData', JSON.stringify(dataStorage)); 
        checkLoginAndLogIn()
      }
    });
  });
  
  

  // document.addEventListener('keydown', (e) => {
  //   if (e.code === "Space") {
  //     LogIn();
  //   };
  // });

  

  btnLogOut.addEventListener('click', () => {
    updateLoginStatus(false);
    updateIcon();
  });
  
  
  


  //Burger menu

  btn.addEventListener('click', (e) => {
    btn.classList.toggle('opened');
    menu.classList.toggle('nav-list--opened');
  });

  //Modal open/clos

  btnProf.addEventListener('click', () => {
    modalProf.classList.add('show');
    document.body.style.overflow = 'hidden';
  });

  btnsLogIn.forEach(btnl => {
    btnl.addEventListener('click', () => {
      modalLogIn.classList.add('show');
      modalReg.classList.remove('show');
      document.body.style.overflow = 'hidden';
    });
  });


  btnsReg.forEach(btnr => {
    btnr.addEventListener('click', () => {
      modalReg.classList.add('show');
      modalLogIn.classList.remove('show');
      document.body.style.overflow = 'hidden';
    });
  });

  body.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal__close')) {
      closeModal();
    }
  });

  modal.forEach(e => {
    e.addEventListener('mousedown', (event) => {
      if (event.target === e) {
        closeModal();

      }
    })
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape") {
      closeModal();
    };
  });


  //menu


  document.addEventListener('click', (e) => {
    if (e.target !== profileIcon) {
      menuNoAuth.classList.add('none');
    } else {
      menuNoAuth.classList.toggle('none');
      btn.classList.remove('opened');
      menu.classList.remove('nav-list--opened');
    }
  })

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

