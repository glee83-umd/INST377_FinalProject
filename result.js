function loadSlowAPI(query) {
    return fetch(`http://ip-api.com/json/${query}`)
        .then((result) => result.json())
        .then(data => [data]);
}

function createMap(latitude, longitude) {
    const mapDiv = document.getElementById("map");
    mapDiv.innerHTML = "";

    const map = L.map('map').setView([latitude, longitude], 8);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const marker = L.marker([latitude, longitude]).addTo(map);

    fetch(`https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${latitude}&lon=${longitude}&accept-language=en`)
        .then(response => response.json())
        .then(data => {
            const address = data.features?.[0]?.properties?.address;
            if (!address) {
                document.getElementById("localityInfo").innerHTML = "No address found.";
                return;
            }

            const street = address.road || "";
            const city = address.city || address.town || address.village || "";
            const state = address.state || "";
            const country = address.country || "";
            const popupContent = `${street}, ${city}, ${state}, ${country}`;
            marker.bindPopup(popupContent).openPopup();

            getSunData(latitude, longitude).then(sunData => {
                const { sunrise, sunset } = sunData;
                createTable(address, latitude, longitude, sunrise, sunset);
            });
        });
}

function createTable(address, latitude, longitude, sunrise, sunset) {
    const container = document.getElementById("localityInfo");
    container.innerHTML = "";

    const table = document.createElement("table");
    table.className = "resultsTable";
    table.style.display = "table";

    const addressInfo = {
        "Latitude": latitude,
        "Longitude": longitude,
        "House Number": address.house_number,
        "Street": address.road,
        "Suburb": address.suburb,
        "City": address.city || address.town || address.village,
        "County": address.county,
        "State": address.state,
        "ZIP": address.postcode,
        "Country": address.country,
        "Sunrise": sunrise,
        "Sunset": sunset,
    };

    for (const [label, value] of Object.entries(addressInfo)) {
        if (!value) continue;

        const row = document.createElement("tr");

        const th = document.createElement("th");
        th.textContent = label;

        const td = document.createElement("td");
        td.textContent = value;

        row.appendChild(th);
        row.appendChild(td);
        table.appendChild(row);
    }

    container.appendChild(table);
}

async function getSunData(latitude, longitude) {
    const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`);
    const data = await response.json();
    return {
        sunrise: data.results.sunrise,
        sunset: data.results.sunset
    };
}

async function searchIp() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("ip");

    if (!query) {
        alert("No IP address in URL.");
        return;
    }

    const [data] = await loadSlowAPI(query);

    const latitude = data.lat;
    const longitude = data.lon;

    createMap(latitude, longitude);
}

window.onload = searchIp;