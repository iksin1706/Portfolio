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
  { duration: 500, yoyo: true }
)
let headAnimation2 = KUTE.fromTo(
  '#head2-1',
  { path: '#head2-1' },
  { path: '#head2-2' },
  { duration: 500, yoyo: true }
)



document.querySelector('.hero__header').innerHTML = "";


async function typingAnimation(className, texts, speed) {
  const element = document.querySelector(className);

  for (let i = 0; i < texts.length - 1; i++) {
    const text = texts[i];

    leftHandAnimation.start();
    rightHandAnimation.start();
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

window.addEventListener("load",async ()=>{
  const preloader = document.getElementById("preloader");
  animations();
  preloader.classList.add("preloader-hidden");
  await new Promise(resolve => setTimeout(resolve, 1000)).then(()=>{preloader.style.display='none'});
  
});


if (window.innerWidth > 800) {
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
}