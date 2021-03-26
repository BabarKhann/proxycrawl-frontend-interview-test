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

  product.classList.remove('show');

  if (!checkFields()) return;

  const data = await getData();

  if (data.status !== 200) {
    let p = document.createElement(`p`);
    let newError = document.createTextNode(data.message ? data.message : 'Something Wrong! Please try again')
    p.appendChild(newError);

    errorElm.textContent = '';
    errorElm.appendChild(p);
    errorElm.classList.replace('hidden', 'visible');

    return;
  }

  const { brand, name, price, mainImage, description } = data.product;

  showData(brand, name, price, mainImage, description);

  console.log(data);
});

// get data
async function getData() {
  // show spinner
  spinner.classList.toggle('show');

  const res = await fetch('/product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: form.token.value, url: url.form.url.value }),
  });

  // hide spinner
  spinner.classList.toggle('show');
  return await res.json();
}

function showData(brand, name, price, mainImage, description) {

  prod_img.src = mainImage;
  prod_title.textContent = brand;
  prod_subTitle.textContent = name;
  prod_price.textContent = price;
  prod_desc.textContent = description;

  product.classList.toggle('show');
}

url.addEventListener('input', function (e) {
  if (url.validity.typeMismatch) {
    url.setCustomValidity("Please enter valid url!");
  } else {
    url.setCustomValidity("");
  }
});