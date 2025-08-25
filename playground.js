// Load Profile Info
window.addEventListener("DOMContentLoaded", () => {
  const profileName = document.querySelector("#profile_name");
  const profilePicture = document.querySelector("#profile_picture");

  const storedName = localStorage.getItem("profileName") || "Guest";
  profileName.textContent = storedName;

  const initials = storedName.charAt(0).toUpperCase();
  profilePicture.src = `https://via.placeholder.com/50/1735FF/FFFFFF?text=${initials}`;
});

// Typing Challenge
const typingText = document.getElementById("typing-text").innerText;
const typingInput = document.getElementById("typing-input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const startBtn = document.getElementById("start-btn");

let startTime, interval;

startBtn.addEventListener("click", () => {
  typingInput.value = "";
  typingInput.focus();
  startTime = new Date().getTime();

  if (interval) clearInterval(interval);

  interval = setInterval(() => {
    const elapsed = (new Date().getTime() - startTime) / 1000;
    timeDisplay.textContent = elapsed.toFixed(1);

    const typed = typingInput.value;
    const correctChars = typed.split("").filter((ch, i) => ch === typingText[i]).length;
    const accuracy = typed.length > 0 ? (correctChars / typed.length) * 100 : 0;

    const wordsTyped = typed.trim().split(" ").length;
    const wpm = elapsed > 0 ? Math.round((wordsTyped / elapsed) * 60) : 0;

    accuracyDisplay.textContent = accuracy.toFixed(1);
    wpmDisplay.textContent = wpm;
  }, 100);
});
