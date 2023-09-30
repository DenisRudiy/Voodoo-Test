import { createDataTable } from "./info";
import { addProduct } from "./cart";

function createProductSection(data) {
  const title = data.title;
  let type = data.product_type;
  let price = 0;
  let img = "";
  const vars = data.variants;
  const images = data.images;
  if (images.length === 0) {
    img =
      "https://cdn.shopify.com/s/files/1/0690/0075/7529/products/AAUvwnj0ICORVuxs41ODOvnhvedArLiSV20df7r8XBjEUQ_s900-c-k-c0x00ffffff-no-rj_cc0a4cb2-7c6b-4663-abac-1ee40325a961.jpg?v=1670516985";
  }
  vars.forEach((variant) => {
    price = variant.price;
  });
  images.forEach((image) => {
    img = image.src;
  });

  if (type === "") {
    type = "Condition";
  }

  const productItem = document.createElement("div");
  productItem.classList.add("item");

  const photoContainer = document.createElement("div");
  photoContainer.addEventListener("click", () => {
    createDataTable(data);
  });
  photoContainer.classList.add("photo");
  photoContainer.style.backgroundImage = `url(${img})`;

  const label = document.createElement("div");
  label.classList.add("label");
  label.textContent = "used";

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("info");

  const leftSection = document.createElement("div");
  leftSection.classList.add("L_Sect");

  const rightSection = document.createElement("div");
  rightSection.classList.add("R_Sect");

  const nameParagraph = document.createElement("p");
  nameParagraph.textContent = title;
  nameParagraph.classList.add("bold");

  const priceParagraph = document.createElement("p");
  priceParagraph.textContent = `${price} KR.`;
  priceParagraph.classList.add("bold");

  const typeParagraph = document.createElement("p");
  typeParagraph.textContent = type;
  typeParagraph.classList.add("med");

  const usedParagraph = document.createElement("p");
  usedParagraph.textContent = "Slightly used";

  const addToCartButton = document.createElement("button");
  addToCartButton.classList.add("buy");
  addToCartButton.textContent = "Add to Cart";
  addToCartButton.addEventListener("click", () => {
    addProduct(data);
  });

  photoContainer.appendChild(label);
  infoContainer.appendChild(leftSection);
  infoContainer.appendChild(rightSection);
  leftSection.appendChild(nameParagraph);
  leftSection.appendChild(priceParagraph);
  rightSection.appendChild(typeParagraph);
  rightSection.appendChild(usedParagraph);
  productItem.appendChild(photoContainer);
  productItem.appendChild(infoContainer);
  productItem.appendChild(addToCartButton);

  return productItem;
}

export default createProductSection;
