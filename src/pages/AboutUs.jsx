/** @format */

import config from "../../config.json";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import BottomBar from "../components/BottomBar.jsx";

export default function AboutUs() {
    const navigate = useNavigate();
    const rootURL = config.serverRootURL;

    return (
        <div>
            <NavBar></NavBar>
            <div className="w-screen h-screen bg-[--light-taupe-grey] overflow-scroll flex items-center justify-center">
            <div className="rounded-md bg-[--champagne] p-20 space-y-2 w-auto font-Lato -mt-20">
                <div className="max-w-3xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6">About Us</h1>
                    <p className="mb-4">
                        Welcome to Chilladelphia! We are a community-driven platform dedicated to
                        bringing you the best experiences in Philadelphia. Our mission is to
                        connect people with the vibrant culture, events, and hidden gems of
                        this amazing city.
                    </p>
                    <p className="mb-4">
                        At Chilladelphia, we believe in the power of community and the importance
                        of local engagement. Our team is passionate about showcasing the
                        diverse and dynamic aspects of Philadelphia, from its rich history to
                        its modern-day attractions.
                    </p>
                    <p className="mb-4">
                        Whether you are a resident or a visitor, we aim to provide you with
                        valuable insights and recommendations to make the most out of your
                        time in the city. Join us in exploring Philadelphia and discovering
                        all that it has to offer!
                    </p>
                </div>
            </div>
        </div>
        <BottomBar></BottomBar>
        </div>
    );
}