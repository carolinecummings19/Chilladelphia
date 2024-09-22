/** @format */

import config from "../../config.json";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import BottomBar from "../components/BottomBar.jsx";

export default function Involvement() {
    const navigate = useNavigate();
    const rootURL = config.serverRootURL;

    return (
        <div className="flex flex-col">
            <NavBar></NavBar>
            <div className="w-screen h-full bg-[--light-taupe-grey] overflow flex justify-center">
                <div className="rounded-md bg-[--champagne] p-20 space-y-2 w-auto h-full font-Lato my-4">
                    <div className="max-w-3xl mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold mb-6">Get Involved</h1>
                        <p className="mb-4">
                            Reducing urban heat in Philadelphia is a community effort, and there are many ways you can get involved. One important concept to consider is the 3-30-300 rule for urban forestry:
                        </p>
                        <h2 className="text-2xl font-semibold mb-4">The 3-30-300 Rule</h2>
                        <p className="mb-4">
                            The 3-30-300 rule is a guideline for urban forestry that aims to improve the quality of life in cities. It suggests that every resident should be able to see at least 3 trees from their home, live in a neighborhood with at least 30% tree canopy cover, and be no more than 300 meters away from the nearest green space. This rule helps to ensure that urban areas are greener, cooler, and more livable.
                        </p>
                        <img src="https://www.visitphilly.com/wp-content/uploads/2017/12/RittenhouseSquare-J-Smith.jpg" alt="Trees in Rittenhouse Square" className="mb-4" />
                        <p className="text-2xl font-semibold mb-4">
                            Here are some steps you can take to make a difference:
                        </p>
                        <h2 className="text-xl font-semibold mb-4">1. Plant Trees and Greenery</h2>
                        <p className="mb-4">
                            Trees and plants provide shade and release moisture into the air, which helps to cool the environment. Consider planting trees in your yard or participating in community tree-planting events. In Philadelphia, you can get involved by:
                        </p>
                        <ul className="list-disc list-inside mb-4">
                            <li>
                                <a href="https://myphillypark.org/what-we-do/programs/park-stewardship/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                                    Volunteering in Philly parks
                                </a>
                            </li>
                            <li>
                                <a href="https://treephilly.org/yard-trees-2/#HowtoGetaYardTree/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                                    Planting a tree at your home
                                </a>
                            </li>
                            <li>
                                <a href="https://treephilly.org/street-trees/#HowtoGetaStreetTree/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                                    Planting a street tree
                                </a>
                            </li>
                        </ul>
                        <h2 className="text-xl font-semibold mb-4">2. Support Green Roofs</h2>
                        <div className="flex mb-4">
                            <p className="flex-1">
                                Green roofs are covered with vegetation and can significantly reduce the heat absorbed by buildings. Support local initiatives that promote the installation of green roofs in urban areas. Additionally, you can take advantage of the 
                                <a href="https://www.phila.gov/services/payments-assistance-taxes/taxes/tax-credits/business-tax-credits/green-roof-tax-credit/" className="text-blue-500 underline px-1" target="_blank" rel="noopener noreferrer">
                                     Green Roof Tax Credit 
                                </a> 
                                 offered by the city of Philadelphia.
                            </p>
                            <img src="https://schuylkillyards.com/sites/default/files/styles/max_1300x1300/public/gallery2020-07/DJI_0173_0.jpg?itok=6t7hESswg" alt="Green Roof" className="ml-4 w-2/5 h-auto" />
                        </div>
                        <h2 className="text-xl font-semibold mb-4">3. Advocate for Cool Pavements</h2>
                        <p className="mb-4">
                            Cool pavements are designed to reflect more sunlight and absorb less heat. Advocate for the use of cool pavements in your community to help reduce urban heat islands. You can read more about cool pavements in this 
                            <a href="https://thephiladelphiacitizen.org/cool-streets-cool-air/" className="text-blue-500 underline pl-1" target="_blank" rel="noopener noreferrer">
                                article
                            </a>.
                        </p>
                        <h2 className="text-xl font-semibold mb-4">4. Reduce Energy Consumption</h2>
                        <p className="mb-4">
                            Reducing energy consumption can decrease the amount of heat generated by buildings. Here are some ways Philadelphia residents can reduce their energy consumption:
                        </p>
                        <ul className="list-disc list-inside mb-4">
                            <li>Walk or bike instead of driving (Philadelphia is one of the most walkable cities in the U.S.!)</li>
                            <li>Use public transportation such as buses, trolleys, and subways.</li>
                            <li>Install energy-efficient appliances and light bulbs in your home.</li>
                            <li>Turn off lights, electronics, and appliances when not in use.</li>
                            <li>Use programmable thermostats to optimize heating and cooling in your home.</li>
                            <li>Consider using renewable energy sources like solar panels.</li>
                        </ul>
                        <h2 className="text-xl font-semibold mb-4">5. Get Involved in Local Initiatives</h2>
                        <p className="mb-4">
                            Join local organizations and participate in initiatives aimed at reducing urban heat. Attend community meetings, volunteer for projects, and stay informed about local policies and programs. Here are some relevant Philadelphia organizations:
                        </p>
                        <ul className="list-disc list-inside mb-4">
                            <li>
                                <a href="https://cleanair.org/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                                    Clean Air Council
                                </a> – Works to improve air quality, which is closely related to urban heat, as heat islands can exacerbate pollution and poor air quality in cities.
                            </li>
                            <li>
                                <a href="http://idlefreephilly.org/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                                    Idle Free Philly
                                </a> – Though focused on reducing idling, limiting vehicle emissions in urban areas can help mitigate air quality issues exacerbated by urban heat.
                            </li>
                            <li>
                                <a href="http://pennfuture.org/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                                    The Climate Reality Project
                                </a> – Focused on climate change awareness and action, this group could support broader climate-related efforts in Philadelphia, including urban heat initiatives.
                            </li>
                            <li><a href="http://climatereality.org/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                                   PennFuture
                                </a> – Focused on climate change awareness and action, this group could support broader climate-related efforts in Philadelphia, including urban heat initiatives.
                            </li>
                            <li>
                                <a href="http://www.fairmountparkconservancy.org/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                                    Fairmount Park Conservancy
                                </a> – Enhances green spaces, which are crucial for combating the urban heat island effect by increasing tree cover and cooling urban areas.
                            </li>
                            <li>
                                <a href="http://treephilly.org/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                                    Tree Philly
                                </a> – Specifically aims to plant trees in Philadelphia, which directly reduces urban heat by increasing canopy cover, providing shade, and cooling streets.
                            </li>
                            <li>
                                <a href="http://ucgreen.org/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                                    UC Green
                                </a> – Involves tree planting and volunteer-based greening efforts in West Philadelphia, which can help reduce urban heat in these neighborhoods.
                            </li>
                            <li>
                                <a href="http://urbantreeconnection.org/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                                    Urban Tree Connection
                                </a> – Transforms vacant lots into green spaces and plants trees, directly mitigating urban heat effects.
                            </li>
                            <li>
                                <a href="http://schuylkillcenter.org/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                                    Schuylkill Center for Environmental Education
                                </a> – Educates about environmental issues, including heat and air quality, with programs that could be tied to urban cooling strategies.
                            </li>
                        </ul>
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={() => navigate('/forum')}
                                className="bg-[--cambridge-blue] text-white px-4 py-2 rounded-md hover:bg-[--khaki]"
                            >
                                Talk with Other Residents
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <BottomBar></BottomBar>
        </div>
    );
}