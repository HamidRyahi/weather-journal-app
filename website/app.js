/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = "&appid=4052993d38986305af6be4a3c51fb607&units=imperial";
const zipInput = document.querySelector('#zip');
const userInput = document.getElementsByClassName('myInput');
const generateButton = document.getElementById('generate');
const entry = document.querySelector('.entry');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '-' + d.getDate() + '-' + d.getFullYear();

// async function to make a GET request to the OpenWeatherMap API
const GetOpenWeatherMap = async (baseURL, zip, key) => {
	const res = await fetch(baseURL + zip + key)
	try {
		const data = await res.json();
		console.log(data);
		return data;
	} catch (error) {
		console.log("error", error);
	}
}

// async function to make the POST request
const postData = async (url = '', data = {}) => {
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	try {
		const newData = await response.json();
		return newData;
	} catch (error) {
		console.log("error", error);
	}
};

// async function to GET Project Data and update the UI
const updateUI = async () => {
	entry.style.display = 'block';
	const request = await fetch('/allData');
	try {
		// Transform into JSON
		const data = await request.json();
		// Write updated data to DOM elements
		document.getElementById('temp').innerHTML = Math.round(data.temperature) + ' degrees';
		document.getElementById('city').innerHTML = data.cityName;
		document.getElementById('country').innerHTML = data.zipCountry;
		document.getElementById('date').innerHTML = data.date;
		if (userInput[0].value) {
			document.getElementById('content').innerHTML = `You feel: ${data.userResponse}`;
		}
	} catch (error) {
		console.log("error" + error);
	}
}

// callback function to be executed when generate button is clicked
const performAction = () => {
	const enteredZip = zipInput.value;
	const userFeelings = userInput[0].value;
	// calling the async GET request function
	GetOpenWeatherMap(baseURL, enteredZip, apiKey)
		// chaining a Promise that makes a POST request to add the API data and data entred by user to the app
		.then((data) => {
			postData('/addData', { temperature: data.main.temp, cityName: data.name, zipCountry: data.sys.country, date: newDate, userResponse: userFeelings })
		})
		// chaining another Promise that updates the UI dynamically
		.then(() => {
			updateUI();
		})
}

// event listener for the generate button with a callback function
generateButton.addEventListener('click', performAction);
