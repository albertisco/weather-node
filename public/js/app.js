console.log('Client side')



const form = document.querySelector('form')
const input = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const adressInput = input.value 
    messageTwo.textContent = ''
    messageOne.textContent = 'Loading'

    const url  =`/weather?adress=${adressInput}`


    fetch(url).then((response) => {
        response.json().then((data) => {           
            if(data.error) {
            messageOne.textContent = data.error
            } else { 
            messageOne.textContent = data.adress
            messageTwo.textContent = `temperature: ${data.temperature} precipProbability: ${data.precipProbability}`
            }
        })
    })

})