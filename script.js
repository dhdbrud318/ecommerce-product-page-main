const nav = document.querySelector(".primary-header__nav");
const navToggle = document.querySelector(".primary-nav-toggle");
const cartIcon = document.querySelector(".primary-header__cart");
const cartContainer = document.querySelector(".primary-header__cart-container");

// qty control
const addQtyBtn = document.querySelector("#plus");
const deleteQtyBtn = document.querySelector("#minus");
const qtyBoard = document.querySelector("#qty");

let itemQty = 0;
const addMsgBoard = document.querySelector("#add-msg");
const msg = ["Item successfully added!", "Must select at least one item"];

// image preveiw
const productImgContainer = document.querySelector(".main__product-img");
const productThumbnails = document.querySelectorAll(".main__thumbnail");
const productOverlays = document.querySelectorAll(".thumbnail-overlay");
let productThumbIndex = 0;

// lightbox
const lightbox = document.querySelector(".lightbox");
const lightboxImgContainer = document.querySelector(".lightbox__product-img");
const lightboxThumbnails = document.querySelectorAll(".lightbox__thumbnail");
const lightboxOverlays = document.querySelectorAll(".lightbox__overlay");
const lightboxCloseBtn = document.querySelector(".lightbox__btn-close");
let lightboxThumbIndex = 0;

// to update cart
const cartProductName = document.querySelector("#cart-name");
const cartPrice = document.querySelector("#cart-price");
const cartQty = document.querySelector("#cart-qty");
const cartTotal = document.querySelector("#cart-total");
const cartDeleteBtn = document.querySelector(".primary-header__item-delete");
const cartTooltip = document.querySelector("#cart-tooltip");

const addToCartBtn = document.querySelector(".main__btn-cart");

const [previousBtn, nextBtn] = document.querySelectorAll(".main__btn");
const [previousBtnLb, nextBtnLb] = document.querySelectorAll(".lightbox__btn");

const product = {
  name: "Fall Limited Edition Sneakers",
  price: 125.0,
  qty: 0,
  images: [
    "images/image-product-1.jpg",
    "images/image-product-2.jpg",
    "images/image-product-3.jpg",
    "images/image-product-4.jpg",
  ],
};

navToggle.addEventListener("click", () => {
  const visibility = nav.getAttribute("data-visible");
  if (visibility === "true") {
    navToggle.setAttribute("area-expanded", "false");
    nav.setAttribute("data-visible", "false");
  } else {
    navToggle.setAttribute("area-expanded", "true");
    nav.setAttribute("data-visible", "true");
  }
});

cartIcon.addEventListener("click", () => {
  const visibility = cartContainer.getAttribute("data-visible");
  if (visibility === "false") {
    cartContainer.setAttribute("data-visible", true);
  } else {
    cartContainer.setAttribute("data-visible", false);
  }
});

addQtyBtn.addEventListener("click", () => {
  itemQty++;
  qtyBoard.innerText = itemQty;
  deleteQtyBtn.disabled = false;
});

deleteQtyBtn.addEventListener("click", () => {
  itemQty--;
  qtyBoard.innerText = itemQty;
  if (itemQty === 0) deleteQtyBtn.disabled = true;
});

addToCartBtn.addEventListener("click", () => {
  if (itemQty > 0) {
    product.qty = itemQty;
    addMsgBoard.innerText = msg[0];
    itemQty = 0;
    qtyBoard.innerText = itemQty;
    updateCart();
    displayCartContent();
  } else if (itemQty === 0) {
    addMsgBoard.innerText = msg[1];
  }

  addMsgBoard.setAttribute("data-visible", true);
  setTimeout(
    () => {
      addMsgBoard.setAttribute("data-visible", false);
    },
    3000,
    this
  );
});

cartDeleteBtn.addEventListener("click", () => {
  product.qty = 0;
  displayCartContent();
});

productThumbnails.forEach((th, index) => {
  th.addEventListener("click", () => {
    productOverlays[productThumbIndex].classList.remove("thumbnail--active");
    productThumbIndex = index;
    lightboxThumbIndex = productThumbIndex;
    productOverlays[productThumbIndex].classList.add("thumbnail--active");
    productImgContainer.style.backgroundImage = `url(${product.images[productThumbIndex]})`;
  });
});

$(".main__product-img").click(function (e) {
  $(".lightbox").addClass("active");
  $(".lightbox__overlay").eq(lightboxThumbIndex).addClass("thumbnail--active");
});

lightboxCloseBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
  lightboxThumbIndex = productThumbIndex;
});

lightboxThumbnails.forEach((th, index) => {
  th.addEventListener("click", () => {
    lightboxOverlays[lightboxThumbIndex].classList.remove("thumbnail--active");
    lightboxThumbIndex = index;
    lightboxOverlays[lightboxThumbIndex].classList.add("thumbnail--active");
    lightboxImgContainer.style.backgroundImage = `url(${product.images[lightboxThumbIndex]})`;
  });
});

previousBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  switchThumbnail(false);
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  switchThumbnail();
});

previousBtnLb.addEventListener("click", (e) => {
  e.stopPropagation();
  switchThumbnailLb(false);
});

nextBtnLb.addEventListener("click", (e) => {
  e.stopPropagation();
  switchThumbnailLb();
});

function switchThumbnailLb(next = true) {
  lightboxOverlays[lightboxThumbIndex].classList.remove("thumbnail--active");
  if (next) lightboxThumbIndex = (lightboxThumbIndex + 1) % 4;
  else {
    lightboxThumbIndex =
      lightboxThumbIndex > 0
        ? (lightboxThumbIndex - 1) % 4
        : lightboxThumbIndex;
  }
  lightboxOverlays[lightboxThumbIndex].classList.add("thumbnail--active");
  lightboxImgContainer.style.backgroundImage = `url(${product.images[lightboxThumbIndex]})`;
}

function updateCart() {
  cartProductName.innerText = product.name;
  cartPrice.innerText = parseFloat(product.price).toFixed(2);
  cartQty.innerText = product.qty;
  cartTotal.innerText = parseFloat(product.price * product.qty).toFixed(2);
  cartTooltip.innerText = product.qty;
}

function displayCartContent() {
  const checkoutBtn = document.querySelector(".primary-header__checkout-btn");
  const itemContent = document.querySelector(".primary-header__cart-item");
  const emptyCart = document.querySelector(".primary-header__cart-empty");

  checkoutBtn.classList.toggle("invisible");
  itemContent.classList.toggle("invisible");
  emptyCart.classList.toggle("invisible");

  setTimeout(
    () => {
      if (product.qty > 0) cartTooltip.setAttribute("data-visible", true);
      else if (product.qty === 0)
        cartTooltip.setAttribute("data-visible", false);
    },
    500,
    this
  );
}

function switchThumbnail(next = true) {
  productOverlays[productThumbIndex].classList.remove("thumbnail--active");
  if (next) productThumbIndex = (productThumbIndex + 1) % 4;
  else {
    productThumbIndex =
      productThumbIndex > 0 ? (productThumbIndex - 1) % 4 : productThumbIndex;
  }
  lightboxThumbIndex = productThumbIndex;
  productOverlays[productThumbIndex].classList.add("thumbnail--active");
  productImgContainer.style.backgroundImage = `url(${product.images[productThumbIndex]})`;
}
