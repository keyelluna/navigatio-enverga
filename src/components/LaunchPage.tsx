import { useState, useEffect } from "react";
import imgImage1 from "figma:asset/e30c10d7f9b16dd75f0275ed8191330fefa3bd8d.png";

interface LaunchPageProps {
  onComplete: () => void;
}

export default function LaunchPage({ onComplete }: LaunchPageProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-[#310100] to-[#780302] overflow-hidden flex items-center justify-center">
      {/* Container for logo and button, centered vertically and horizontally */}
      <div className="flex flex-col items-center">
        {/* LOGO */}
        <div className="relative size-[180px] sm:size-[220px] md:size-[260px] z-10">
          <img
            src={imgImage1}
            alt="University Logo"
            className="w-full h-full object-contain"
          />
          {/* BUTTON */}
          {showButton && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-20 animate-in fade-in duration-500">
              <button
                onClick={onComplete}
                className="px-8 py-3 bg-white rounded-[25px] shadow-md hover:scale-105 transition-transform"
              >
                <p className="font-lilita text-[#780302] text-[20px]">
                  Continue
                </p>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FIXED WHITE DIAGONAL STRIPE */}
      <div
        className="absolute bg-white z-0"
        style={{
          width: "200%",
          height: "60%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-24deg)",
        }}
      />
    </div>
  );
}