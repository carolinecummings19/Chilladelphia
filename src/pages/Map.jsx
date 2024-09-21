/** @format */

import config from "../../config.json";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/NavBar.jsx";
import BottomBar from "../components/BottomBar.jsx";

export default function Map() {
    const navigate = useNavigate();
    const rootURL = config.serverRootURL;

    const [address, setAddress] = useState("");

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleAddressSubmit = () => {
        // Handle the address submission logic here
        console.log("Address submitted:", address);
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
                        {/* Placeholder for Map API */}
                        <p>Map will be displayed here</p>
                    </div>
                </div>
            </div>
        </div>
        <BottomBar />
        </div>
    );
}