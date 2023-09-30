import createProductSection from "./product";

function renderPagination(
  plus,
  AllData,
  currentPage,
  totalPages,
  itemsPerPage
) {
  const allPag = document.getElementById("pagination");

  allPag.innerHTML = "";
  let addAddict = true;
  const delPrev = plus !== 6 ? true : false;

  if (delPrev) {
    for (let i = currentPage - 1; i <= currentPage + plus; i++) {
      if (i >= 1 && i <= totalPages) {
        const pageButton = document.createElement("button");
        pageButton.classList.add("pag_btn");
        pageButton.textContent = i;
        if (i === totalPages) addAddict = !addAddict;
        if (i === currentPage) {
          pageButton.classList.add("active-page");
        } else {
          pageButton.addEventListener("click", () => {
            currentPage = i;
            fetchDataAndRender(AllData, currentPage, totalPages, itemsPerPage);
          });
        }

        allPag.appendChild(pageButton);
      }
    }
  } else {
    addAddict = false;
    for (let i = totalPages - 6; i <= totalPages; i++) {
      if (i >= 1 && i <= totalPages) {
        const pageButton = document.createElement("button");
        pageButton.classList.add("pag_btn");
        pageButton.textContent = i;
        if (i === currentPage) {
          pageButton.classList.add("active-page");
        } else {
          pageButton.addEventListener("click", () => {
            currentPage = i;
            fetchDataAndRender(AllData, currentPage, totalPages, itemsPerPage);
          });
        }

        allPag.appendChild(pageButton);
      }
    }
  }

  if (addAddict) {
    const shiftButton = document.createElement("button");
    shiftButton.textContent = "...";
    shiftButton.classList.add("pag_btn");
    shiftButton.addEventListener("click", () => {
      if (currentPage + 5 <= totalPages) {
        currentPage += 5;
      } else {
        const diff = totalPages - currentPage;
        currentPage = diff;
      }
      fetchDataAndRender(AllData, currentPage, totalPages, itemsPerPage);
    });
    allPag.appendChild(shiftButton);

    const lastButton = document.createElement("button");
    lastButton.textContent = `${totalPages}`;
    lastButton.classList.add("pag_btn");
    lastButton.addEventListener("click", () => {
      currentPage = totalPages;
      fetchDataAndRender(AllData, currentPage, totalPages, itemsPerPage);
    });
    allPag.appendChild(lastButton);
  }
  return currentPage;
}

export function fetchDataAndRender(
  AllData,
  currentPage,
  totalPages,
  itemsPerPage
) {
  fetch(
    `https://voodoo-sandbox.myshopify.com/products.json?limit=${itemsPerPage}&page=${currentPage}`
  )
    .then((response) => response.json())
    .then((data) => {
      const allDataContainer = document.getElementById("all_data");
      let currPgRet = 0;
      AllData = data.products;
      allDataContainer.innerHTML = "";

      AllData.forEach((product) => {
        const productSection = createProductSection(product);
        allDataContainer.appendChild(productSection);
      });
      if (currentPage === 1) {
        currPgRet = renderPagination(
          4,
          AllData,
          currentPage,
          totalPages,
          itemsPerPage,
          fetchDataAndRender
        );
      } else if (currentPage >= totalPages - 5) {
        currPgRet = renderPagination(
          6,
          AllData,
          currentPage,
          totalPages,
          itemsPerPage,
          fetchDataAndRender
        );
      } else {
        currPgRet = renderPagination(
          3,
          AllData,
          currentPage,
          totalPages,
          itemsPerPage,
          fetchDataAndRender
        );
      }
      return AllData, currPgRet;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
