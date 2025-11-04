const kits = [
  {
    name: "Standard",
    kick: "/audio/standard/bass.mp3",
    snare: "/audio/standard/snare.mp3",
    tom1: "/audio/standard/tom1.mp3",
    tom2: "/audio/standard/tom2.mp3",
    floor: "/audio/standard/floor.mp3",
    openhh: "/audio/standard/hihat-open.mp3",
    closehh: "/audio/standard/hihat-closed.mp3",
    crash: "/audio/standard/crash.mp3",
    ride: "/audio/standard/ride.mp3",
    rim: "/audio/standard/rim.mp3",
  },
  {
    name: "powerful",
    kick: "/audio/powerful/bass.mp3",
    snare: "/audio/powerful/snare-drum.mp3",
    tom1: "/audio/powerful/tom1.mp3",
    tom2: "/audio/powerful/tom2.mp3",
    floor: "/audio/powerful/floor-tom.mp3",
    openhh: "/audio/powerful/hihat-open.mp3",
    closehh: "/audio/powerful/hihat.mp3",
    crash: "/audio/powerful/crash.mp3",
    ride: "/audio/powerful/ride.mp3",
    rim: "/audio/powerful/snare-stick.mp3",
  },
  {
    name: "realDrum",
    kick: "/audio/real-drum/kick.mp3",
    snare: "/audio/real-drum/snare.mp3",
    tom1: "/audio/real-drum/tom1.mp3",
    tom2: "/audio/real-drum/tom2.mp3",
    floor: "/audio/real-drum/floor.mp3",
    openhh: "/audio/real-drum/openhh.mp3",
    closehh: "/audio/real-drum/closehh.mp3",
    crash: "/audio/real-drum/crashl.mp3",
    ride: "/audio/real-drum/ride.mp3",
    rim: "/audio/real-drum/bell.mp3",
  },
  {
    name: "kit-6",
    kick: "/audio/kit-6/kick.wav",
    snare: "/audio/kit-6/snare.wav",
    tom1: "/audio/kit-6/clave.wav",
    tom2: "/audio/kit-6/cowbell.wav",
    floor: "/audio/kit-6/bass.wav",
    openhh: "/audio/kit-6/hihat.wav",
    closehh: "/audio/kit-6/maracas.wav",
    rim: "/audio/kit-6/clap.wav",
  },
];

let kitIndex = 0;

function play(path) {
  const sound = new Audio(path);
  sound.playbackRate = 0.5;
  console.log(sound);
  sound.play();
}

function changeKit() {
  kitIndex++;
  if (kitIndex >= kits.length) kitIndex = 0;
  document.getElementById("kit-name").innerText = kits[kitIndex].name;
}

document.getElementById("kit-name").innerText = kits[kitIndex].name;

// === Gamepad Configuration ===
// Map gamepad buttons to drum sounds
const buttonMap = {
  0: "openhh", // A (Xbox) / Cross (PS)
  1: "snare", // B / Circle
  2: "tom1", // X / Square
  3: "tom2", // Y / Triangle
  4: "floor", // Left bumper
  5: "openhh", // Right bumper
  7: "closehh", // Left trigger
  6: "crash", // Right trigger
  8: "rim", // Select / Share
  9: "ride", // Start / Options
  10: "changeKit", // Press left stick
};

const pressedButtons = new Set();

function playSound(action) {
  if (action === "changeKit") return changeKit();
  const kit = kits[kitIndex];
  const soundPath = kit[action];
  if (soundPath) play(soundPath);
}

// === Gamepad Handling ===
window.addEventListener("gamepadconnected", (e) => {
  console.log(`🎮 Gamepad connected: ${e.gamepad.id}`);
});

window.addEventListener("gamepaddisconnected", (e) => {
  console.log(`Gamepad disconnected: ${e.gamepad.id}`);
});

function updateGamepads() {
  const pads = navigator.getGamepads();
  for (const gp of pads) {
    if (!gp) continue;

    gp.buttons.forEach((btn, index) => {
      const action = buttonMap[index];
      if (!action) return;

      if (btn.pressed) {
        if (!pressedButtons.has(index)) {
          pressedButtons.add(index);
          playSound(action);
          document.getElementById(`btn-${action}`)?.classList.add("opacity-50");
        }
      } else if (pressedButtons.has(index)) {
        pressedButtons.delete(index);
        document
          .getElementById(`btn-${action}`)
          ?.classList.remove("opacity-50");
      }
    });
  }

  requestAnimationFrame(updateGamepads);
}

requestAnimationFrame(updateGamepads);
