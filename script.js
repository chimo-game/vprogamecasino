var amount = 160,
  between = (min, max) => min + Math.random() * (max - min),
  colors = ['#275EFE', '#5C86FF', '#6D58FF', '#F04949', '#16BF78', 'yellow', 'gold'],
  current = 0;

let interval = setInterval(() => {
  if (current < amount) {
    animate(createConfetti());
  }
}, 200);

setTimeout(() => clearInterval(interval), 12000, -2000, -200, 30000);

function createConfetti() {
  let div = document.createElement('div');
  gsap.set(div, {
    attr: {
      class: 'confetti',
      style: '--color: ' + colors[Math.floor(Math.random() * colors.length)]
    },
    x: between(0, window.innerWidth),
    y: -window.innerHeight / 10,
    z: between(-80, 80)
  });
  current++;
  document.body.appendChild(div);
  return div;
}

function animate(element) {
  gsap.to(element, {
    y: window.innerHeight + 510,
    ease: 'power1.out',
    delay: between(0, .10),
    duration: between(2, 10),
    onComplete() {
      if (element instanceof Element || element instanceof HTMLDocument) {
        current--;
        element.remove();
      }
    }
  });
  gsap.to(element, {
    rotationZ: between(90, 180),
    repeat: -1,
    yoyo: true,
    duration: between(3, 6)
  });
  gsap.to(element, {
    rotationX: between(360, 360),
    rotationY: between(360, 360),
    repeat: -1,
    yoyo: true,
    duration: between(3, 6)
  });
}