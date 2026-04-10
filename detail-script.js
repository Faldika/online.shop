// GANTI GAMBAR (thumbnail)
function changeImg(el) {
  document.getElementById("mainImg").src = el.src;
  document.querySelectorAll(".thumbnail img").forEach(img => img.classList.remove("active"));
  el.classList.add("active");
}

// SIZE ACTIVE
function selectSize(btn) {
  document.querySelectorAll(".size button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

// QTY
let qty = 1;

function plus() {
  qty++;
  document.getElementById("qty").innerText = qty;
}

function minus() {
  if (qty > 1) {
    qty--;
    document.getElementById("qty").innerText = qty;
  }
}

// ADD CART
function addCart() {
  const selectedSizeBtn = document.querySelector(".size button.active");
  if (!selectedSizeBtn) {
    alert("Pilih ukuran terlebih dahulu!");
    return;
  }
  const name  = document.getElementById("productName").value;
  const price = parseInt(document.getElementById("productPrice").value);
  const image = document.getElementById("productImage").value;
  const size  = selectedSizeBtn.innerText;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingIndex = cart.findIndex(item => item.name === name && item.size === size);
  if (existingIndex !== -1) {
    cart[existingIndex].qty += qty;
  } else {
    cart.push({ name, price, image, size, qty });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "cart.html";
}

// BUY NOW
function buyNow() {
  const selectedSizeBtn = document.querySelector(".size button.active");
  if (!selectedSizeBtn) {
    alert("Pilih ukuran terlebih dahulu!");
    return;
  }
  const name  = document.getElementById("productName").value;
  const price = parseInt(document.getElementById("productPrice").value);
  const image = document.getElementById("productImage").value;
  const size  = selectedSizeBtn.innerText;

  const buyItem = [{ name, price, image, size, qty }];
  localStorage.setItem("cart", JSON.stringify(buyItem));
  window.location.href = "payment.html";
}

// SIZE CHART
function sizeChart() {
  const front     = document.getElementById("frontImage")?.value  || "";
  const back      = document.getElementById("backImage")?.value   || "";
  const name      = document.getElementById("productName")?.value || "";
  const chartType = document.getElementById("chartType")?.value   || "tshirt";
  const params = new URLSearchParams({ front, back, name, chartType });
  window.location.href = "size chart.html?" + params.toString();
}

// NAVBAR DROPDOWN
document.addEventListener("DOMContentLoaded", function () {
  // Set thumbnail pertama sebagai active
  const firstThumb = document.querySelector(".thumbnail img");
  if (firstThumb) firstThumb.classList.add("active");

  const dropdown = document.querySelector(".dropdown");
  const trigger  = dropdown.querySelector("a");

  trigger.addEventListener("click", function(e) {
    e.preventDefault();
    dropdown.classList.toggle("active");
  });

  document.addEventListener("click", function(e) {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
});

// IMAGE SLIDER (arrow)
function getImages() {
  return Array.from(document.querySelectorAll(".thumbnail img")).map(img => img.src);
}

let currentIndex = 0;

function showImage() {
  const images = getImages();
  document.getElementById("mainImg").src = images[currentIndex];
  document.querySelectorAll(".thumbnail img").forEach((img, i) => {
    img.classList.toggle("active", i === currentIndex);
  });
}

function nextImg() {
  const images = getImages();
  if (currentIndex < images.length - 1) {
    currentIndex++;
    showImage();
  }
}

function prevImg() {
  if (currentIndex > 0) {
    currentIndex--;
    showImage();
  }
}
