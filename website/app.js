// Create a new date instance dynamically with JS
let d = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[d.getMonth()];
let newDate = month + "." + d.getDate() + "." + d.getFullYear();
// API Url to fetch json data from api
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=4e66cb77c4bd113f5ce39f5e5a03f6f9&units=imperial";
// get server full url
const serverUrl = `${window.location.protocol}//${window.location.host}`;
// Get Elements by DOM
const errorMsg = document.querySelector(".holder.error-msg");
const container = document.querySelector("#app");
const zipCode = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const btn = document.getElementById("generate");
// event listener to call function generate when clicked...
btn.addEventListener("click", doAction);

//main function
/* how it work ?
/* [1]first get elements values
/* [2] then check if input is empty - notice : i can do check if no result but in review say dublicate resubmit
/* [3] if not fetch data then save in object temp,date,feel
/* [4] then call function postData to post the result(res) in the empty object in server.js by the POST Method
/* [5] now fetch data from the object in /all by method GET
/* [6] update elements with fetched data */

function doAction() {
  const zip = zipCode.value;
  const feel = feelings.value;
  if (zip == "" || feel == "") {
    container.classList.add("error");
    setTimeout(() => container.classList.remove("error"), 100);
    errorMsg.style.display = "block";
    setTimeout(() => (errorMsg.style.display = "none"), 2000);
    errorMsg.innerHTML = "Inputs can't be empty !!";
  } else {
    fetchData(zip)
      .then((data) => ({
        temp: Math.round(data.main.temp),
        newDate,
        feel,
      }))
      .then((res) => {
        postData(`${serverUrl}/add`, res);
        update();
      });
  }
}
//* Helper functions *\\
// this function fetch json from the api by zipcode
async function fetchData(zipC) {
  try {
    const response = await fetch(`${baseUrl}${zipC}${apiKey}`);
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}
// Async POST to do post request with fetched data
// notice : this code from classroom lesson 4
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (err) {
    console.error(err);
  }
};

// updated ui elements function i got this function from https://review.udacity.com/#!/rubrics/4671/view
const update = async () => {
  const request = await fetch(serverUrl + "/all");
  try {
    // Transform into JSON
    const allData = await request.json();
    // Show result
    document.querySelector(".holder.entry").style.display = "block";
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML = `${allData.temp} degrees`;
    document.getElementById("content").innerHTML = allData.feel;
    document.getElementById("date").innerHTML = allData.newDate;
  } catch (err) {
    console.log(err);
  }
};
