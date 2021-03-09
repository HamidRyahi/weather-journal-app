/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = "&appid=4052993d38986305af6be4a3c51fb607&units=imperial";
const generateButton = document.getElementById('generate');

// event listener for the generate button with a callback function
generateButton.addEventListener('click', performAction);

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// callback function to be executed when generate button is clicked 
function performAction(e) {

	let content = document.getElementById('feelings').value;
	let enteredZip = document.getElementById('zip').value;

	// calling the async GET request function
	getWeatherData(baseURL, enteredZip, apiKey)

	// chaining a Promise that makes a POST request to add the API data and data entred by user to the app
		.then(function (data) {
			console.log(data);
			postData( '/addData', {temp: data.main.temp, date: newDate, userResponse: content} );
		})
		// chaining another Promise that updates the UI dynamically
		.then(function () {
				updateUI()
		});
};

// async function to make a GET request to the OpenWeatherMap API
const getWeatherData = async (baseURL, enteredZip, apiKey) => {

	const res = await fetch(baseURL + enteredZip + apiKey);
	try {

		const data = await res.json()
		console.log(data);
		return data;
	} catch (error) {

		console.log("error", error);
	}
}

// async function to make the POST request
const postData = async(url = '', data = {}) => {
	console.log(data);
	const response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	});

	try {
		const newData = await response.json();
		console.log(newData);
		return newData;
	} catch (error) {
		console.log("error", error);
		// appropriately handle the error
	}
}

// async function that update the UI
const updateUI = async () => {
	const request = await fetch('/allData');
	try {
		const data = await request.json()
		document.getElementById('temp').innerHTML = data.temperature;
		document.getElementById('date').innerHTML = data.date;
		document.getElementById('content').innerHTML = data.userResponse;
		console.log(data);
	} catch (error) {
		console.log("error" + error);
	}
}
  



