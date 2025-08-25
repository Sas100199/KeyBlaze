const herobody = document.querySelector('.hero-body');
const intro_details_form = document.querySelector('.intro_user_inputs');
const intro_details = document.querySelector('.intro_user_inputs form');
const error_message = document.querySelector('.alertIndicator');
const authbuttons = document.querySelector('.auth-buttons');

// Floating background effect
const random_letter_bag = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/`~";
function creatfloatingelement() {
  const letter_span = document.createElement('span');
  const random_letter = Math.floor(Math.random() * random_letter_bag.length);
  letter_span.innerHTML = random_letter_bag.charAt(random_letter);
  letter_span.style.left = Math.floor(Math.random() * herobody.offsetWidth) + "px";
  letter_span.style.position = "absolute";
  letter_span.style.fontSize = Math.floor(Math.random() * 20 + 20) + "px"; // 20–40px
  letter_span.style.color = "rgba(255,255,255,0.2)";
  letter_span.style.animation = "floatUp 6s linear forwards";
  herobody.appendChild(letter_span);

  setTimeout(() => letter_span.remove(), 6000);
}

// Profile updater
function updateProfile(name, email) {
  const profile = document.querySelector('.profile');
  const profileName = document.querySelector('#profile_name');
  const dispname = document.querySelector('#dispname');
  const profilePicture = document.querySelector('#profile_picture');

  authbuttons.style.display = "none";
  profile.style.display = "flex";

  // Set name
  dispname.textContent = name.length > 5 ? name.slice(0, 5) + "..." : name;
  profileName.textContent = name || "Guest";

  // Set placeholder picture with initials
  const initials = name.charAt(0).toUpperCase();
  profilePicture.src = `https://via.placeholder.com/100/1735FF/FFFFFF?text=${initials}`;
}

// Save to localStorage
function saveProfile(name, email) {
  localStorage.setItem('profileName', name);
  localStorage.setItem('profileEmail', email);
}

// Load from localStorage
function loadProfile() {
  const storedName = localStorage.getItem('profileName');
  const storedEmail = localStorage.getItem('profileEmail');

  if (storedName && storedEmail) {
    intro_details_form.style.display = "none"; // hide login form
    updateProfile(storedName, storedEmail);
  }
}

// DOM Ready
window.addEventListener("DOMContentLoaded", () => {
  intro_details.style.display = "flex";

  // Load profile automatically if stored
  loadProfile();

  // Form submission
  intro_details.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameValue = intro_details.querySelector("#name").value.trim();
    const emailValue = intro_details.querySelector("#email").value.trim();

    if (nameValue && emailValue) {
      // Animate intro form out
      gsap.to(intro_details_form, {
        duration: 0.5,
        opacity: 0,
        y: -50,
        onComplete: () => {
          intro_details_form.style.display = "none";
        }
      });

      // Save & update profile
      saveProfile(nameValue, emailValue);
      updateProfile(nameValue, emailValue);

    } else {
      // Show error
      error_message.textContent = "Please fill in all fields.";
      error_message.style.display = "block";
      error_message.style.opacity = 1;

      setTimeout(() => {
        gsap.to(error_message, { duration: 2, opacity: 0 });
        setTimeout(() => error_message.style.display = "none", 2000);
      }, 1000);
    }
  });
});

// Profile page (profile.html)
if (document.querySelector(".profilebody")) {
  const profileName = document.querySelector('.profile_name');
  const profileEmail = document.querySelector('.profile_email');
  const profilePicture = document.querySelector('.profile_picture');

  const storedName = localStorage.getItem('profileName') || "Guest";
  const storedEmail = localStorage.getItem('profileEmail') || "guest@example.com";

  profileName.textContent = storedName;
  profileEmail.textContent = storedEmail;

  const initials = storedName.charAt(0).toUpperCase();
  profilePicture.src = `https://via.placeholder.com/100/1735FF/FFFFFF?text=${initials}`;
}
