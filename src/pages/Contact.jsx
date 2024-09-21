/** @format */

import config from "../../config.json";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import BottomBar from "../components/BottomBar.jsx";

export default function Contact() {
  const navigate = useNavigate();
  const rootURL = config.serverRootURL;

  return (
    <div>
      <div className="w-screen h-screen bg-[--light-taupe-grey] overflow-scroll flex flex-col items-center justify-center font-Lato">
        <div>
          <form className="rounded-md bg-[--champagne] p-16 space-y-4 w-full">
            <h1 className="font-bold flex w-full justify-center text-4xl mb-10 text-[--black] font-Lato">
              Contact Us
            </h1>
            <div className="flex space-x-4 items-center justify-between px-2 w-full">
              <label className="font-semibold" htmlFor="name">
                Name
              </label>
              <input
                className="outline-none w-4/5 bg-white rounded-md border border-slate-100 py-3 px-6"
                id="name"
                type="text"
                placeholder="Your name"
              />
            </div>
            <div className="flex space-x-4 items-center justify-between px-2 w-full">
              <label className="font-semibold" htmlFor="email">
                Email
              </label>
              <input
                className="outline-none w-4/5 bg-white rounded-md border border-slate-100 py-3 px-6"
                id="email"
                type="email"
                placeholder="Your email"
              />
            </div>
            <div className="flex space-x-4 items-center justify-between px-2 w-full">
              <label className="font-semibold" htmlFor="message">
                Message
              </label>
              <textarea
                className="outline-none w-full bg-white rounded-md border border-slate-100 py-3 px-6"
                id="message"
                placeholder="Your message"
                rows="4"
              ></textarea>
            </div>
            <div className="flex items-center justify-center py-4">
              <button
                className="px-6 py-3 w-1/2 rounded-md bg-[--cambridge-blue] hover:bg-[--khaki] outline-none w-4/5font-bold text-white"
                type="button"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
      <NavBar></NavBar>
      <BottomBar></BottomBar>
    </div>
  );
}
