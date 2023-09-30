export function handleWindowResize() {
  const textInfo = document.getElementById("info_text");

  const windowWidth = window.innerWidth;

  if (windowWidth <= 816) {
    textInfo.textContent = "Important info";
  } else {
    textInfo.textContent = "Important info regarding our service";
  }
}

export function createDataTable(data) {
  const infoOverlay = document.getElementById("details");
  infoOverlay.innerHTML = "";

  let photo = "";
  const images = data.images;
  if (images.length === 0) {
    photo =
      "https://cdn.shopify.com/s/files/1/0690/0075/7529/products/AAUvwnj0ICORVuxs41ODOvnhvedArLiSV20df7r8XBjEUQ_s900-c-k-c0x00ffffff-no-rj_cc0a4cb2-7c6b-4663-abac-1ee40325a961.jpg?v=1670516985";
  }
  images.forEach((image) => {
    photo = image.src;
  });

  const photoPart = document.createElement("div");
  photoPart.className = "photo_part";
  const infoSpace = document.createElement("div");
  infoSpace.className = "info_space";
  const details = document.createElement("div");
  details.className = "details_part";

  const img = document.createElement("img");
  img.className = "info_img";
  img.src = photo;

  const p1 = document.createElement("p");
  p1.className = "info_details";
  const p2 = document.createElement("p");
  p2.className = "info_details";
  const p3 = document.createElement("p");
  p3.className = "info_details";
  const p4 = document.createElement("p");
  p4.className = "info_details";
  const p5 = document.createElement("p");
  p5.className = "info_details";
  const p6 = document.createElement("p");
  p6.className = "info_details";

  p1.textContent = data.title;
  p2.textContent = data.handle;
  p3.textContent = data.vendor;
  p4.textContent = data.published_at;
  p5.textContent = data.created_at;
  p6.textContent = data.updated_at;

  details.appendChild(p1);
  details.appendChild(p2);
  details.appendChild(p3);
  details.appendChild(p4);
  details.appendChild(p5);
  details.appendChild(p6);
  photoPart.appendChild(img);
  infoOverlay.appendChild(photoPart);
  infoOverlay.appendChild(infoSpace);
  infoOverlay.appendChild(details);
}

export function openOverlay(showInfo) {
  const infoOverlay = document.getElementById("black_overlay");
  const infoBtn = document.getElementById("more_button");
  const info = document.getElementById("info");

  if (showInfo) {
    infoOverlay.style.display = "block";
    infoBtn.style.rotate = "180deg";
    info.style.borderRadius = "6px 6px 0px 0px";
  } else {
    infoOverlay.style.display = "none";
    infoBtn.style.rotate = "360deg";
    info.style.borderRadius = "6px 6px 6px 6px";
  }
}
