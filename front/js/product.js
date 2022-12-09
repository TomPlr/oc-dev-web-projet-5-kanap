/*
 ** Minimalistic JavaScript library for toast notifications
 */
const notyf = new Notyf();

const currentUrl = window.location.href;
const url = new URL(currentUrl);
const kanapId = url.searchParams.get('id');
const apiById = 'http://localhost:3000/api/products/' + kanapId;

const imageItem = document.querySelector('.item__img');
const image = document.createElement('img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');
const quantity = document.getElementById('quantity');

const addToCartButton = document.getElementById('addToCart');

/**
 * Call the API to get product information depending on its id.
 */
fetch(apiById)
  .then((response) => response.json())
  .then((kanap) => displaySelectedKanap(kanap));

/**
 * Displays the product data received
 *
 * @param kanap
 * @returns
 */
function displaySelectedKanap(kanap) {
  // Add image
  imageItem.appendChild(image);
  image.setAttribute('src', kanap.imageUrl);
  image.setAttribute('alt', kanap.altTxt);

  // Add title
  title.textContent = kanap.name;

  // Add price
  price.textContent = kanap.price;

  // Add description
  description.textContent = kanap.description;

  // Add colors
  for (let colorType of kanap.colors) {
    const color = document.createElement('option');
    colors.appendChild(color);
    color.setAttribute('value', colorType);
    color.textContent = colorType;
  }
}

/**
 * Get value saved in localStorage with the key 'kanap'
 *
 * Returns either an empty array or an array containing all product objects saved
 */
const getCart = () => {
  const data = localStorage.getItem('kanap');
  if (data === null) {
    return [];
  } else {
    return JSON.parse(data);
  }
};

/**
 * Save the chosen kanap with its specificities (quantity, color) in localStorage
 */
function saveKanapSelected() {
  let cart = getCart();
  let kanapQuantity = +quantity.value;
  let sameProduct = false;

  const kanapData = {
    id: kanapId,
    color: colors.value,
    quantity: kanapQuantity,
  };

  if (colors.value === '') {
    notyf.error('Veuillez choisir une couleur');
  } else if (kanapQuantity <= 0 || kanapQuantity > 100) {
    notyf.error('Quantité incorrecte');
  } else {
    for (let kanap of cart) {
      if (kanap.id === kanapData.id && kanap.color === kanapData.color) {
        kanap.quantity += kanapData.quantity;
        sameProduct = true;
        break;
      }
    }

    if (sameProduct === false) {
      cart.push(kanapData);
    }
    localStorage.setItem('kanap', JSON.stringify(cart));
    notyf.success('Produit ajouté au panier !');
  }
}

addToCartButton.addEventListener('click', () => {
  saveKanapSelected();
});
