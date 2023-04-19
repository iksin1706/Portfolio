const nav = document.getElementById('nav');
const navContainer = document.getElementById('nav-container');
const navButton = document.getElementById('nav-button');

Array.from(document.getElementsByClassName("nav__list__item"))
  .forEach((item, index) => {
    item.onmouseover = () => {
      nav.dataset.activeIndex = index;
    }
  }
 )

 navButton.onclick = () => {
    if (!activeNav) {
      nav.dataset.active = true;
      activeNav = true;
    } else {
      nav.dataset.active = false;
      activeNav = false;
    }
  }