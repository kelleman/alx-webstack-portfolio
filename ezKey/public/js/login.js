import Request from './models/request.js';
import FormData from './models/formdata.js';
import FormValidator from './models/formvalidator.js';

//otpModal.show();
const submit = document.querySelector('#submit')
const error = '#name-error'
const form = '#register'
const formValidator = new FormValidator(form, error);
const endpoint = 'api/v1/login'
let logInUser = ''

submit.addEventListener("click", async (e) => {
    e.preventDefault();
    formValidator.validateAllFields(e)
    if (formValidator.validated) {
        const formdata = new FormData('register');
        const data = formdata.get()
        const newUserLogin = new Request(endpoint, 'POST', data);
        logInUser = await newUserLogin.send()
        if (!logInUser.ok) {
            const message = await logInUser;
            formValidator.errorMessages['username'] = message.message
            formValidator.displayErrorMessages()
            delete formValidator.errorMessages['username']
            return
        }

        document.cookie = JSON.stringify(logInUser)
        console.log(document.cookie)

        document.location.href = '/dashboard'
        /*document.querySelector('.otpemail').innerText = logInUser.user.email
        otpModal.show()*/
    }
})

//const logInUser = newUserLogin.send()