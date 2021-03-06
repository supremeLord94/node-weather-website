let weatherForm = document.querySelector('form')
let search = document.querySelector('input')
let messageLocation = document.querySelector('#message-location')
let messageTemperature = document.querySelector('#message-temperature')
let messageCondition = document.querySelector('#message-condition')
let weather_icon = document.querySelector('#weather_icon')



const clearForm = ()=> {
    messageLocation.textContent = "";
    messageTemperature.textContent = "";
    messageCondition.textContent = "";
    weather_icon.src = "";
}
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    clearForm();
    fetch('/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageLocation.textContent = data.error
            } else {
                console.log(data)
                messageLocation.textContent = data.location
                messageTemperature.textContent = 'Temperature: ' + data.temperature + 'C'
                messageCondition.textContent = data.condition[0]
                weather_icon.src = data.icon

            }
        })
    })
    search.value = "";
})

