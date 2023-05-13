// Check if the greeting message element exists on the page
const greetingMessage = document.querySelector('#greeting-message');
if (greetingMessage) {
  // Display the greeting message
  const currentTime = new Date().getHours();
  let greeting;
  if (currentTime >= 5 && currentTime < 12) {
    greeting = 'Good morning!';
  } else if (currentTime >= 12 && currentTime < 18) {
    greeting = 'Good afternoon!';
  } else {
    greeting = 'Good evening!';
  }
  greetingMessage.textContent = greeting;
}
//*************** Validation *************************//

//***Sign up**//

const signUPform = document.querySelector('#FormSP');
if(signUPform)
{
  signUPform.addEventListener('submit', function(event) {
  // Validate first name input
  const firstNameInput = document.querySelector('#first_nameSP');
  const firstName = firstNameInput.value.trim();
  const firstNameRegex = /^[a-zA-Z]+$/;
  if (!firstNameRegex.test(firstName)) {
    alert('Please enter a valid first name (letters only)');
    event.preventDefault();
    return;
  }

  // Validate last name input
  const lastNameInput = document.querySelector('#last_nameSP');
  const lastName = lastNameInput.value.trim();
  const lastNameRegex = /^[a-zA-Z]+$/;
  if (!lastNameRegex.test(lastName)) {
    alert('Please enter a valid last name (letters only)');
    event.preventDefault();
    return;
  }

  // Validate password input
  const passInput = document.querySelector('#loginPassword');
  const pass = passInput.value.trim();
  if (pass.length <= 7) {
    alert('Please enter a valid password (at least 8 characters)');
    event.preventDefault();
    return;
  }

  // Validate age input
  const ageInput = document.querySelector('#ageSP');
  const age = ageInput.value.trim();
  if (age <= 13) {
    alert('You must be over 14');
    event.preventDefault();
    return;
  }
  // If all validation passes, allow the form to submit
  signUPform.submit();
  alert('The registration was successful!');
  });
}
//*******************//
// get the current page name
const currentPage = window.location.pathname.split('/').pop().slice(0, -5);
// loop through each link in the nav bar and add an active class to the current page's link
const navLinks = document.querySelectorAll('.nav_bar li a');
navLinks.forEach(link => {
  const linkPage = link.getAttribute('href').split('/').pop().slice(0, -5);
  if (linkPage === currentPage) {
    link.classList.add('active');
  }
});
//******** show password*/////
const password = document.querySelector("#loginPassword");
const eyeIcon = document.querySelector("#eyeIcon");
if (eyeIcon){
  eyeIcon.onclick =function () {
  if(password.type == "password")
  {
    password.type = "text";
    eyeIcon.src = "../web_images/show.png";
  }
  else{
    password.type="password";
    eyeIcon.src = "../web_images/hide.png";
  }
}
}









