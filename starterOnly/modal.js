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
const formData = document.querySelectorAll(".formData");

// prevents from picking a date after today, sorry time travelers you can't register
birthdate.max = new Date().toISOString().split("T")[0];

// Eliminates non-digit characters for quantity input
['keypress','paste','focusout'].forEach(e=>quantity.addEventListener(e,()=>{
quantity.value = quantity.value.replace(/\D/g,'')
if (quantity.value == "" && e == "focusout")
  quantity.value = "0" 
end
}, false));

// Reset form field if shown error message and user clicks on it
formData.forEach((div) => { div.addEventListener("click", () => 
{ div.setAttribute("data-error-visible", "false"); }); });

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

// validate formData that contains radio buttons by checking if one is checked
function validateRadioButtons() {
  let valid = false;
  let radioButtons = document.querySelectorAll("input[type=radio]");
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      valid = true;
    }
  });
  return valid;
}

// submit modal form
function submitModal() {
  var valid = true;
  formData.forEach((div) => {
    if (!div.querySelector("input").validity.valid || !validateRadioButtons()) {
      div.setAttribute("data-error-visible", "true");
      valid = false;
    }
  });
  if (valid) {
    closeModal();
  }
}