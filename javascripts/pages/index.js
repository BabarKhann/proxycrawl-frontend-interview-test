const form = document.querySelector('#crawlForm');
const errorElm = document.querySelector('.errors');
const token = document.querySelector('.token');
const url = document.querySelector('.url');
const spinner = document.querySelector('.spinner');
const product = document.querySelector('.product');

const prod_img = document.querySelector('.prod-img img');
const prod_title = document.querySelector('.title');
const prod_subTitle = document.querySelector('.sub-title');
const prod_price = document.querySelector('.price');
const prod_desc = document.querySelector('.desc');
let errors = [];

function renderErrors() {

  errorElm.textContent = '';

  errors.map((error) => {
    let p = document.createElement(`p`);
    let newError = document.createTextNode(error)
    p.appendChild(newError);

    errorElm.appendChild(p);
  });

  errorElm.classList.replace('hidden', 'visible');
}

function checkFields() {
  errors = [];

  if (token.value !== '' && url.value !== '') {

    errors = [];
    errorElm.classList.replace('visible', 'hidden');

    return true
  };

  if (token.value === '') {
    errors.push("* Token is Required");
  }

  if (url.value === '') {
    errors.push("* URL is Required");
  }

  renderErrors();

  return false;
}


// form submit
form.addEventListener('submit', async function (e) {
  e.preventDefault();

  if (!checkFields()) return;

});