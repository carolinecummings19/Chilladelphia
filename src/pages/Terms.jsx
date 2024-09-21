/** @format */

import config from "../../config.json";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import BottomBar from "../components/BottomBar.jsx";

export default function Terms() {
  const navigate = useNavigate();
  const rootURL = config.serverRootURL;

  return (
    <div className="w-screen h-screen bg-[--light-taupe-grey] overflow-scroll flex items-center justify-center ">
      <div className="rounded-md bg-[--champagne] p-20 space-y-2 w-auto font-Lato">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <p className="mb-4">
            Welcome to Chilladelphia. These Terms of Service govern your use of our
            website operated by Chilladelphia. Our Privacy Policy also governs your
            use of our Service and explains how we collect, safeguard, and
            disclose information that results from your use of our web pages.
            Your agreement with us includes these Terms and our Privacy Policy.
            You acknowledge that you have read and understood Agreements and
            agree to be bound by them. If you do not agree with Agreements, then
            you may not use the Service, but please let us know by contacting us
            so we can try to find a solution. These Terms apply to all visitors,
            users, and others who wish to access or use Service.
          </p>
        </div>
      </div>
      <NavBar></NavBar>
      <BottomBar></BottomBar>
    </div>
  );
}