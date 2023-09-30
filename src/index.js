import "./styles/style.css";
import "./styles/header.css";
import "./styles/main.css";
import "./styles/footer.css";
import "./styles/cart.css";
import { fetchDataAndRender } from "./scripts/pagination";
import { handleWindowResize } from "./scripts/info";
import { openOverlay } from "./scripts/info";
import { openCart } from "./scripts/cart";
import headerHTML from "./components/header/header.html";
import mainHTML from "./components/main/main.html";
import footerHTML from "./components/footer/footer.html";
import cartHTML from "./components/cart/cart.html";

document.getElementById("header").innerHTML = headerHTML;
document.getElementById("main").innerHTML = mainHTML;
document.getElementById("footer").innerHTML = footerHTML;
document.getElementById("cart").innerHTML = cartHTML;

const infoBtn = document.getElementById("more_button");
const cartBtn = document.getElementById("cart_btn");

let AllData = [];
let itemsPerPage = 24;
let currentPage = 1;
let totalPages = 20;
let showInfo = false;

window.addEventListener("resize", handleWindowResize);
document.addEventListener("DOMContentLoaded", () => {
  AllData,
    (currentPage = fetchDataAndRender(
      AllData,
      currentPage,
      totalPages,
      itemsPerPage
    ));
  handleWindowResize();
  infoBtn.addEventListener("click", () => {
    showInfo = !showInfo;
    openOverlay(showInfo);
  });
  cartBtn.addEventListener("click", () => {
    openCart();
  });
});
