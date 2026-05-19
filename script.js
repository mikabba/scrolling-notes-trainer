// Scrolling Notes Trainer

(() => {
  const staff = document.getElementById("staff");
  const measuresContainer = document.getElementById("measuresContainer");
  const scoreValue = document.getElementById("scoreValue");
  const errorValue = document.getElementById("errorValue");
  const levelValue = document.getElementById("levelValue");
  const toggleButton = document.getElementById("toggleButton");
  const resetButton = document.getElementById("resetButton");

  const STAFF_TOP = 42;
  const STAFF_STEP = 28;
  const NOTE_HEIGHT = 30;
  const SCORE_RATE = 22;
  const BASE_SPEED = 170;
  const MAX_SPEED_BONUS = 260;
  const LEVEL_STEP = 300;

  const notePositions = Array.from({ length: 9 }, (_, index) => {
    const bottomLineCenter = STAFF_TOP + STAFF_STEP * 4;
    const halfStep = STAFF_STEP / 2;
    return bottomLineCenter - index * halfStep - NOTE_HEIGHT / 2;
  });

  let score = 0;
  let errors = 0;
  let level = 0;
  let currentPosition = 0;
  let measureWidth = 0;
  let measures = [];
  let isScrolling = false;
  let animationFrameId = null;
  let lastTimestamp = null;

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createNote(left, top) {
    const note = document.createElement("div");
    note.className = "note";
    note.style.left = `${left}px`;
    note.style.top = `${top}px`;
    return note;
  }

  function createMeasure(leftPosition) {
    const measure = document.createElement("div");
    measure.className = "measure";
    measure.style.left = `${leftPosition}px`;
    measure.style.width = `${measureWidth}px`;
    measure.dataset.left = String(leftPosition);

if (measures.length === 0) {
  const clef = document.createElement("div");
  clef.className = "clef";
  clef.innerHTML = '<span class="clef-symbol">𝄞</span><span class="clef-dots">:</span>';
  measure.appendChild(clef);
}

    const numberOfNotes = randomInteger(1, 4);
    const availableStart = measures.length === 0 ? 180 : 70;
    const availableWidth = Math.max(measureWidth - availableStart - 60, 160);
    const spacing = availableWidth / (numberOfNotes + 1);

    for (let i = 0; i < numberOfNotes; i += 1) {
      const left = availableStart + spacing * (i + 1);
      const top = notePositions[randomInteger(0, notePositions.length - 1)];
      measure.appendChild(createNote(left, top));
    }

    measuresContainer.appendChild(measure);
    measures.push(measure);
  }

  function updateMeasureWidth() {
    measureWidth = staff.clientWidth;
  }

  function initializeMeasures() {
    measuresContainer.innerHTML = "";
    measures = [];
    currentPosition = 0;
    measuresContainer.style.transform = "translateX(0px)";

    updateMeasureWidth();

    for (let i = 0; i < 3; i += 1) {
      createMeasure(i * measureWidth);
    }
  }

  function updateDisplays() {
    scoreValue.textContent = Math.floor(score).toString();
    errorValue.textContent = errors.toString();
    levelValue.textContent = level.toString();
  }

  function getCurrentSpeed() {
    const speedBonus = MAX_SPEED_BONUS * (1 - Math.exp(-0.0015 * score));
    return BASE_SPEED + speedBonus;
  }

  function setLevelBackground(nextLevel) {
    const hue = Math.max(125, 235 - nextLevel * 2);
    const saturation = 72;
    const light1 = 96 - Math.min(nextLevel, 30) * 0.35;
    const light2 = 90 - Math.min(nextLevel, 30) * 0.35;

    document.body.classList.add("level-transition");
    document.body.style.background = `
      linear-gradient(
        135deg,
        hsl(${hue}, ${saturation}%, ${light1}%),
        hsl(${hue + 34}, ${saturation - 15}%, ${light2}%)
      )
    `;

    window.setTimeout(() => {
      document.body.classList.remove("level-transition");
    }, 1000);
  }

  function updateLevel() {
    const nextLevel = Math.floor(score / LEVEL_STEP);
    if (nextLevel !== level) {
      level = nextLevel;
      setLevelBackground(level);
    }
  }

  function recycleMeasures() {
    if (measures.length === 0) return;

    const first = measures[0];
    const firstLeft = Number(first.dataset.left);

    if (firstLeft + currentPosition < -measureWidth) {
      first.remove();
      measures.shift();

      const last = measures[measures.length - 1];
      const lastLeft = Number(last.dataset.left);
      createMeasure(lastLeft + measureWidth);
    }
  }

  function scroll(timestamp) {
    if (!isScrolling) return;

    if (lastTimestamp === null) {
      lastTimestamp = timestamp;
    }

    const deltaSeconds = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
    lastTimestamp = timestamp;

    currentPosition -= getCurrentSpeed() * deltaSeconds;
    score += SCORE_RATE * deltaSeconds;

    measuresContainer.style.transform = `translateX(${currentPosition}px)`;

    updateLevel();
    recycleMeasures();
    updateDisplays();

    animationFrameId = requestAnimationFrame(scroll);
  }

  function startScrolling() {
    if (isScrolling) return;

    isScrolling = true;
    lastTimestamp = null;
    toggleButton.textContent = "Pause";
    animationFrameId = requestAnimationFrame(scroll);
  }

  function stopScrolling() {
    isScrolling = false;
    toggleButton.textContent = "Start";

    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  function registerError() {
    errors += 1;
    updateDisplays();
  }

  function resetGame() {
    stopScrolling();
    score = 0;
    errors = 0;
    level = 0;
    document.body.removeAttribute("style");
    initializeMeasures();
    updateDisplays();
  }

  toggleButton.addEventListener("click", () => {
    if (isScrolling) {
      stopScrolling();
    } else {
      startScrolling();
    }
  });

  resetButton.addEventListener("click", resetGame);

  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
      event.preventDefault();
      startScrolling();
    }

    if (event.code === "Space" && !event.repeat) {
      event.preventDefault();
      registerError();
    }

    if (event.code === "KeyR") {
      resetGame();
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.code === "ArrowRight") {
      event.preventDefault();
      stopScrolling();
    }
  });

  window.addEventListener("resize", () => {
    initializeMeasures();
  });

  resetGame();
})();
