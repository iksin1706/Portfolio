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

function scrollToElement(section) {

  if (section === "home") paralax.scrollTo({
    top: Position(sections[0]),
    behavior: 'smooth',
  })
  if (section === "about") paralax.scrollTo({
    top: Position(sections[1]),
    behavior: 'smooth',
  })
  if (section === "projects") paralax.scrollTo({
    top: Position(sections[2]),
    behavior: 'smooth',
  })
  if (section === "contact") paralax.scrollTo({
    top: Position(sections[3]),
    behavior: 'smooth',
  })
  nav.dataset.active = false;
  activeNav = false;
}

function Position(obj) {
  var currenttop = 0;
  if (obj.offsetParent) {
    do {
      currenttop += obj.offsetTop;
    } while ((obj = obj.offsetParent));
    return [currenttop];
  }
}