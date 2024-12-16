"use server";

import { LocationFromIP } from "@/libs/schema"; // Adjust the import path as needed

export default async function getLocationFromIP(): Promise<LocationFromIP> {
  try {
    console.log("Request received for get-location-from-ip action");

    // URL for IP-based geolocation service (ip-api.com in this case)
    const url = new URL("http://ip-api.com/json/");
    url.searchParams.append("fields", "status,country,countryCode,regionName,city,lat,lon");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check if the API returned a successful response
    if (data.status !== "success") {
      throw new Error(data.message || "Failed to fetch location from IP");
    }

    const location = `${data.city}, ${data.regionName}`;
    const countryCode = data.countryCode;
    const latitude = data.lat;
    const longitude = data.lon;

    return {
      location,
      countryCode,
      latitude,
      longitude,
    } as LocationFromIP;
  } catch (error) {
    console.error("Error:", error);

    // Return a default location if there is an error
    return {
      location: "New York, USA",
      countryCode: "US",
      latitude: 40.7128,
      longitude: -74.0060,
    };
  }
}