import Request from './models/request.js';
import FormData from './models/formdata.js';
import FormValidator from './models/formvalidator.js';
import createAndAppendAccessCodeElement from './models/oldaccess.js';

const hourlyRange = document.getElementById("duration");
const selectedHour = document.getElementById("selectedHour");
selectedHour.textContent = hourlyRange.value;
hourlyRange.addEventListener("input", function () {
    const selectedValue = hourlyRange.value;
    selectedHour.textContent = selectedValue;
});


//otpModal.show();
const submit = document.querySelector('#submit')
const error = '#name-error'
const form = '#accesscode'
const formValidator = new FormValidator(form, error);
const endpoint = 'api/v1/createAccess'
let accessCode = ''

submit.addEventListener("click", async (e) => {
    e.preventDefault();
    formValidator.validateAllFields(e)
    if (formValidator.validated) {
        const formdata = new FormData('accesscode');
        const data = formdata.get()
        //data.token = JSON.parse(document.cookie).token
        const newUserAccesscode = new Request(endpoint, 'POST', data);
        accessCode = await newUserAccesscode.send()
        const message = await accessCode;
        if (!accessCode.ok) {
            formValidator.errorMessages['visitorsName'] = message.message
            formValidator.displayErrorMessages()
            delete formValidator.errorMessages['visitorsName']
            return
        }
        document.querySelector('.accessCodeDisplay').innerText = message.accessCode
        createAndAppendAccessCodeElement(accessCode, ".table");
        //console.log(accessCode)
        return
    }
})