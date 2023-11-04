export default class FormData {
    constructor(formId) {
      this.formId = formId;
      this.formData = {};
    }
  
    get() {
      const formElement = document.getElementById(this.formId);
  
      if (!formElement) {
        console.error(`Form with ID "${this.formId}" not found.`);
        return null;
      }
  
      // Iterate through form elements and extract data.
      const formElements = formElement.elements;
  
      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.name) {
          this.formData[element.name] = element.value;
        }
      }
  
      return this.formData;
    }
  }

  