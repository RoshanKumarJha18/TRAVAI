


function locomotivejs(){
  
const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
function gsapanime(){
  var tl=gsap.timeline()


tl.from(".nav-bar",{
    y:-1000,
    duration:1.5,
    opacity:0
})
tl.from(".content h1 ,p",{
    y:310,
    duration:1,
    
})
tl.from("#aibtn",{
    y:50,
    opacity:0
})
gsap.from(".page3 .p3box h1", {
  y: -150,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".page3",
    scroller: "#main",  // required with Locomotive Scroll
    start: "top 90%",
    end:"top 10%",
    toggleActions: "play none none none", // only play once
    // scrub: true, // optional if you want scroll-linked movement
    // markers: true
  }
});

gsap.from(".page4  .p4box h1",{
  y:-310,
  opacity:0,
  duration:1,
  scrollTrigger:{
    trigger:".page4",
    scroller:"#main",
    // markers:true,
    // scrub:true,
    start: "top 90%",
    end:"top 10%",
   

  }
  
})
gsap.from(".page5  .p5box h1",{
  y:-310,
  opacity:0,
  duration:1,
  scrollTrigger:{
    trigger:".page5",
    scroller:"#main",
    // markers:true,
    start:"top 70%",
    end:"top 30%",
   

  }
  
})

gsap.from(".page6  .p6box h1",{
  y:-310,
  opacity:0,
  duration:1,
  scrollTrigger:{
    trigger:".page6",
    scroller:"#main",
    // markers:true,
    start:"top 60%",
    end:"top 30%",
   

  }
  
})
gsap.from(".gallery-box1", {
  scrollTrigger: {
    trigger: ".gallery-box",
    scroller:"#main",
    start: "top 90%",
    end:"top 10%",
    // markers:true,
    scrub:2
  },
  x: -50,
  opacity: 0,
  duration: 1.5,
  stagger: 0.2,
  ease: "power2.out"
});
gsap.from(".contact-section h1", {
  scrollTrigger: {
    trigger: ".contact-section",
    scroller: "#main",
    start: "top 85%",
    end: "top 30%",
    toggleActions: "play none none none",
    // markers: true
  },
  y: -100,
  opacity: 0,
  duration: 1
});

gsap.from("#contact-form .form-group", {
  scrollTrigger: {
    trigger: ".contact-section",
    scroller: "#main",
    start: "top 75%",
    end: "top 30%",
    toggleActions: "play none none none"
  },
  y: 50,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: "power2.out"
});

gsap.from("#contact-form button", {
  scrollTrigger: {
    trigger: ".contact-section",
    scroller: "#main",
    start: "top 75%",
    end: "top 30%",
    toggleActions: "play none none none"
  },
  scale: 0.8,
  opacity: 0,
  duration: 0.8,
  delay: 0.6
});



}
function purushotham(){
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
}



locomotivejs()
gsapanime()
purushotham()




