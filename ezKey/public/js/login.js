import Request from './models/request.js';
import FormData from './models/formdata.js';
import FormValidator from './models/formvalidator.js';

//otpModal.show();
const submit = document.querySelector('#submit')
const error = '#name-error'
const form = '#register'
const formValidator = new FormValidator(form, error);
const endpoint = 'api/v1/login'
let registeredUser = ''

submit.addEventListener("click", async (e) => {
    e.preventDefault();
    formValidator.validateAllFields(e)
    if (formValidator.validated) {
        const formdata = new FormData('register');
        const data = formdata.get()
        //console.log(data);
        const newUser = new Request(endpoint, 'POST', data);
        registeredUser = await newUser.send()
        if (!registeredUser.ok) {
            const message = await registeredUser;
            formValidator.errorMessages['username'] = message.message
            formValidator.displayErrorMessages()
            delete formValidator.errorMessages['username']
            return
        }
        /*document.querySelector('.otpemail').innerText = registeredUser.user.email
        otpModal.show()*/
    }
})

//const registeredUser = newUser.send()