// UI REFERENCES
const simStatus = document.getElementById("simStatus");
const arduinoArea = document.getElementById("arduinoArea");
const ledArea = document.getElementById("ledArea");
const buttonArea = document.getElementById("buttonArea");
const codeArea = document.getElementById("code");
const wiringInfo = document.getElementById("wiringInfo");

// STATE VARIABLES
let ledState = false;
let simulationRunning = false;
let draggedComponent = null;

// GENERATE PIN OPTIONS (D2–D13)
function generatePinOptions(defaultPin) {
  let options = "";
  for (let i = 2; i <= 13; i++) {
    const selected = i === defaultPin ? "selected" : "";
    options += `<option value="${i}" ${selected}>D${i}</option>`;
  }
  return options;
}

// DRAG FROM COMPONENT PALETTE
document.getElementById("addArduino").ondragstart = () => {
  draggedComponent = "arduino";
};

document.getElementById("addLED").ondragstart = () => {
  draggedComponent = "led";
};

document.getElementById("addButton").ondragstart = () => {
  draggedComponent = "button";
};

function handleDrop() {
  if (draggedComponent === "arduino") {
    document.getElementById("addArduino").click();
  } else if (draggedComponent === "led") {
    document.getElementById("addLED").click();
  } else if (draggedComponent === "button") {
    document.getElementById("addButton").click();
  }
  draggedComponent = null;
}

// ADD ARDUINO
document.getElementById("addArduino").onclick = () => {
  arduinoArea.innerHTML = `<div class="box">Arduino Uno</div>`;
};

// ADD LED (DEFAULT D10)
document.getElementById("addLED").onclick = () => {
  ledArea.innerHTML = `
    <div class="box">
      LED Pin:
      <select id="ledPin">
        ${generatePinOptions(10)}
      </select>

      <div id="led" class="led"></div>
    </div>
  `;
  updateCode();
};

// ADD PUSH BUTTON (DEFAULT D2)
document.getElementById("addButton").onclick = () => {
  buttonArea.innerHTML = `
    <div class="box">
      Button Pin:
      <select id="buttonPin">
        ${generatePinOptions(2)}
      </select>

      <br><br>
      <button id="simButton">PRESS BUTTON</button>
    </div>
  `;

  document.getElementById("simButton").onclick = () => {
    if (!simulationRunning) {
      alert("Click START Simulation first");
      return;
    }

    const led = document.getElementById("led");
    if (!led) {
      alert("LED not added yet");
      return;
    }

    ledState = !ledState;
    led.classList.toggle("on", ledState);
  };

  updateCode();
};

// AUTO WIRING DISPLAY
function updateWiringInfo() {
  const ledPin = document.getElementById("ledPin")?.value || 10;
  const buttonPin = document.getElementById("buttonPin")?.value || 2;

  wiringInfo.innerHTML = `
    LED → Arduino D${ledPin}<br>
    Button → Arduino D${buttonPin}
  `;
}

// PIN CONFLICT PREVENTION
function enforcePinRules() {
  const ledSelect = document.getElementById("ledPin");
  const buttonSelect = document.getElementById("buttonPin");

  if (!ledSelect || !buttonSelect) return;

  const ledPin = ledSelect.value;
  const buttonPin = buttonSelect.value;

  Array.from(ledSelect.options).forEach(opt => opt.disabled = false);
  Array.from(buttonSelect.options).forEach(opt => opt.disabled = false);

  Array.from(buttonSelect.options).forEach(opt => {
    if (opt.value === ledPin) opt.disabled = true;
  });

  Array.from(ledSelect.options).forEach(opt => {
    if (opt.value === buttonPin) opt.disabled = true;
  });

  // Force repaint so faded styling is visible
  ledSelect.value = ledPin;
  buttonSelect.value = buttonPin;
}

// AUTO ARDUINO CODE GENERATION
function updateCode() {
  const ledPin = document.getElementById("ledPin")?.value || 10;
  const buttonPin = document.getElementById("buttonPin")?.value || 2;

  codeArea.textContent =
`int ledPin = ${ledPin};
int buttonPin = ${buttonPin};

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {
  if (digitalRead(buttonPin) == HIGH) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}`;

  updateWiringInfo();
  enforcePinRules();
}

// START / STOP SIMULATION
document.getElementById("startSim").onclick = () => {
  simulationRunning = true;
  simStatus.textContent = "RUNNING";
  simStatus.className = "running";
};

document.getElementById("stopSim").onclick = () => {
  simulationRunning = false;
  ledState = false;
  simStatus.textContent = "STOPPED";
  simStatus.className = "stopped";
  document.getElementById("led")?.classList.remove("on");
};

// UPDATE ON PIN CHANGE
document.addEventListener("change", updateCode);

// SHOW / HIDE CODE TOGGLE
const toggleBtn = document.getElementById("toggleCode");

if (toggleBtn) {
  toggleBtn.onclick = () => {
    const codeBlock = document.getElementById("code");

    if (codeBlock.style.display === "none") {
      codeBlock.style.display = "block";
      toggleBtn.textContent = "Hide Code";
    } else {
      codeBlock.style.display = "none";
      toggleBtn.textContent = "Show Code";
    }
  };
}
