// script.js

// 1. Get DOM elements
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const resultInput = document.getElementById('result');

// 2. Placeholder Conversion Function
// IMPORTANT: In a real application, this data would be fetched from a live Exchange Rate API (e.g., ExchangeRate-API, Open Exchange Rates, etc.)
// using the 'fetch' API. This static map is for demonstration purposes only.
const exchangeRates = {
    // Rates based on 1 unit of the base currency (e.g., 1 USD = X EUR)
    USD: { EUR: 0.92, GBP: 0.79, JPY: 155.00, INR: 83.50, USD: 1 },
    EUR: { USD: 1.08, GBP: 0.86, JPY: 168.50, INR: 90.70, EUR: 1 },
    GBP: { USD: 1.27, EUR: 1.16, JPY: 195.00, INR: 105.00, GBP: 1 },
    JPY: { USD: 0.0064, EUR: 0.0059, GBP: 0.0051, INR: 0.54, JPY: 1 },
    INR: { USD: 0.012, EUR: 0.011, GBP: 0.0095, JPY: 1.85, INR: 1 }
};

/**
 * Performs the currency conversion using the static exchange rates.
 * In a real app, this would be an async function fetching live rates.
 */
function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount) || amount <= 0) {
        resultInput.value = "Please enter a valid amount.";
        return;
    }

    if (!exchangeRates[fromCurrency] || !exchangeRates[fromCurrency][toCurrency]) {
        resultInput.value = "Exchange rate data is missing.";
        return;
    }

    // Get the rate: e.g., if converting USD to EUR, get the EUR rate from the USD list.
    const rate = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = amount * rate;

    // Display the result, formatted to 2 decimal places
    const formattedResult = convertedAmount.toFixed(2);
    resultInput.value = `${amount} ${fromCurrency} = ${formattedResult} ${toCurrency}`;
}

/**
 * Swaps the values of the "From" and "To" currency dropdowns.
 */
function swapCurrencies() {
    const temp = fromCurrencySelect.value;
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = temp;
    
    // Automatically perform conversion after swapping
    convertCurrency();
}

// Optional: Automatically convert when the user changes inputs
amountInput.addEventListener('input', convertCurrency);
fromCurrencySelect.addEventListener('change', convertCurrency);
toCurrencySelect.addEventListener('change', convertCurrency);

// Initial conversion on page load
convertCurrency();