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
                        Welcome to Chilladelphia! Philly had record heat this summer, and we're trying to fix that.
                    </p>
                    <p className="mb-4">
                        We are a group of 4 juniors interested in sustainability studying Computer and 
                        Information Science at the University of Pennsylvania. 
                    </p>
                    <p className="mb-4">
                        Whether you are a resident or a visitor, we aim to provide you with
                        valuable insights and recommendations to help your communities feel their best. 
                        Join us in our mission to mitigate climate change and impact our communities!
                    </p>
                </div>
            </div>
        </div>
        <BottomBar></BottomBar>
        </div>
    );
}