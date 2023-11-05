import Request from './models/request.js';
import FormData from './models/formdata.js';
import FormValidator from './models/formvalidator.js';

// Get a reference to the modal element
const modal = document.querySelector('#staticBackdrop');

const otpModal = new bootstrap.Modal(modal);

//otpModal.show();
const submit = document.querySelector('#submit')
const error = '#name-error'
const form = '#register'
const formValidator = new FormValidator(form, error);
const endpoint = 'api/v1/register'
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
        document.querySelector('.otpemail').innerText = registeredUser.user.email
        otpModal.show()
    }
})

const otpform = document.querySelector('#otpform')
const otpinput = document.querySelector('#otpform input')
const otpendpoint = 'api/v1/verify-otp'
const otpformValidator = new FormValidator('#otpform', error);

otpform.addEventListener("input", async (e) => {
    const formdata = new FormData('otpform');
    const data = formdata.get()
    data.email = registeredUser.user.email
    console.log(registeredUser.user)
    console.log(data)
    if ((data.otp).length === Number(otpinput.getAttribute('maxlength'))) {
        const newUserotp = new Request(otpendpoint, 'POST', data);
        const registeredUserOtp = await newUserotp.send()
        const message = await registeredUserOtp;
        otpformValidator.errorMessages['otp'] = message.message

        if (!registeredUserOtp.ok) {
            otpformValidator.displayErrorMessages()
            return
        }else if (registeredUserOtp.ok) {
            otpformValidator.success = "otp"
            otpformValidator.displayMessage("otp", message.message, "success")
            message.message = ""
        }

        // otpformValidator.displayErrorMessages()
        // delete otpformValidator.errorMessages['otp']
        // Redirect to a new URL
        setTimeout(function () {
            otpModal.hide()
            window.location.href = '/login';
        }, 5000);
    }

})
//const registeredUser = newUser.send()