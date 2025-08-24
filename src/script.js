const intro_details_form = document.querySelector('.intro_user_inputs');
const intro_details = document.querySelector('.intro_user_inputs form');
const error_message = document.querySelector('.alertIndicator');
const authbuttons = document.querySelector('.auth-buttons');
// Run after DOM loads
window.addEventListener("DOMContentLoaded", () => {
  intro_details.style.display = "flex";

  // Profile update function
  function profile(name, email) {
    // Grab DOM elements inside .profile
    const profile = document.querySelector('.profile');
    const profileName = document.querySelector('#profile_name');
    const dispname = document.querySelector('#dispname');
    authbuttons.style.display = "none";
    profile.style.display = "flex";
    // Set profile text
    if(name){
      dispname.textContent = name.slice(0, 5)+"...";
      profileName.textContent = name;
    }
    else{
      profileName.textContent = "Guest";
    }

    // If no profile picture, generate a placeholder with initials
    if (!profilePicture || profilePicture.src.includes("default.png")) {
      const initials = name.charAt(0).toUpperCase();
      profilePicture.src = `https://via.placeholder.com/100/1735FF/FFFFFF?text=${initials}`;
    }
  }

  // Submit handler
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

      // Call profile update
      profile(nameValue, emailValue);

    } else {
      // Show error message
      error_message.textContent = "Please fill in all fields.";
      error_message.style.display = "block";
      error_message.style.opacity = 1;

      setTimeout(() => {
        gsap.to(error_message, { duration: 2, opacity: 0 });
        setTimeout(() => {
          error_message.style.display = "none";
        }, 2000);
      }, 1000);
    }
  });
});
