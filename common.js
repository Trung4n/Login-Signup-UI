// Description: Common functions for all pages
function loadComponent(url, elementId, callback) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
      if (callback) callback();
    })
    .catch((error) => console.error(`Error loading ${url}:`, error));
}

document.addEventListener("DOMContentLoaded", function () {
  loadComponent("header.html", "header-container");
  loadComponent("slider.html", "slider-container", initSlider);
});

// Slider background
function initSlider() {
  let items = document.querySelectorAll(".slider .list .item");
  let countItem = items.length;
  let itemActive = 0;

  function showSlider() {
    itemActive = (itemActive + 1) % countItem;
    let itemActiveOld = document.querySelector(".slider .list .item.active");
    itemActiveOld.classList.remove("active");

    items[itemActive].classList.add("active");
  }

  setInterval(showSlider, 8000);
}
