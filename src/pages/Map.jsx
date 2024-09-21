/** @format */

import config from "../../config.json";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import BottomBar from "../components/BottomBar.jsx";

export default function Map() {
    const navigate = useNavigate();
    const rootURL = config.serverRootURL;

    return (
        <div className="w-screen h-screen bg-[--light-taupe-grey] overflow-scroll flex items-center justify-center mt-28">
            <div className="rounded-md bg-[--champagne] p-20 space-y-2 w-auto font-Lato">
                <div className="max-w-3xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6">Urban Heat Issues</h1>
                    <p className="mb-4">
                        Urban heat islands occur when cities replace natural land cover with dense concentrations of pavement, buildings, and other surfaces that absorb and retain heat. This effect increases energy costs (e.g., for air conditioning), air pollution levels, and heat-related illness and mortality. Understanding and mitigating urban heat is crucial for improving the quality of life in urban areas.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto px-4 py-8">
                    <h2 className="text-2xl font-bold mb-4">Map</h2>
                    <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                        {/* Placeholder for Map API */}
                        <p>Map will be displayed here</p>
                    </div>
                </div>
            </div>
            <NavBar />
            <BottomBar />
        </div>
    );
}