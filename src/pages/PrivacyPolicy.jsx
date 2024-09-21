/** @format */

import config from "../../config.json";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import BottomBar from "../components/BottomBar.jsx";

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const rootURL = config.serverRootURL;

  return (
    <div className="w-screen h-screen bg-[--light-taupe-grey] overflow-scroll flex items-center justify-center mt-24">
      <div className="rounded-md bg-[--champagne] p-20  w-auto relative font-Lato">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="mb-4">
            Your privacy is important to us. It is Chilladelphia's policy to respect
            your privacy regarding any information we may collect from you
            across our website. If you have any questions or concerns about this
            privacy notice or our practices with regard to your personal
            information, please don't hesitate to contact us.
          </p>
          <h2 className="text-2xl font-semibold mb-4">
            Information We Collect
          </h2>
          <p className="mb-4">
            We only collect information about you if we have a reason to do so.
            For example, to provide our services, to communicate with you, or to
            improve our services. The personal information we collect may
            include the following:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Names</li>
            <li>Email addresses</li>
            <li>Contact or authentication data</li>
          </ul>
          <h2 className="text-2xl font-semibold mb-4">
            How We Use Information
          </h2>
          <p className="mb-4">
            We use the information we collect in various ways, including to:
          </p>
          <ul className="list-disc list-inside mb-2">
            <li>Provide, operate, and maintain our services </li>
            <li>To facilitate account creation and the logon process</li>
            <li>To send administrative information to you</li>
            <li>
              To enforce our terms, conditions, and policies for business
              purposes, to comply with legal and regulatory requirements, or in
              connection with our contract
            </li>
          </ul>
        </div>
      </div>
      <NavBar></NavBar>
      <BottomBar></BottomBar>
    </div>
  );
}