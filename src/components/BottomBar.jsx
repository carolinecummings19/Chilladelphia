import React from 'react';
import polar from '../assets/polar_bear.png';

const BottomBar = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bottom-0 w-full bg-gray-100 text-center py-2 border-t border-gray-300">
      <div className="flex flex-row items-center justify-center max-w-7xl mx-auto px-4">
        <img src={polar} alt="polar bear" className="h-10 ml-4 p-1" />
        <p className="text-gray-700 font-bold">&copy; {currentYear} Chilladelphia. All rights reserved.</p>
        <div className="border-l border-gray-500 h-6 mx-4"></div>
        <div>
          <a href="/privacy-policy" className="mx-2 text-blue-500 hover:underline">Privacy Policy</a>
          <a href="/terms" className="mx-2 text-blue-500 hover:underline">Terms of Service</a>
          <a href="/contact" className="mx-2 text-blue-500 hover:underline">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default BottomBar;