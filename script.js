// by
// abubakersaeed.netlify.com | @AbubakerSaeed96
// ============================================

// Inspiration:
// Tilt.js: https://gijsroge.github.io/tilt.js/
// Andy Merskin's parallax depth cards pen: https://codepen.io/andymerskin/full/XNMWvQ/

// Thank You for Viewing

class parallaxTiltEffect {

  constructor({ element, tiltEffect }) {

    this.element = element;
    this.container = this.element.querySelector(".container");
    this.size = [300, 360];
    [this.w, this.h] = this.size;

    this.tiltEffect = tiltEffect;

    this.mouseOnComponent = false;

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.defaultStates = this.defaultStates.bind(this);
    this.setProperty = this.setProperty.bind(this);
    this.init = this.init.bind(this);

    this.init();
  }

  handleMouseMove(event) {
    const { offsetX, offsetY } = event;

    let X;
    let Y;

    if (this.tiltEffect === "reverse") {
      X = ((offsetX - (this.w / 2)) / 3) / 3;
      Y = (-(offsetY - (this.h / 2)) / 3) / 3;
    }

    else if (this.tiltEffect === "normal") {
      X = (-(offsetX - (this.w / 2)) / 3) / 3;
      Y = ((offsetY - (this.h / 2)) / 3) / 3;
    }

    this.setProperty('--rY', X.toFixed(2));
    this.setProperty('--rX', Y.toFixed(2));

    this.setProperty('--bY', (80 - (X / 4).toFixed(2)) + '%');
    this.setProperty('--bX', (50 - (Y / 4).toFixed(2)) + '%');
  }

  handleMouseEnter() {
    this.mouseOnComponent = true;
    this.container.classList.add("container--active");
  }

  handleMouseLeave() {
    this.mouseOnComponent = false;
    this.defaultStates();
  }

  defaultStates() {
    this.container.classList.remove("container--active");
    this.setProperty('--rY', 0);
    this.setProperty('--rX', 0);
    this.setProperty('--bY', '80%');
    this.setProperty('--bX', '50%');
  }

  setProperty(p, v) {
    return this.container.style.setProperty(p, v);
  }

  init() {
    this.element.addEventListener('mousemove', this.handleMouseMove);
    this.element.addEventListener('mouseenter', this.handleMouseEnter);
    this.element.addEventListener('mouseleave', this.handleMouseLeave);
  }

}

const $ = e => document.querySelector(e);

const wrap1 = new parallaxTiltEffect({
  element: $('.wrap--1'),
  tiltEffect: 'reverse'
});

const wrap2 = new parallaxTiltEffect({
  element: $('.wrap--2'),
  tiltEffect: 'normal'
});

const wrap3 = new parallaxTiltEffect({
  element: $('.wrap--3'),
  tiltEffect: 'reverse'
});



gsap.set(".ball", { xPercent: -50, yPercent: -50 });
gsap.set(".follow-ball", { xPercent: -50, yPercent: -50 });

const ball = document.querySelector(".ball");
const follow = document.querySelector(".follow-ball");
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const posF = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };
const speed = 1;
const speedF = 0.35;

const xSet = gsap.quickSetter(ball, "x", "px");
const ySet = gsap.quickSetter(ball, "y", "px");
const xSetFollow = gsap.quickSetter(follow, "x", "px");
const ySetFollow = gsap.quickSetter(follow, "y", "px");

window.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

gsap.ticker.add(() => {
  const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
  const dtF = 1.0 - Math.pow(1.0 - speedF, gsap.ticker.deltaRatio());
  const xSetPos = pos.x += (mouse.x - pos.x) * dt;
  const ySetPos = pos.y += (mouse.y - pos.y) * dt;
  const xSetFollowPos = posF.x += (mouse.x - posF.x) * dtF;
  const ySetFollowPos = posF.y += (mouse.y - posF.y) * dtF;

  xSet(xSetPos);
  ySet(ySetPos);
  xSetFollow(xSetFollowPos);
  ySetFollow(ySetFollowPos);
});

