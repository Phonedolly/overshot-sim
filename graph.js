const REDUCE_RATE = 0.08;
const X_AMPLIFY_FACTOR = 800;
const DIFF_X = 0.7;

const mainGraph = document.getElementById("main-graph");
// const object = document.getElementById("object");
const run = document.getElementById("run");

// const objectDomRect = object.getBoundingClientRect();
// const objectOriginX = objectDomRect.x;
// const objectOriginY = objectDomRect.y;

// let objectX = objectOriginX;
// let objectY = objectOriginY;

let startVar = 450;
let endVar = 545;

// startVar *= 0.2;
// endVar *= 0.2;

// let time = 1, inPoint = 0.9999;

function init() {
  const svg = document.getElementById("svg");
  if (svg) {
    document.removeChild(svg);
  }
}

function _move(t, freq = 7, decay = 3, dur = 0.01) {

  if (t >= 0 && t < dur) {
    // in After Effect, ease(t, 0, dur, startVal, endVal);
    // const newY = [objectY - startVar, objectY - endVar]
    const objectY = (-endVar + startVar); // (objectY - endVar) - (objectY - startVar);

    return objectY;
  } else {
    const amp = (endVar - startVar) / dur;
    const w = freq * Math.PI
    // in After Effect, endVal + amp * (Math.sin((t - dur) * w) / Math.exp(decay * (t - dur)) / w);
    const newY = (endVar) + amp * (Math.sin((t - dur) * w) / Math.exp(decay * (t - dur)) / w);

    return newY
  }
}

run.addEventListener("click", async () => {
  init();

  let time = 0.00, inPoint = 1.00;
  let firstAnimation = true;
  let ret;
  let tDelta = 0.001;
  let howToMove = [];
  let i = 0;

  for (; i < (inPoint - time) / tDelta; i++) {
    const inc = -((endVar - startVar) / (0.01 + (inPoint - time))) * (((0.01 + inPoint - time) / ((inPoint - time) / tDelta)));
    const x = i;
    howToMove.push([time * DIFF_X * X_AMPLIFY_FACTOR, (inc * i  + 600)])
    console.log(inc * i - startVar)

    console.log((-((endVar - startVar) / (0.01 + (inPoint - time))) * (((0.01 + inPoint - time) / ((inPoint - time) / tDelta)) * i) - startVar))
  }
  time += tDelta
  while (time < 3.0) {
    let t = time - inPoint;
    ret = _move(t);
    howToMove.push([time * DIFF_X * X_AMPLIFY_FACTOR, (ret - startVar) * REDUCE_RATE]);
    time += tDelta;
    i++;
  }

  let newRect = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  gsap.set(newRect, {
    attr: {
      viewBox: `-20 ${-(600)} 1600 ${1200}`,
      // height: `${window.outerHeight * 0.8}`,
      // width: `${window.innerWidth}`,
    },
  })

  for (let i = 0; i < howToMove.length - 2; i++) {
    let newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    gsap.set(newPath, {
      attr: { d: `M ${howToMove[i][0]} ${howToMove[i][1]} Q ${howToMove[i + 1][0]} ${howToMove[i + 1][1]} ${howToMove[i + 2][0]} ${howToMove[i + 2][1]}`, stroke: "coral", "stroke-width": "10" }
    })
    console.log(`M ${howToMove[i][0]} ${howToMove[i][1]} q ${howToMove[i + 1][0] - howToMove[i][0]} ${howToMove[i + 1][1] - howToMove[i][1]}`);
    if (i == 0) {
      newRect.appendChild(newPath);
    } else {
      newRect.lastElementChild.after(newPath);
    }

  }
  // let newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // gsap.set(newPath, {
  //   attr: { d: "M0 0 L500 500", stroke: "red" },
  // })
  // newRect.appendChild(newPath);

  document.querySelector(".svg").appendChild(newRect);

  // anime({
  //   targets: '.object',
  //   keyframes: howToMove,
  //   duration: 10000,
  //   update: function (anim) {
  //     // console.log(anim)
  //     const newObject = document.getElementById("object").cloneNode(true);
  //     const curX = Number(anim.animations[0].currentValue.replace("px", ""));
  //     const curY = Number(anim.animations[1].currentValue.replace("px", ""));
  //     console.log(curX, curY)
  //     newObject.className = "object";
  //     newObject.id = `object$${Math.random()}`;
  //     newObject.style.setProperty("left", curX);
  //     newObject.style.setProperty("top", curY);
  //     newObject.style.setProperty("position", "fixed");

  //     object.before(newObject);

  //     // newObject.style.x = anim.
  //   }
  // })

  // setTimeout(async function run() {

  //   setTimeout(run, 0);
  // }, 0);
})

run.click();