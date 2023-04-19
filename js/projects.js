let cardsContainer = document.querySelector(".projects__container");
let projects = document.querySelector(".projects");
cardsContainer.dataset.prevPercentage = "0";


Array.from(cardsContainer.getElementsByClassName("card__image"))
  .forEach((item, index) => {
    item.style.backgroundImage = `url(img/project${index}.png)`;
  }
  )

projects.addEventListener("mousedown", startDrag);
projects.addEventListener("mouseup", stopDrag);
projects.addEventListener("mousemove", drag);

projects.addEventListener("touchstart", startDrag);
projects.addEventListener("touchend", stopDrag);
projects.addEventListener("touchmove", drag);

function startDrag(e) {
  if (e.type === "mousedown") {
    cardsContainer.dataset.mouseDownAt = e.clientX;
  } else if (e.type === "touchstart") {
    cardsContainer.dataset.mouseDownAt = e.touches[0].clientX;
  }
}

function stopDrag(e) {
  cardsContainer.dataset.mouseDownAt = "0";
  cardsContainer.dataset.prevPercentage = cardsContainer.dataset.percentage;
}

function drag(e) {
  let clientX;
  if (e.type === "mousemove") {
    clientX = e.clientX;
  } else if (e.type === "touchmove") {
    clientX = e.touches[0].clientX;
  } else {
    return;
  }

  if (cardsContainer.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(cardsContainer.dataset.mouseDownAt) - clientX;
  maxDelta = cardsContainer.offsetWidth / 3;

  const percentage = (mouseDelta / maxDelta) * 100;
  const nextPercentage = Math.min(Math.max(parseFloat(cardsContainer.dataset.prevPercentage) + percentage, 0), 80);

  cardsContainer.dataset.percentage = nextPercentage;

  cardsContainer.style.transform = `translate(${-nextPercentage}%,-50%)`;

  cardsContainer.animate({
    transform: `translate(${-nextPercentage}%,-50%)`
  }, { duration: 1000, fill: 'forwards' })


  for (const image of cardsContainer.getElementsByClassName('card__image')) {
    image.animate({
      backgroundPosition: `${nextPercentage}% center`
    }, { duration: 1000, fill: 'forwards' })
  }
}

