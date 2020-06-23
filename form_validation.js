const form = document.querySelector('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const passwordConfirmation = document.getElementById('password-confirmation')
const email = document.getElementById('email');


function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.add('error');
  formControl.classList.remove('success');
  formControl.querySelector('small').innerText = message;
}


function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.add('success');
  formControl.classList.remove('error');
}


function checkLength(input, min, max) {
  if (input.value.length < min && input.value.trim() !== '') {
    showError(input, `${input.id} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${input.id} must be less than ${max + 1}`);
  } else if (input.value.trim() === '') {
    input.parentElement.classList.remove('error');
  } else {
    showSuccess(input);
  }
}


function checkPasswordsMatch() {
  if (passwordConfirmation.value !== password.value && passwordConfirmation.value !== '') {
    showError(passwordConfirmation, 'Passwords don\'t match');
  } else if (passwordConfirmation.value === '') {
    passwordConfirmation.parentElement.classList.remove('error');
  } else {
    showSuccess(passwordConfirmation);
  }
}


function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function checkEmail(email) {
  if (!isValidEmail(email.value)) {
    showError(email, 'E-mail is not valid');
  } else {
    showSuccess(email);
  }
}


// EVENT LISTENERS:

username.addEventListener('keyup', () => { checkLength(username, 5, 15) });

password.addEventListener('keyup',() => {    
  checkLength(password, 8, 20);
  checkPasswordsMatch();    
});

passwordConfirmation.addEventListener('keyup', checkPasswordsMatch);

email.addEventListener('keyup', () => { checkEmail(email) });

form.addEventListener('submit', function(e) {
  let inputs = form.getElementsByTagName('input');
  // Only submit if all inputs have been filled
  // and there's no error message on any fields
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() === '') {
      showError(inputs[i], 'This field is required');
      e.preventDefault();
    } else if (inputs[i].parentElement.classList.contains('error')) {
      e.preventDefault();
    }
  }
});
