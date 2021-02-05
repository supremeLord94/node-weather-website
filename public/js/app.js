let weatherForm = document.querySelector('form')
let search = document.querySelector('input')
let messageLocation = document.querySelector('#message-location')
let messageTemperature = document.querySelector('#message-temperature')
let messageCondition = document.querySelector('#message-condition')



const clearForm = ()=> {
    messageLocation.textContent = "";
    messageTemperature.textContent = "";
    messageCondition.textContent = "";
}
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    clearForm();
    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageLocation.textContent = data.error
            } else {
                console.log(data)
                messageLocation.textContent = data.location
                messageTemperature.textContent = 'Temperature: ' + data.temperature + 'C'
                messageCondition.textContent = data.condition[0]
            }
        })
    })
    search.value = "";
})

