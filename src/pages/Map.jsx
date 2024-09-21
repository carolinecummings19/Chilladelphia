/** @format */

import config from "../../config.json";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/NavBar.jsx";
import BottomBar from "../components/BottomBar.jsx";

import Radar from 'radar-sdk-js';
import 'radar-sdk-js/dist/radar.css';

// Initialize Radar with your publishable API key
Radar.initialize('prj_live_pk_5d7c81dfa66723740042a5be87c66c9374b70123');

export default function Map() {
    const navigate = useNavigate();
    const rootURL = config.serverRootURL;

    const [address, setAddress] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [imageURL, setImageURL] = useState("https://neverastray.com/generated/assets/img/product/city-maps/30x20-philadelphia-(40.0049,-75.1180,11.02)-2022-07-12-1000-a799907a2.webp");
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
        // Use Radar's autocomplete API to get address suggestions
        Radar.autocomplete({
            query: e.target.value,
            near: {
                latitude: 40.783826,
                longitude: -73.975363
            },
            limit: 10
        })
        .then((result) => {
            const { addresses } = result;
            setSuggestions(addresses);
        })
        .catch((err) => {
            console.error("Autocomplete error:", err);
        });
    };

    const handleAddressSelect = (selectedAddress) => {
        setAddress(selectedAddress);
        setSuggestions([]);
    };

    const handleAddressSubmit = () => {
        // Use Radar's geocoding API to get the coordinates of the inputted address
        Radar.forwardGeocode({ query: address }, (err, result) => {
            if (err) {
                console.error("Geocoding error:", err);
                return;
            }
            if (result && result.addresses && result.addresses.length > 0) {
                const { latitude, longitude } = result.addresses[0].location;
                setCoordinates({ lat: latitude, lng: longitude });
                console.log("Coordinates:", latitude, longitude);
                // Optionally, update the imageURL based on the fetched coordinates
                // setImageURL(fetchedImageURL);
            } else {
                console.log("No addresses found for the inputted address.");
            }
        });
    };

    return (
        <div className="flex flex-col">
            <NavBar></NavBar>
            <div className="w-screen h-full bg-[--light-taupe-grey] overflow flex justify-center">
                <div className="rounded-md bg-[--champagne] p-20 space-y-2 w-auto h-full font-Lato my-4">
                    <div className="max-w-3xl mx-auto px-4 py-4">
                        <h1 className="text-3xl font-bold mb-6">Urban Heat Issues</h1>
                        <p className="mb-4">
                            Urban heat islands occur when cities replace natural land cover with dense concentrations of pavement, buildings, and other surfaces that absorb and retain heat. This effect increases energy costs (e.g., for air conditioning), air pollution levels, and heat-related illness and mortality. Understanding and mitigating urban heat is crucial for improving the quality of life in urban areas.
                        </p>
                    </div>
                    {/* Input address */}
                    <div className="max-w-3xl mx-auto px-4 py-4">
                        <h2 className="text-2xl font-bold mb-4">Find Out How Hot It Is In Your Area</h2>
                        <div className="mb-4">
                            <input
                                type="text"
                                value={address}
                                onChange={handleAddressChange}
                                placeholder="Enter your address"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            {suggestions.length > 0 && (
                                <ul className="border border-gray-300 rounded-md mt-2">
                                    {suggestions.slice(0, 10).map((suggestion, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleAddressSelect(suggestion.formattedAddress)}
                                            className="p-2 cursor-pointer hover:bg-gray-200"
                                        >
                                            {suggestion.formattedAddress}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <button
                                onClick={handleAddressSubmit}
                                className="mt-2 p-2 bg-[--cambridge-blue] hover:bg-[--khaki] text-white rounded-md"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="max-w-3xl mx-auto px-4 py-4">
                        <h2 className="text-2xl font-bold mb-4">Map</h2>
                        <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                            {imageURL ? (
                                <img src={imageURL} alt="Map Placeholder" className="w-full h-full object-cover" />
                            ) : (
                                <p>Map will be displayed here</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <BottomBar />
        </div>
    );
}