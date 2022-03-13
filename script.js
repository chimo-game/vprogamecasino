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