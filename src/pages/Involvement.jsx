/** @format */

import config from "../../config.json";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import BottomBar from "../components/BottomBar.jsx";

export default function Involvement() {
    const navigate = useNavigate();
    const rootURL = config.serverRootURL;

    return (
        <div>
            <NavBar></NavBar>
            <div className="w-screen h-full bg-[--light-taupe-grey] overflow flex justify-center">
                <div className="rounded-md bg-[--champagne] p-20 space-y-2 w-auto h-full font-Lato my-4">
                    <div className="max-w-3xl mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold mb-6">Get Involved</h1>
                        <p className="mb-4">
                            Reducing urban heat in Philadelphia is a community effort, and there are many ways you can get involved. Here are some steps you can take to make a difference:
                        </p>
                        <h2 className="text-2xl font-semibold mb-4">1. Plant Trees and Greenery</h2>
                        <p className="mb-4">
                            Trees and plants provide shade and release moisture into the air, which helps to cool the environment. Consider planting trees in your yard or participating in community tree-planting events.
                        </p>
                        <h2 className="text-2xl font-semibold mb-4">2. Support Green Roofs</h2>
                        <p className="mb-4">
                            Green roofs are covered with vegetation and can significantly reduce the heat absorbed by buildings. Support local initiatives that promote the installation of green roofs in urban areas.
                        </p>
                        <h2 className="text-2xl font-semibold mb-4">3. Advocate for Cool Pavements</h2>
                        <p className="mb-4">
                            Cool pavements are designed to reflect more sunlight and absorb less heat. Advocate for the use of cool pavements in your community to help reduce urban heat islands.
                        </p>
                        <h2 className="text-2xl font-semibold mb-4">4. Reduce Energy Consumption</h2>
                        <p className="mb-4">
                            Reducing energy consumption can decrease the amount of heat generated by buildings. Use energy-efficient appliances, turn off lights when not in use, and consider using renewable energy sources.
                        </p>
                        <h2 className="text-2xl font-semibold mb-4">5. Get Involved in Local Initiatives</h2>
                        <p className="mb-4">
                            Join local organizations and participate in initiatives aimed at reducing urban heat. Attend community meetings, volunteer for projects, and stay informed about local policies and programs.
                        </p>
                    </div>
                </div>
            </div>
            <BottomBar></BottomBar>
        </div>
    );
}