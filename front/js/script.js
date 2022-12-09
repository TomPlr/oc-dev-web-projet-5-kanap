const apiProducts = 'http://localhost:3000/api/products';

const items = document.getElementById('items');

/**
 * Create all HTML elements needed for product to be displayed
 *
 * @param kanap
 */
function insertKanap(kanap) {
  const link = document.createElement('a');
  const article = document.createElement('article');
  const image = document.createElement('img');
  const title = document.createElement('h3');
  const description = document.createElement('p');

  // Add link
  items.appendChild(link);
  link.setAttribute('href', `./product.html?id=${kanap._id}`);

  // Add article
  link.appendChild(article);

  // Add img
  article.appendChild(image);
  image.setAttribute('src', kanap.imageUrl);
  image.setAttribute('alt', `${kanap.altTxt}, ${kanap.name}`);

  // Add h3
  article.appendChild(title);
  title.classList.add('productName');
  title.textContent = kanap.name;

  // Add description
  article.appendChild(description);
  description.classList.add('productDescription');
  description.textContent = kanap.description;
}

fetch(apiProducts)
  .then((res) => res.json())
  .then((kanaps) => {
    for (let kanap of kanaps) {
      insertKanap(kanap);
    }
  });
