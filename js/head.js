const x = 250;
const y = 150;
const r = 75;
let a = 0;

const rotate = (a, obj) => {
  const px = x + r * 3.5 * Math.cos(a);
  const py = y + r * Math.sin(a);


  obj.style.transform = `transform${px - obj.offsetWidth / 2}px,${py - obj.offsetHeight / 2 }px) scale(${(y + 150) / (py + 150)})`;
  obj.style.zIndex = py > y ? 100 : 200;
};

const wordWidth = words[0].offsetWidth;
const distance = wordWidth / (2 * Math.PI * r);

const updateAnimation = () => {
  a = (a + distance / 10) % (2 * Math.PI);
  for (let i = 0; i < words.length; i++) {
    rotate(i * 2 * Math.PI / words.length - a, words[i]);
  }
  requestAnimationFrame(updateAnimation);
};

updateAnimation();

document.querySelector('.about').addEventListener('mousemove', eyeball);

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