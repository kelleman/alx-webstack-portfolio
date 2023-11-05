import Request from './models/request.js';
import FormData from './models/formdata.js';
import FormValidator from './models/formvalidator.js';

//otpModal.show();
const submit = document.querySelector('#submit')
const error = '#name-error'
const form = '#register'
const formValidator = new FormValidator(form, error);
const endpoint = 'api/v1/validateAccess'
let logInUser = ''

submit.addEventListener("click", async (e) => {
    e.preventDefault();
    formValidator.validateAllFields(e)
    if (formValidator.validated) {
        const formdata = new FormData('register');
        const data = formdata.get()
        data.accessCode = data.username
        const newUserLogin = new Request(endpoint, 'POST', data);
        logInUser = await newUserLogin.send()
        const message = await logInUser;
        if (!logInUser.ok) {
            formValidator.errorMessages['username'] = message.message
            formValidator.displayErrorMessages()
            delete formValidator.errorMessages['username']
            return
        } else if (logInUser.ok) {
            formValidator.success = "username"
            const currentDate = new Date(message.expirationDate);

            // Step 2: Format the date as a string
            const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);

            message.message = `${message.message} for ${message.visitorsName} till ${formattedDate}`
            formValidator.displayMessage("username", message.message, "success")
            message.message = ""
        }

        //document.cookie = JSON.stringify(logInUser)

        /*document.location.href = '/dashboard'*/
        /*document.querySelector('.otpemail').innerText = logInUser.user.email
        otpModal.show()*/
    }
})

//const logInUser = newUserLogin.send()