function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalSubmit = document.querySelector(".btn-submit");
const formData = document.querySelectorAll(".formData");

// prevents from picking a date after today, sorry time travelers you can't register
birthdate.max = new Date().toISOString().split("T")[0];

// catch all inputs for quantity and only allow digits to be entered
quantity.addEventListener("beforeinput", (e) => {
  if (e.data && !/^[0-9]*$/.test(e.data)) {
    e.preventDefault();
  }
})

// prevents quantity from being over 99
quantity.addEventListener("input", (e) => {
  if (e.target.value > 99) { e.target.value = 99 }
})

// Reset form field validation whenever user focuses out
formData.forEach((div) => { div.addEventListener("focusout", () => 
  { validateField(div) })
})

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// find form and submit
function sendForm() {
  const form = document.querySelector("form");
  form.submit();
}

// launch modal validation
function validateModal() {
  // hide and put aside form
  formData.forEach((div) => { 
    div.style.opacity = 0;
    div.style.position = "relative";
    div.style.zIndex = -1;
    div.disabled = true;
  })
  document.querySelector(".text-label").style.opacity = 0;
  // display welcome message
  document.querySelector(".welcome").style.zIndex = 1;
  document.querySelector(".welcome").style.opacity = 1;
  // Replace validation button with actual submit button
  modalSubmit.value = "Fermer";
  modalSubmit.onclick = sendForm;
  // form is sent after 5 seconds whether user clicks or not,
  // and even if the user clicks on the close button.
  setTimeout(sendForm, 5000);
}

// validate form data for each field (except radio buttons)
function validateField(div) {
  div.setAttribute("data-error-visible", "false");
  if (div.querySelector("input").validity.valid) {
    return true;
  } else {
    div.setAttribute("data-error-visible", "true");
    return false;
  }
}

// validate form data for radio buttons by checking if one is checked
function validateRadioButtons() {
  checkboxes.setAttribute("data-error-visible", "false");
  if (checkboxes.querySelector("input:checked")) {
    return true;
  } else {
    checkboxes.setAttribute("data-error-visible", "true");
    return false;
  }
}

// get URL parameters for welcome message display
function getURLParameter(name) {
  return decodeURI(
    (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]
  );
}

// validate form data, parent function
function validate() {
  let valid = true;
  formData.forEach((div) => {
    valid = validateField(div) && valid;
  })
  valid = validateRadioButtons() && valid;
  return valid;
}

// submit modal form if everything is valid
function submitModal() {
  if (validate()) { validateModal() }
}