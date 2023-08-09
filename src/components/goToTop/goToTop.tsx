"use client";
import React, { useEffect, useState } from "react";

import { TbArrowBigUpLinesFilled } from "react-icons/tb";

import "../styles/style.scss";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {}

export const GoToTop: React.FC<IProps> = ({}) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleGoToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const listenToScroll = () => {
    const heightToHidden = 100;
    const winScroll =
      document?.body?.scrollTop || document?.documentElement?.scrollTop;

    if (winScroll > heightToHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);
  return (
    <div className="">
      {isVisible && (
        <button
          onClick={handleGoToTop}
          className="bg-green-1bc5bd fixed flex wrapper-go-to-top justify-center opacity-30 hover:opacity-100 items-center text-white rounded-[5px]   bottom-[40px] w-[36px] right-[20px]  h-[36px]"
        >
          <TbArrowBigUpLinesFilled />
        </button>
      )}
    </div>
  );
};
