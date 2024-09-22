/** @format */

import config from "../../config.json";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/NavBar.jsx";
import BottomBar from "../components/BottomBar.jsx";
import RadarMap from "../components/RadarMap.jsx";
import ChillMeter from "../components/ChillMeter.jsx";

import axios from 'axios';

import Radar from 'radar-sdk-js';
import 'radar-sdk-js/dist/radar.css';

// Initialize Radar with your publishable API key
Radar.initialize('prj_live_pk_5d7c81dfa66723740042a5be87c66c9374b70123');

export default function Map() {
    const navigate = useNavigate();
    const rootURL = config.serverRootURL;
    const [greenspacePercentage, setGreenspacePercentage] = useState(null);
    const [analyzedImage, setAnalyzedImage] = useState(null);
    const [originalImage, setOriginalImage] = useState(null);
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [imageURL, setImageURL] = useState("");
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

            if (addresses.length > 0) {
                const selectedAddress = addresses[0];
                axios.post(`${rootURL}/getImage`, {
                    lat: selectedAddress.latitude,
                    long: selectedAddress.longitude
                })
                .then((response) => {
                    console.log("Image analysis response:", response.data);
                    setOriginalImage(response.data.original_image);
                    setAnalyzedImage(response.data.analyzed_image);
                    setGreenspacePercentage(response.data.greenspace_percentage);
                    setImageURL(response.data.imageURL)
                })
                .catch((error) => {
                    console.error("Error fetching image URL:", error);
                });
            }
        })
        .catch((err) => {
            console.error("Autocomplete error:", err);
        });
    };

    const handleAddressSelect = (selectedAddress, location) => {
        setAddress(selectedAddress);
        setLocation(location);
        setSuggestions([]);
    };

    const handleAddressSubmit = () => {
        console.log("Location:", location);
        if (address && location) {
            setCoordinates({ lat: location.latitude, lng: location.longitude });
    
            console.log("Location coordinates:", location.latitude, location.longitude);
    
            axios.get(`${rootURL}/getImage`, {
                params: {
                    lat: location.latitude,
                    long: location.longitude
                }
            })
            .then((response) => {
                console.log("Image URL response:", response.data);
                setImageURL(response.data.imageUrl);
                setGreenspacePercentage(response.data.greenspace_percentage);
                setAnalyzedImage(response.data.analyzed_image);
                setOriginalImage(response.data.original_image)
            })
            .catch((error) => {
                console.error("Error fetching image URL:", error);
            });
        } else {
            console.log("No addresses found for the inputted address.");
        }
    };

    return (
        <div className="flex flex-col">
            <NavBar></NavBar>
            <div className="w-screen h-full bg-[--light-taupe-grey] overflow flex justify-center">
                <div className="rounded-md bg-[--champagne] p-20 space-y-2 w-auto h-full font-Lato my-4">
                    <div className="max-w-3xl mx-auto px-4 py-4">
                        <h1 className="text-3xl font-bold mb-6">Urban Heat</h1>
                        <p className="mb-4">
                            Urban heat islands occur when cities replace natural land cover with dense concentrations of pavement, buildings, and other surfaces that absorb and retain heat. This effect increases energy costs (e.g., for air conditioning), air pollution levels, and heat-related illness and mortality. Understanding and mitigating urban heat is crucial for improving the quality of life in urban areas.
                        </p>
                    </div>
                    {/* Input address */}
                    <div className="max-w-3xl mx-auto px-4 py-4">
                        <h2 className="text-2xl font-bold mb-4">Check Your Coverage</h2>
                        <div className="mb-4">
                            <input
                                type="text"
                                value={address}
                                onChange={handleAddressChange}
                                placeholder="Enter an address"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            {suggestions.length > 0 && (
                                <ul className="border border-gray-300 rounded-md mb-4">
                                    {suggestions.slice(0, 10).map((suggestion, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleAddressSelect(suggestion.formattedAddress, suggestion)}
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
                    <div className="max-w-3xl mx-auto px-4">
                        {imageURL && (
                            <div className="mt-4">
                                <h3 className="text-xl font-semibold mb-2">Original Image</h3>
                                <img src={imageURL} alt="Original Map" className="w-full h-auto rounded-md" />
                            </div>
                        )}
                        <div className="flex flex-row space-x-4 mt-2 "> 
                            {originalImage && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Original Image</h3>
                                    <img 
                                        src={`data:image/png;base64,${originalImage}`} 
                                        alt="Analyzed Map" 
                                        className="w-full h-auto rounded-md" 
                                    />
                                </div>
                            )}
                            {analyzedImage && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Analyzed Image</h3>
                                    <img 
                                        src={`data:image/png;base64,${analyzedImage}`} 
                                        alt="Analyzed Map" 
                                        className="w-full h-auto rounded-md" 
                                    />
                                </div>
                            )}
                        </div>
                        {greenspacePercentage !== null && (
                            <div className="mt-4">
                                <p className="text-xl font-semibold my-2">
                                 Greenspace Percentage:
                                </p>
                                <ChillMeter greenspacePercentage={greenspacePercentage} />
                                <p className="text-xl font-semibold my-2">
                                    Chill score: 
                                    {greenspacePercentage < 10 && " Not chill ❌"}
                                    {greenspacePercentage >= 10 && greenspacePercentage < 20 && " Pretty chill I guess 🤙"}
                                    {greenspacePercentage >= 20 && greenspacePercentage < 30 && " Almost super chill 🧊"}
                                    {greenspacePercentage >= 30 && " Good chill 🥶"}
                                </p>
                            </div>
                        )}
                        <div className="max-w-3xl mx-auto py-4 mt-2">
                            <h2 className="text-2xl font-bold mb-4">Tree Coverage</h2>
                            <p className="mb-2">
                                It is recommended to have at least 30% tree coverage in every neighborhood to help mitigate the effects of urban heat islands. Trees provide shade, reduce temperatures, and improve air quality.
                            </p>
                            <button
                                onClick={() => navigate('/involvement')}
                                className="mt-2 p-2 bg-[--cambridge-blue] hover:bg-[--khaki] text-white rounded-md"
                            >
                                How can you reduce urban heat?
                            </button>
                        </div>
                        <h2 className="text-2xl font-bold mt-4">Map</h2>
                        <div className="w-full h-96 bg-gray-200 flex items-center justify-center p-1 border border-gray-400">
                            {coordinates.lat && coordinates.lng ? (
                                <RadarMap coordinates={coordinates} />
                            ) : (
                                <RadarMap coordinates={{ lat: 39.9528, lng: -75.1635 }} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <BottomBar />
        </div>
    );
}