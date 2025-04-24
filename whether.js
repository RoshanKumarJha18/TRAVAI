const apiKey = "99accd47bd9b4f41900131453252404";
const places = ["Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat",
  "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam",
  "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot",
  "Kalyan", "Vasai", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai",
  "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur",
  "Madurai", "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli", "Mysuru", "Tiruchirappalli",
  "Bareilly", "Aligarh", "Tiruppur", "Moradabad", "Gurgaon", "Jalandhar", "Bhubaneswar", "Salem",
  "Warangal", "Guntur", "Bhiwandi", "Saharanpur", "Gorakhpur", "Bikaner", "Amravati", "Noida",
  "Agra - Taj Mahal", "Delhi - Red Fort", "Mumbai - Gateway of India", "Jaipur - Amber Fort", 
  "Hyderabad - Charminar", "Chennai - Marina Beach", "Goa - Baga Beach", "Rajasthan - Udaipur Lake",
  "Taj Mahal", "Qutub Minar", "Gateway of India", "Ajanta Caves", "Ellora Caves", "Meenakshi Temple",
  "Amber Fort", "Rann of Kutch", "Khajuraho Temples", "Udaipur (City Palace)", "Jaisalmer Fort",
  "Bodh Gaya", "Sanchi Stupa", "Badrinath", "Kedarnath", "Rishikesh", "Haridwar", "Humayun's Tomb",
  "Charminar", "Hampi", "Mysore Palace", "Elephanta Caves", "Lal Qila (Red Fort)", "Lotus Temple",
  "Nainital", "Kerala Backwaters (Alleppey)", "Coorg", "Gulmarg", "Valley of Flowers", "Spiti Valley",
  "Shimla", "Manali", "Rohtang Pass", "Rishikonda Beach", "Puri Jagannath Temple", "Sundarbans",
  "Warangal Fort", "Konark Sun Temple", "Puri Beach", "Mount Abu", "Varanasi Ghats", "Golden Temple",
  "Fatehpur Sikri", "Jodhpur (Mehrangarh Fort)", "Ajmer Sharif Dargah", "Sula Vineyards",
  "Chidambaram Temple", "Athirappilly Waterfalls", "Bandipur National Park", "Valley of Kashmir",
  "Kanha National Park", "Bikaner (Junagarh Fort)", "Gokarna Beach", "Lonavala", "Alibaug",
  "Mahabalipuram", "Ramoji Film City", "Jampui Hills", "Nanda Devi National Park", "Kaziranga National Park",
  "Tawang Monastery", "Sela Pass", "Orchha Fort", "Wayanad", "Dharamshala", "Sikkim (Tsomgo Lake)",
  "Digha Beach", "Jampui Hills", "Nanda Devi Temple", "Munnar", "Cherrapunji", "Nohkalikai Falls",
  "Khajjiar", "Tirthan Valley", "Kanheri Caves", "Srisailam", "Papi Hills", "Nanda Devi", "Patiala",
  "Gwalior Fort", "Somnath Temple", "Rishikesh (Laxman Jhula)", "Tirthan Valley", "Mandu", "Narmada Valley",
  "Satpura National Park", "Kanchipuram", "Ooty", "Kullu Valley", "Shimla Ridge", "Hazaribagh",
  "Kalimpong", "Patal Bhuvaneshwar", "Laitmawsiang", "Kumbhalgarh Fort", "Kanchanaburi", "Rishikesh (Bungee Jumping)",
  "Chikmagalur", "Kalapathar Beach", "Jodhpur (Clock Tower and Sardar Market)"];

// --- Debounced Suggestions ---
let debounceTimer;
function showSuggestions() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const input = document.getElementById("locationInput").value.toLowerCase();
    const suggestionBox = document.getElementById("suggestions");
    suggestionBox.innerHTML = "";

    if (input.length === 0) return;

    const matches = places.filter(place => place.toLowerCase().startsWith(input));
    matches.forEach(place => {
      const div = document.createElement("div");
      div.textContent = place;
      div.onclick = () => {
        document.getElementById("locationInput").value = place;
        suggestionBox.innerHTML = "";
        getWeather();
      };
      suggestionBox.appendChild(div);
    });
  }, 300); // Debounce delay
}

// --- Hide Suggestions on Outside Click ---
document.addEventListener("click", (e) => {
  const input = document.getElementById("locationInput");
  const suggestions = document.getElementById("suggestions");
  if (!input.contains(e.target) && !suggestions.contains(e.target)) {
    suggestions.innerHTML = "";
  }
});

// --- Fetch and Display Weather ---
async function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  const resultBox = document.getElementById("weatherResult");
  if (!location) {
    resultBox.innerHTML = "<p>Please enter a location.</p>";
    return;
  }

  resultBox.innerHTML = '<p><img src="https://i.gifer.com/ZZ5H.gif" alt="Loading..." width="32"></p>';

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`);
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

    const data = await response.json();
    const current = data.current;
    const loc = data.location;

    resultBox.innerHTML = `
      <h3>${loc.name}, ${loc.country}</h3>
      <p><img src="https:${current.condition.icon}" alt="Weather icon"> ${current.condition.text}</p>
      <p>Temperature: ${current.temp_c}°C</p>
      <p>Feels Like: ${current.feelslike_c}°C</p>
      <p>Humidity: ${current.humidity}%</p>
      <p>Wind: ${current.wind_kph} kph</p>
      <p>Last Updated: ${current.last_updated}</p>
    `;

    saveRecentSearch(location);
  } catch (error) {
    console.error("Fetch error:", error);
    resultBox.innerHTML = `<p>Failed to fetch weather data. ${error.message}</p>`;
  }
}

// --- Save and Show Recent Searches ---
function saveRecentSearch(location) {
  let recent = JSON.parse(localStorage.getItem("recentSearches")) || [];
  recent = [location, ...recent.filter(item => item !== location)].slice(0, 5);
  localStorage.setItem("recentSearches", JSON.stringify(recent));
  showRecentSearches();
}

function showRecentSearches() {
  const container = document.getElementById("recentSearches");
  const recent = JSON.parse(localStorage.getItem("recentSearches")) || [];
  container.innerHTML = recent.map(item => `<span onclick="selectRecent('${item}')">${item}</span>`).join("");
}

function selectRecent(location) {
  document.getElementById("locationInput").value = location;
  getWeather();
}

// --- Init ---
document.getElementById("locationInput").addEventListener("input", showSuggestions);
showRecentSearches();