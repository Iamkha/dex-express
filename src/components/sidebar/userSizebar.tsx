"use client";

import React, { useEffect, useState } from "react";
import "../styles/style.scss";

import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import Tooltip from "@mui/joy/Tooltip";
import Link from "next/link";

import Logo from "../Images/LogoRM.png";
// import Userprofile from "./userprofile";
import { getCookie } from "../cookies";
// import { getSmRequest } from "@/api/smRequest/smRequest";
import Image from "next/image";
import { dataSizebarUser } from "@/constants/sizebarUser";

interface IProps {
  title?: string;
  openSideBar?: boolean;
  setOpenSideBar?: any;
}

const Sidebar: React.FC<IProps> = ({ title, openSideBar, setOpenSideBar }) => {
  const [shortName, setShortName] = useState<string>("");
  const [openProfile, setOpenProfie] = useState(false);

  const [messageError, setMessageError] = useState<string>("");
  const [user, setUser] = useState({
    lastName: "",
    firstName: "",
  });

  useEffect(() => {
    const user = getCookie("user") || "";
    const firstCharacterFirstName = user?.split("/")?.[1]?.charAt(0) || "";
    const firstCharacterLastName = user?.split("/")?.[2]?.charAt(0) || "";

    const shortName = `${firstCharacterFirstName}${firstCharacterLastName}`;
    setShortName(shortName);
  }, []);

  return (
    <div className="absolute h-full w-full ">
      <div
        className={`${
          openSideBar === true ? "w-[300px]" : "w-[0.01px]"
        }  transition-all duration-300 ease-in-out top-0  fixed  h-full py-[7px] bg-white`}
      >
        {openSideBar && (
          <div className="">
            <div className="w-full  flex justify-center">
              <Link
                href="/"
                className=" w-auto cursor-pointer items-center mb-[29px]  h-[30px] mt-[39px]"
              >
                <Image
                  alt="logo"
                  width={30}
                  height={30}
                  src={Logo.src}
                  className="max-h-[30px]"
                />
              </Link>
            </div>
            <div className="w-[full] flex justify-center items-center">
              <Tooltip
                size="lg"
                title={
                  <p className="!text-black-3f4254 p-[5px] !font-medium !text-[13px]">
                    User Profile
                  </p>
                }
                variant="outlined"
                arrow
                placement="right"
              >
                <button
                  onClick={() => setOpenProfie(true)}
                  className="w-[60px] h-[60px] rounded-full bg-black-5e6278 flex justify-center items-center mb-[5px]"
                >
                  <span className="text-green-1bc5bd text-[20px] font-semibold">
                    {shortName}
                  </span>
                </button>
              </Tooltip>
            </div>
            <ul className="py-[16.25px] px-[22.75px]">
              {dataSizebarUser?.map((data: any) => (
                <Link
                  href={data.link}
                  download={"dasda"}
                  className={`flex  leading-[26px] hover:text-green-600 items-center py-[9px] px-[25px] text-[13px] ${
                    title === data.title
                      ? "bg-gray-f3f6f9 rounded-[5px] border-l-2 border-green-600 !text-green-600"
                      : "text-black-3f4254 link-sidebar  border-transparent border-l-2"
                  } `}
                >
                  <span className="w-[35px]">
                    <data.icon
                      className={`${
                        data.title === "Entity Management"
                          ? "text-[15px]"
                          : "text-[20px]  "
                      } 
                  ${
                    title === data.title
                      ? " !text-green-600"
                      : "text-gray-b5b5c3 icons-sidebar"
                  } 
                  `}
                    />
                  </span>
                  {data.title}
                </Link>
              ))}
            </ul>
          </div>
        )}
        <Tooltip
          size="lg"
          title={
            <p className="!text-black-3f4254 !font-medium !text-[13px] p-[5px]">
              Toggle Aside
            </p>
          }
          variant="outlined"
          arrow
          placement="right"
        >
          <button
            onClick={() => setOpenSideBar(!openSideBar)}
            className="w-[36px] flex  justify-center  items-center absolute top-[80px] right-[-18px] h-[36px] bg-slate-500 text-white rounded-[5px] "
          >
            {openSideBar ? (
              <MdOutlineArrowBackIosNew />
            ) : (
              <MdOutlineArrowForwardIos />
            )}
          </button>
        </Tooltip>
        {/* <Userprofile open={openProfile} setOpen={setOpenProfie} /> */}
      </div>
    </div>
  );
};

export default Sidebar;
