let params = new URL(document.location).searchParams;
let id = params.get("id");
const api = `https://course-api.com/javascript-store-single-product?id=${id}`;
const productWrapper = document.querySelector(".product-wrapper");
const loading = document.querySelector(".loading");
const errorDOM = document.querySelector(".error");

const fetchSingleProduct = async () => {
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    errorDOM.classList.remove("hide-loading");
    loading.classList.add("hide-loading");
  }
};

fetchSingleProduct().then((data) => displaySingleProduct(data));
const displaySingleProduct = (product) => {
  const { id, fields } = product;
  const { name, price, company, colors } = fields;
  const img = fields.image[0].url;
  productWrapper.innerHTML = `
  <img src="${img}" alt="" class="img">
        <div class="product-info">
            <h3>${name}</h3>
            <h5>${company}</h5>
            <span>$${price / 100}</span>
            <div class="colors">
                ${colors
                  .map(
                    (color) =>
                      ` <span class="product-color" style="background: ${color}"></span>`
                  )
                  .join("")}
            </div>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo consequuntur ducimus aperiam
                excepturi minus voluptatibus, cupiditate eaque aut quae error sit quas sequi! Commodi omnis
                nulla id cupiditate aliquam odio?
            </p>
            <button class="btn">add to cart</button>
                `;
  loading.classList.add("hide-loading");
  errorDOM.classList.add("hide-loading");
};
