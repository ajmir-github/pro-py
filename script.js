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
    // crash: "/audio/kit-6/crashl.mp3",
    // ride: "/audio/kit-6/ride.mp3",
    rim: "/audio/kit-6/clap.wav",
  },
];

let kitIndex = 0;
const keys = {
  kick: "0",
  snare: "2",
  tom1: "5",
  tom2: "6",
  floor: "3",
  openhh: "4",
  closehh: "1",
  crash: "7",
  ride: "9",
  rim: ".",
  changeKit: "-",
};

function play(path) {
  const sound = new Audio(path);
  sound.play();
}

document.getElementById("kit-name").innerText = kits[kitIndex].name;

function changeKit() {
  kitIndex++;
  if (kits.length === kitIndex) kitIndex = 0;
  document.getElementById("kit-name").innerText = kits[kitIndex].name;
}

function playSound(key) {
  const kit = kits[kitIndex];
  if (key === keys.kick) return play(kit.kick);
  if (key === keys.snare) return play(kit.snare);
  if (key === keys.tom1) return play(kit.tom1);
  if (key === keys.tom2) return play(kit.tom2);
  if (key === keys.floor) return play(kit.floor);
  if (key === keys.crash) return kit.crash && play(kit.crash);
  if (key === keys.ride) return kit.ride && play(kit.ride);
  if (key === keys.rim) return kit.rim && play(kit.rim);
  if (key === keys.openhh) return kit.openhh && play(kit.openhh);
  if (key === keys.closehh) return kit.closehh && play(kit.closehh);
}

const pressedKeys = new Set();
const onKeyDown = (key) => {
  if (key === "-") return changeKit();
  console.log(key);
  if (pressedKeys.has(key)) return;
  pressedKeys.add(key);
  playSound(key);
  document.getElementById(`btn-${key}`).classList.add("opacity-50");
};
const onkeyUp = (key) => {
  pressedKeys.delete(key);
  document.getElementById(`btn-${key}`).classList.remove("opacity-50");
};
document.addEventListener("keydown", (event) => onKeyDown(event.key));

document.addEventListener("keyup", (event) => onkeyUp(event.key));
