"use client";

import React, { ReactNode, useState } from "react";

import { GoToTop } from "../goToTop/goToTop";

import SizebarUser from "../sidebar/userSizebar";

interface IProps {
  children?: ReactNode;
  title: string;
}

const WrapperContent: React.FC<IProps> = ({
  children,
  title = "Dashboard",
}): JSX.Element => {
  const [openSideBar, setOpenSizeBar] = useState<boolean>(true);
  const [open, setOpen] = useState(true);

  return (
    <div id="wrapper-content" className=" min-h-screen w-full">
      <div>
        <div className="h-full relative overflow-auto font-family bg-gray-f3f6f9 flex">
          <div className="relative z-10">
            <SizebarUser
              openSideBar={openSideBar}
              setOpenSideBar={setOpenSizeBar}
              title={title}
            />
          </div>
          <div
            className={` min-h-screen ${
              openSideBar ? "ml-[300px] w-[calc(100%-300px)]" : "w-full"
            } `}
          >
            {children}
            <GoToTop />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WrapperContent;
