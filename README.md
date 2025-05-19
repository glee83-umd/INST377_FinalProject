# INST377_FinalProject

# Name (Please Input your name): Gwon Neung Lee

## Description

**IP Finder** is a fully client-side web application that allows users to enter an IP address and view its geographical data, including:
- Interactive map with IP location marked
- Reverse geocoded address
- Sunrise and sunset times
- Auto-scrolling flag slider for visual appeal


## Features

- Search by IP with visual output
- Fetches data from multiple public APIs
- Dynamic and responsive UI using HTML/CSS/JavaScript
- Lightweight with no server or database needed


## Target Browsers

This application is tested and compatible with:

- Google Chrome (desktop/mobile)
- Firefox (desktop/mobile)
- Safari (iOS/macOS)
- Microsoft Edge


## Project Structure

```
/README.md
/home.html
/about.html
/help.html
/result.html
/css.css
/home.js
/result.js
```


## Developer Manual

For technical setup, usage, and development notes, see the [Developer Manual](#developer-manual)


# Developer Manual

## Overview

This document is intended for developers maintaining or extending the **IP Finder** system. The application is fully client-side and uses public APIs to fetch location-based data for any IP address input by the user.


## Installation

1. Clone the repository:

```bash
git clone https://github.com/glee83-umd/INST377_FinalProject.git
cd INST377_FinalProject
```

2. No server installation needed. All code runs client-side using:
    - Leaflet.js (map)
    - Nominatim (reverse geocoding)
    - Sunrise-Sunset API
    - IP-API (IP location)
    - Flag images from FlagsAPI
    - Glider.js (auto-scrolling slider)


## Running the App

1. Open `home.html` directly in your browser.
2. Alternatively, for API compatibility, use a local server:

```bash
# Python 3
python -m http.server 8000

# Access in browser:
http://localhost:8000/home.html
```


## Usage Instructions

1. Go to the **Home** page.
2. Enter an IP address (e.g., `8.8.8.8`) and click **Search**.
3. You’ll be redirected to the **Result** page where:
    - The IP’s location is displayed on a map.
    - Address, city, country, and coordinates are shown.
    - Sunrise and sunset times are included.

For help or contact, see the **About** and **Help** pages.


## Testing

There are no automated tests included in this project. Testing is done manually by:
- Inputting known IP addresses (e.g., 8.8.8.8)
- Verifying location, map marker, flag display, and sunrise/sunset data

## External APIs Used

- **IP Geolocation**:  
    `http://ip-api.com/json/{ip}`: Returns IP-based location data.

- **Reverse Geocoding**:  
    `https://nominatim.openstreetmap.org/reverse?format=geojson`: Converts lat/lon to human-readable address.

- **Sunrise/Sunset Data**:  
    `https://api.sunrise-sunset.org/json?lat={lat}&lng={lng}`: Displays country flags.


## Server API

This app does not include a custom server or expose any internal APIs. All logic and data fetching are handled on the client side using JavaScript and fetch.


## Known Issues

- No validation for private/reserved IP ranges.
- Some APIs (e.g., Nominatim) are rate-limited.
- No input throttling or caching.
- Not mobile-optimized for small viewports.


## Future Enhancements

- Add history of searched IPs
- Cache data locally to reduce redundant API calls
- Add dark mode / theme toggle
- Allow CSV export of location data
- Display weather or timezone info at IP location