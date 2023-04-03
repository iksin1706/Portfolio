const nav = document.getElementById('nav');
const navContainer = document.getElementById('nav-container');
const navButton = document.getElementById('nav-button');
const words = Array.from(document.getElementsByClassName("head__word"));

console.log(nav.style.width);
var activeNav = false;


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

const x = 250;
const y = 150;
const r = 75;
let a = 0;

const rotate = (a, obj) => {
  const px = x + r * 3.5 * Math.cos(a);
  const py = y + r * Math.sin(a);

  obj.style.left = px - obj.offsetWidth / 2 + 'px';
  obj.style.top = py - obj.offsetHeight / 2 + 'px';
  obj.style.transform = `scale(${(y + 150) / (py + 150)})`;
  obj.style.zIndex = py > y ? 100 : 200;
};

const wordWidth = words[0].offsetWidth;
const distance = wordWidth / (2 * Math.PI * r);

const updateAnimation = () => {
  a = (a + distance/10) % (2 * Math.PI);
  for (let i = 0; i < words.length; i++) {
    rotate(i * 2 * Math.PI / words.length - a, words[i]);
  }
  requestAnimationFrame(updateAnimation);
};

updateAnimation();


document.addEventListener('mousemove', eyeball);

function eyeball(event) {
  const eyes = document.querySelectorAll('.head__eye');
  eyes.forEach(eye => {
    const { left, top, width, height } = eye.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;

    const radian = Math.atan2(event.pageX - x, event.pageY - y);
    const rotate = radian * (180 / Math.PI) * -1 + 270;
    eye.style.transform = `rotate(${rotate}deg)`;
  });
}



let cardsContainer = document.querySelector(".projects__container");
let projects = document.querySelector(".projects");
cardsContainer.dataset.prevPercentage = "0";


Array.from(cardsContainer.getElementsByClassName("card__image"))
  .forEach((item, index) => {
    item.style.backgroundImage = `url(img/project${index}.png)`;
  }
  )

projects.onmousedown = e => {
  cardsContainer.dataset.mouseDownAt = e.clientX;
}
projects.onmouseup = e => {
  cardsContainer.dataset.mouseDownAt = "0";
  cardsContainer.dataset.prevPercentage = cardsContainer.dataset.percentage;
}

projects.onmousemove = e => {

  if (cardsContainer.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(cardsContainer.dataset.mouseDownAt) - e.clientX;
  maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * 100;
  const nextPercentage = Math.min(Math.max(parseFloat(cardsContainer.dataset.prevPercentage) + percentage, 0), 50);

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



//TYPING ANIMATION


let typingSpeed = 75;

let leftHandAnimation = KUTE.fromTo(
  '#hand1-1',
  { path: '#hand1-1' },
  { path: '#hand1-2' },
  { duration: typingSpeed, yoyo: true, repeat: 999 }
)
let rightHandAnimation = KUTE.fromTo(
  '#hand2-1',
  { path: '#hand2-1' },
  { path: '#hand2-2' },
  { duration: typingSpeed, yoyo: true, repeat: 999 }
)
let headAnimation = KUTE.fromTo(
  '#head1-1',
  { path: '#head1-1' },
  { path: '#head1-2' },
  { duration: 500,yoyo:true }
)
let headAnimation2 = KUTE.fromTo(
  '#head2-1',
  { path: '#head2-1' },
  { path: '#head2-2' },
  { duration: 500,yoyo:true }
)






async function typingAnimation(className, texts, speed) {
  const element = document.querySelector(className);
  for (let i = 0; i < texts.length - 1; i++) {
    const text = texts[i];

    leftHandAnimation.start();
    rightHandAnimation.start();
    console.log("start typing")
    for (const char of text) {
      element.innerHTML += char;
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    leftHandAnimation.stop();
    rightHandAnimation.stop();
    await new Promise(resolve => setTimeout(resolve, 500));
    rightHandAnimation.start();
    for (let j = element.innerHTML.length - 1; j >= 0; j--) {
      element.innerHTML = element.innerHTML.substring(0, j);
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    rightHandAnimation.stop();

  }



  const finalText = texts[texts.length - 1];
  leftHandAnimation.start();
  rightHandAnimation.start();
  for (const char of finalText) {
    element.innerHTML += char;
    await new Promise(resolve => setTimeout(resolve, speed));
  }
  leftHandAnimation.stop();
  rightHandAnimation.stop();
  headAnimation.reverse();
  headAnimation2.reverse();
  headAnimation.start();
  headAnimation2.start();



}

async function animations() {
  await new Promise(resolve => setTimeout(resolve, 2000));


  headAnimation.start();
  headAnimation2.start();
  await new Promise(resolve => setTimeout(resolve, 1000));
  typingAnimation(".hero__header", ["Hi I'm Łukasz Jasiński", "And this is my", "Portfolio"], typingSpeed);
}

animations();


//FIRECAMP ANIMATION

for (let i = 1; i <= 3; i++) {
  let tween = KUTE.fromTo(
      '#fire' + i + '-1',
      { path: '#fire' + i + '-1' },
      { path: '#fire' + i + '-3' },
      { duration: i == 3 ? 1000 : 100, yoyo: true, }
  )

  let tween2 = KUTE.fromTo(
      '#fire' + i + '-1',
      { path: '#fire' + i + '-3' },
      { path: '#fire' + i + '-2' },
      { duration: i == 3 ? 1000 : 100, }
  )

  let tween3 = KUTE.fromTo(
      '#fire' + i + '-1',
      { path: '#fire' + i + '-2' },
      { path: '#fire' + i + '-1' },
      { duration: i == 3 ? 1000 : 100, }
  )
  tween.chain(tween2);
  tween2.chain(tween3);
  tween3.chain(tween);

  tween.start();
}
let tweenLight = KUTE.fromTo(
  '#fire4-1',
  { opacity: 0.75 },
  { opacity: 1 },
  { duration: 150, yoyo: true, repeat: 9999 }
)
tweenLight.start();

const targets = document.querySelectorAll('.trigger');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, {
  rootMargin: '50%',
  threshold: [0.5]
});

targets.forEach((target) => {
  observer.observe(target);
});



