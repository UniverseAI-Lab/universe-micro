import { useEffect } from "react";
import { useAIState } from "ai/rsc";
import getLocationFromCoordinates from "@/server/get-location-from-coordinates";
import getLocationFromIP from "@/server/get-location-from-ip"; // New function to fetch location via IP

export default function useLocation() {
  const [aiState, setAIState] = useAIState();

  useEffect(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser.");
      fetchDefaultLocation();
      return;
    }

    const options = {
      timeout: 5000, // Timeout after 5 seconds
    };

    const success = async (position: GeolocationPosition) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      try {
        const response = await getLocationFromCoordinates({
          latitude,
          longitude,
        });
        if ("location" in response) {
          setAIState({
            ...aiState,
            location: {
              isLoaded: true,
              locationName: response.location,
              countryCode: response.countryCode,
              coordinates: { latitude, longitude },
            },
          });
        } else {
          console.error("Error fetching location: ", response.error);
          fetchDefaultLocation(); // Fallback to IP location
        }
      } catch (error) {
        console.error("Error processing geolocation:", error);
        fetchDefaultLocation(); // Fallback to IP location
      }
    };

    const handleError = (error: GeolocationPositionError) => {
      let errorMessage;
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          errorMessage = "The request to get user location timed out.";
          break;
        default:
          errorMessage = "An unknown error occurred.";
          break;
      }
      console.log(errorMessage);
      fetchDefaultLocation(); // Fallback to IP location
    };

    // Request geolocation
    navigator.geolocation.getCurrentPosition(success, handleError, options);

    // Fallback to IP-based location if no geolocation is provided within a timeout
    const timerId = setTimeout(() => {
      if (!aiState.location.isLoaded) {
        console.log("Geolocation timeout, switching to IP-based location.");
        fetchDefaultLocation();
      }
    }, 5000);

    return () => clearTimeout(timerId); // Clear timeout on cleanup
  }, []);

  // Fetch default location based on IP
  const fetchDefaultLocation = async () => {
    try {
      const response = await getLocationFromIP();
      if (response && "location" in response) {
        setAIState({
          ...aiState,
          location: {
            isLoaded: true,
            locationName: response.location,
            countryCode: response.countryCode,
            coordinates: {
              latitude: response.latitude,
              longitude: response.longitude,
            },
          },
        });
      } else {
        console.error("Error fetching IP-based location:", response.error);
        setAIState({
          ...aiState,
          location: {
            isLoaded: true,
            locationName: "Unknown",
            countryCode: "US", // Fallback country code
            coordinates: { latitude: 0, longitude: 0 }, // Default coordinates
          },
        });
      }
    } catch (error) {
      console.error("Error fetching location by IP:", error);
      setAIState({
        ...aiState,
        location: {
          isLoaded: true,
          locationName: "Unknown",
          countryCode: "US",
          coordinates: { latitude: 0, longitude: 0 },
        },
      });
    }
  };

  return {
    location: aiState.location.coordinates,
    isLoaded: aiState.location.isLoaded,
  };
}