let useCustomTime = false;
let customHour = 12, customMinute = 0, customSecond = 0, customAmpm = 'AM';

const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const ampmEl = document.getElementById("ampm");
const clock = document.querySelector(".clock");
const resetBtn = document.getElementById("resetTime");

// Days array for highlight
const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function updateClock() {
  let h, m, s, ampm, currentDay;

  if (useCustomTime) {
    h = customHour;
    m = customMinute;
    s = customSecond;
    ampm = customAmpm;

    // Manually increment time each second
    customSecond++;
    if (customSecond >= 60) {
      customSecond = 0;
      customMinute++;
    }
    if (customMinute >= 60) {
      customMinute = 0;
      customHour++;
    }
    if (customHour > 12) {
      customHour = 1;
    }

    currentDay = new Date().getDay(); // Use system day
  } else {
    const now = new Date();
    h = now.getHours();
    m = now.getMinutes();
    s = now.getSeconds();
    ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    h = h ? h : 12;
    currentDay = now.getDay();
  }

  // Format to 2 digits
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  hourEl.textContent = h;
  minuteEl.textContent = m;
  secondEl.textContent = s;
  ampmEl.textContent = ampm;

  // Highlight current day
  days.forEach(day => document.getElementById(day).classList.remove("active"));
  document.getElementById(days[currentDay]).classList.add("active");
}

// Clock ticks every second
setInterval(updateClock, 1000);
updateClock();

// Theme toggle button
document.getElementById("themeToggle").addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

// Set custom time on click
clock.addEventListener("click", () => {
  let h = prompt("Enter hour (1–12):", customHour);
  let m = prompt("Enter minute (0–59):", customMinute);
  let s = prompt("Enter second (0–59):", customSecond);
  let a = prompt("Enter AM or PM:", customAmpm);

  if (
    h !== null && m !== null && s !== null && a !== null &&
    !isNaN(h) && !isNaN(m) && !isNaN(s) &&
    (a.toUpperCase() === 'AM' || a.toUpperCase() === 'PM')
  ) {
    customHour = Math.max(1, Math.min(12, parseInt(h)));
    customMinute = Math.max(0, Math.min(59, parseInt(m)));
    customSecond = Math.max(0, Math.min(59, parseInt(s)));
    customAmpm = a.toUpperCase();
    useCustomTime = true;
  }
});

// Reset to real system time
resetBtn.addEventListener("click", () => {
  useCustomTime = false;
  updateClock();
});
