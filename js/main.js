import { currencyApiKey } from './apiKey.js';

console.log(currencyApiKey)

document.querySelector('button').addEventListener('click', convertCurrency) /* create event listener for the button */

function convertCurrency() {
    let currencyCurrent = document.querySelector('#currencyCurrent').value;
    let cashCurrent = document.querySelector('#cashCurrent').value;
    let currencyToConvert = document.querySelector('#currencyToConvert').value;

    let url = `https://api.currencyapi.com/v3/latest?apikey=${currencyApiKey}&currencies=${currencyCurrent},${currencyToConvert}`
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // data is of an Object type
            console.log(data['data'])
            let rateCurrent = data['data'][`${currencyCurrent}`]['value']
            let rateToConvert = data['data'][`${currencyToConvert}`]['value']
            let convertedValue = (cashCurrent/rateCurrent) * rateToConvert
            
            document.querySelectorAll('h2')[0].innerText = `${cashCurrent} ${currencyCurrent}`
            document.querySelectorAll('h2')[1].innerText = `${convertedValue.toFixed(2)} ${currencyToConvert}`
        })
        .catch(err => {
            console.log(`Error: ${err}`)
        })
}