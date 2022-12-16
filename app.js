const productsCenter = document.querySelector(".products-center");
const loading = document.querySelector(".loading");
const errorDOM = document.querySelector(".error");
const api = "https://course-api.com/javascript-store-products";
async function fetchProducts() {
  try {
    const response = await fetch(api);
    const data = response.json();
    return data;
  } catch (error) {
    loading.classList.add("hide-loading");
    errorDOM.classList.remove("hide-loading");
  }
}

async function displayProducts() {
  const data = await fetchProducts();
  const productsList = data
    .map((product) => {
      const { id, fields } = product;
      const { name, price } = fields;
      const img = fields.image[0].url;
      return `<a href="product.html?id=${id}" class="single-product">
                    <img src="${img}" alt="${name}" class="single-product-img img">
                    <footer>
                        <h5 class="name">${name}</h5>
                        <span class="price">$${price / 100}</span>
                    </footer>
                </a> `;
    })
    .join("");
  productsCenter.innerHTML = `<div class="products-container">
        ${productsList}
    </div>`;
  loading.classList.add("hide-loading");
  errorDOM.classList.add("hide-loading");
}
displayProducts();
