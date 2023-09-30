let CartData = [];
let TotalData = [];
let totalPrice = 0;
let idx = 0;

export function openCart() {
  const infoOverlay = document.getElementById("Cart");
  infoOverlay.classList.remove("cart-hidden");
  infoOverlay.classList.add("cart-show");
  infoOverlay.style.display = "block";

  const closeBtn = document.getElementById("close_cart_btn");
  closeBtn.addEventListener("click", () => {
    infoOverlay.classList.remove("cart-show");
    infoOverlay.classList.add("cart-hidden");
    setTimeout(() => {
      infoOverlay.style.display = "none";
    }, 200);
  });
}

export function addProduct(data) {
  if (!CartData.includes(data.id)) {
    const cart = document.getElementById("cart_content");
    const divBlock = document.getElementById("cart_content");
    const elementsInsideDiv = divBlock.querySelectorAll("*");
    const count = elementsInsideDiv.length;
    if (count === 1) {
      cart.innerHTML = "";
    }
    let photo = "";
    let price = 0;
    let i = idx;
    const vars = data.variants;
    const images = data.images;

    if (images.length === 0) {
      photo =
        "https://cdn.shopify.com/s/files/1/0690/0075/7529/products/AAUvwnj0ICORVuxs41ODOvnhvedArLiSV20df7r8XBjEUQ_s900-c-k-c0x00ffffff-no-rj_cc0a4cb2-7c6b-4663-abac-1ee40325a961.jpg?v=1670516985";
    }
    images.forEach((image) => {
      photo = image.src;
    });
    vars.forEach((variant) => {
      price = variant.price;
    });

    const cartItem = document.createElement("div");
    cartItem.className = "cart_item";
    cartItem.classList.add(`idx-${i}`.toString());

    const itemDetails = document.createElement("div");
    itemDetails.className = "item_details";

    const delBtn = document.createElement("button");
    delBtn.className = "del_btn";
    delBtn.addEventListener("click", () => {
      delProduct(data, i, price);
      const indexToRemove = CartData.indexOf(data.id);
      CartData.splice(indexToRemove, 1);
    });

    const btnImg = document.createElement("img");
    btnImg.src = "../assets/delete-bin-6-line.png";

    const itemImg = document.createElement("img");
    itemImg.className = "item_photo_img";
    itemImg.src = photo;

    const itemInfo = document.createElement("div");
    itemInfo.className = "item_info";

    const p1 = document.createElement("p");
    p1.className = "item_name";
    p1.textContent = data.title;

    const p2 = document.createElement("p");
    p2.className = "item_price";
    p2.textContent = `${price} KR.`;

    const countSection = document.createElement("div");
    countSection.classList = "count_section";

    const minBtn = document.createElement("button");
    minBtn.classList = "count_btn";
    minBtn.textContent = "-";
    minBtn.addEventListener("click", () => {
      changeTotalPrice(data, price, "-");
    });
    const maxBtn = document.createElement("button");
    maxBtn.classList = "count_btn";
    maxBtn.textContent = "+";
    maxBtn.addEventListener("click", () => {
      changeTotalPrice(data, price, "+");
    });

    countSection.appendChild(minBtn);
    countSection.appendChild(maxBtn);
    itemInfo.appendChild(p1);
    itemInfo.appendChild(p2);
    itemInfo.appendChild(countSection);
    itemDetails.appendChild(itemImg);
    itemDetails.appendChild(itemInfo);
    delBtn.appendChild(btnImg);
    cartItem.appendChild(itemDetails);
    cartItem.appendChild(delBtn);
    cart.appendChild(cartItem);

    TotalData.push(1);
    CartData.push(data.id);
    changeTotalPrice(data, price, "add");
    idx++;
  }
}

const delProduct = (data, num, price) => {
  const cart = document.getElementById("cart_content");
  const elementToRemove = document.querySelector(`.idx-${num}`);

  const divBlock = document.getElementById("cart_content");
  const elementsInsideDiv = divBlock.querySelectorAll("*");
  const count = elementsInsideDiv.length;

  if (elementToRemove) {
    if (count === 11) {
      elementToRemove.remove();

      const warning = document.createElement("h1");
      warning.className = "text-center pb-10";
      warning.textContent = "Your cart is empty :(";
      cart.appendChild(warning);
      changeTotalPrice(data, price, "del");
    } else {
      elementToRemove.remove();
      changeTotalPrice(data, price, "del");
    }
  }
};

function changeTotalPrice(data, p, operand) {
  const tPrice = document.getElementById("total_price");
  const idx = CartData.indexOf(data.id);

  if (operand === "add") {
    totalPrice += parseFloat(parseFloat(p).toFixed(1));
    tPrice.textContent = `${totalPrice} KR.`;
  } else if (operand === "del") {
    if (CartData.length === 1) {
      totalPrice = 0;
      TotalData.splice(idx, 1);
      tPrice.textContent = `${totalPrice} KR.`;
    } else {
      totalPrice -= parseFloat(parseFloat(p).toFixed(1)) * TotalData[idx];
      TotalData.splice(idx, 1);
      tPrice.textContent = `${totalPrice} KR.`;
    }
  } else if (operand === "+") {
    totalPrice += parseFloat(parseFloat(p).toFixed(1));
    TotalData[idx] += 1;
    tPrice.textContent = `${totalPrice} KR.`;
  } else if (operand === "-") {
    if (TotalData[idx] !== 1) {
      totalPrice -= parseFloat(parseFloat(p).toFixed(1));
      TotalData[idx] -= 1;
      tPrice.textContent = `${totalPrice} KR.`;
    }
  }
}
