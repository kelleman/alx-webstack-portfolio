export default class FormValidator {
  constructor(formSelector, errorMessageSelector) {
    this.form = document.querySelector(formSelector);
    this.errorMessageElement = document.querySelector(errorMessageSelector);
    this.errorMessages = {};
    this.validated = false;
    this.success = ""

    this.form.addEventListener('input', this.validateInput.bind(this));
    //this.form.addEventListener('submit', this.validateAllFields.bind(this));
  }

  validateInput(event) {
    const input = event.target;
    const fieldName = input.getAttribute('name');
    const value = input.value;
    let errorMessage = '';

    // Validate text input
    errorMessage = this.validateField(input, value, input.type);

    this.errorMessages[fieldName] = errorMessage;
    this.displayErrorMessages();
    if (errorMessage === "") {
      delete this.errorMessages[fieldName]
    }
    this.validated = Object.keys(this.errorMessages).length === 0;
  }

  validateAllFields(event) {
    //event.preventDefault(); // Prevent the default form submission.

    // Iterate through form elements and validate each one.
    this.form.querySelectorAll('input').forEach((input) => {
      const fieldName = input.getAttribute('name');
      const value = input.value;
      let errorMessage = '';

      // Validate text input
      errorMessage = this.validateField(input, value, input.type);

      this.errorMessages[fieldName] = errorMessage;
      if (errorMessage === "") {
        delete this.errorMessages[fieldName]
      }
    });

    this.displayErrorMessages();
    this.validated = Object.keys(this.errorMessages).length === 0;

    if (this.validated) {

    }
  }

  validateField(input, value, fieldType) {
    const name = input.getAttribute('name')
    if (value.trim() === '') {
      this.markFieldAsInvalid(input);
      return 'This field is required.';
    }

    if (fieldType === 'text' && (/\d/.test(value) || value.length < 3) && name != "username") {
      this.markFieldAsInvalid(input);
      return /\d/.test(value) ? 'Only Alphabets allowed.' : 'Cannot be less than 3 letters.';
    }

    if (name == "username" && (!/^[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*$/.test(value) || value.length < 3)) {
      this.markFieldAsInvalid(input);
      return !/^[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*$/.test(value) ? 'Only Alphanumeric or Alphabets allowed.' : 'Cannot be less than 3 letters.';
    }

    if (name == "otp") {
      if (value.length < input.getAttribute('maxlength')) {
        this.markFieldAsInvalid(input);
        return /[a-zA-Z]/.test(value) ? 'Only Numbers allowed.' : `Cannot be less than ${input.getAttribute('maxlength')} letters.`;
      }
    }

    if (fieldType === 'tel' && (/[a-zA-Z]/.test(value) || value.length < 3)) {
      this.markFieldAsInvalid(input);
      return /[a-zA-Z]/.test(value) ? 'Only Numbers allowed.' : 'Cannot be less than 3 letters.';
    }

    if (fieldType === 'range') {
      if (value > 0) {
        return ''
      }
      this.markFieldAsInvalid(input);
      return 'Cannot be less than 0 houres';
    }

    if (fieldType === 'password' && value.length < 6) {
      this.markFieldAsInvalid(input);
      return 'Cannot be less than 6 characters.';
    }

    if (fieldType === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        this.markFieldAsInvalid(input);
        return 'Invalid email address.';
      }
    }

    this.markFieldAsValid(input);
    return '';
  }


  markFieldAsInvalid(input) {
    input.classList.add('invalid');
  }

  markFieldAsValid(input) {
    input.classList.remove('invalid');
  }

  displayErrorMessages() {
    this.displayMessage(this.success,"","error")
    let errorsExist = false;
    for (const fieldName in this.errorMessages) {
      const input = this.form.querySelector(`[name="${fieldName}"]`);
      const error = this.errorMessages[fieldName];
      let errorContainer = input.parentElement.querySelector('.error-message');

      if (error) {
        if (!errorContainer) {
          const errorElement = document.createElement('div');
          errorElement.className = 'error-message';
          input.parentElement.appendChild(errorElement);
          errorContainer = input.parentElement.querySelector('.error-message');
        }
        errorContainer.innerText = error;
        errorsExist = true;
      } else if (errorContainer) {
        errorContainer.remove();
      }
    }

    try {
      if (errorsExist) {
        this.errorMessageElement.innerText = 'Please correct the errors above.';
      } else {
        this.errorMessageElement.innerText = '';
      }
    } catch (e) {

    }

  }

  displayMessage(fieldName, message, messageType) {
    const input = this.form.querySelector(`[name="${fieldName}"]`);
    let remove =""
    let existingContainer
    let existingContainer2
    if (messageType == "success") {
      remove = "error"
    } else {
      remove = "success"
    }
    const removecontainerClass = `${remove}-message`;
    const containerClass = `${messageType}-message`;
    try {
      existingContainer = input.parentElement.querySelector(`.${removecontainerClass}`);
    } catch (e) {

    }
    if (existingContainer) {
      existingContainer.remove();
    }
  
    if (message) {
      existingContainer2 = input.parentElement.querySelector(`.${containerClass}`);  
      if (existingContainer2){
        existingContainer2.remove();
      }
      const newContainer = document.createElement('div');
      newContainer.className = containerClass;
      newContainer.innerText = message;
      input.parentElement.appendChild(newContainer);
    }
  }
  
}

//const formValidator = new FormValidator('#myForm', '#errorMessage');
