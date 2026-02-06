# Arduino Web Simulator

A web-based Arduino simulator developed as part of the **FOSSEE Open Source Hardware Internship 2025**.  
This project allows users to visually build a simple Arduino circuit, configure pin connections, auto-generate Arduino code, and simulate logic-level behavior directly in the browser.

---

## 📌 Project Objective

The objective of this project is to design a **simple, interactive web-based simulator** that helps beginners understand basic Arduino concepts such as:
- Digital pin configuration
- LED and push button interaction
- Automatic wiring logic
- Arduino code generation

This simulator eliminates the need for physical hardware during early learning stages.

---

## 🛠️ Technologies Used

- **HTML** – User interface structure
- **CSS** – Styling and responsive UI
- **JavaScript** – Logic, simulation, and auto code generation

---

## 🧩 Features Implemented

### ✅ Task 1: UI & Component Handling
- Component palette with:
  - Arduino Uno
  - LED
  - Push Button
- Drag-and-drop style component placement
- Central canvas to build the circuit
- Start / Stop simulation controls
- Show / Hide Arduino code toggle

---

### ✅ Task 2: Auto-Wiring Logic with Configurable Pins
- Default pin mapping:
  - LED → **Digital Pin 10**
  - Push Button → **Digital Pin 2**
- Arduino digital pins **D2–D13** supported
- Pin conflict prevention:
  - One pin cannot be assigned to multiple components
  - Conflicting pins are disabled in the UI
- Users can reassign pins dynamically through dropdowns

---

### ✅ Task 3: Auto Code Generation & Logic-Level Simulation
- Automatic Arduino code generation including:
  - `pinMode()`
  - `digitalRead()`
  - `digitalWrite()`
- Code updates automatically when pin assignments change
- Logic-level simulation:
  - Button press → GPIO HIGH
  - LED turns ON when HIGH
  - LED turns OFF when LOW

---

## 🔄 Mandatory End-to-End Workflow (Supported)

✔ Select Arduino Uno  
✔ Add LED  
✔ Add Push Button  
✔ Auto-wire with default pins (D10, D2)  
✔ Auto-generate Arduino code  
✔ Change pin numbers  
✔ Code updates automatically  
✔ Start simulation  
✔ Button controls LED  

---

## 📁 Project Structure

```
├── index.html        # Main HTML file
├── style.css         # UI styling
├── script.js         # Logic, auto-wiring & simulation
├── Logo image.jpg    # Arduino icon
└── README.md         # Project documentation
```


