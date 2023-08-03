import React, { useEffect, useMemo, useState } from "react";

import { getCookie } from "../cookies";

import Tippy from "@tippyjs/react";
import { SlPencil } from "react-icons/sl";
import { MdDeleteForever } from "react-icons/md";

// import FromCreateNewUser from "../form/createNewUser";
// import FromDeleteUser from "../form/deleteUser";

import "tippy.js/dist/tippy.css";
interface IProps {
  setLoadApi?: any;
  loadApi?: boolean;
  data: any;
  index?: number;
}

const TableRowUser: React.FC<IProps> = ({ data, setLoadApi, loadApi }) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  // useEffect(() => {
  //   if (accessToken) {
  //     const { id, email, firstName, lastName, role } = jwt(
  //       accessToken
  //     ) as ITokenData;
  //     setcurrentUser({
  //       email,
  //       role,
  //     });
  //   }
  // }, []);

  // const isEdit = useMemo(() => {
  //   if (
  //     (currentUser.role.includes("admin") && !data.role.includes("admin")) ||
  //     data.email === currentUser.email
  //   ) {
  //     return true;
  //   }
  //   if (currentUser.role.includes("user")) {
  //     return false;
  //   }
  //   return false;
  // }, [data, currentUser]);

  // const isDeletes = useMemo(() => {
  //   if (
  //     (currentUser.role.includes("admin") && !data.role.includes("admin")) ||
  //     (data.email === currentUser.email && currentUser.role.includes("admin"))
  //   ) {
  //     return true;
  //   }
  //   if (currentUser.role.includes("user")) {
  //     return false;
  //   }
  //   return false;
  // }, [data, currentUser]);

  return (
    <div className="flex ">
      <div className=" leading-[24px] h-[24px] flex">
        <Tippy
          arrow={false}
          placement="bottom"
          content={<p className="text-[13px] px-[5px]">Edit</p>}
        >
          <button
            onClick={() => setOpenEdit(true)}
            className="cursor-pointer  leading-[24px] w-[36px] h-[26px] px-[6px]  mr-[6.5px] text-green-1bc5bd"
          >
            <SlPencil className="text-[24px] " />
          </button>
        </Tippy>
        {/* <FromCreateNewUser
              setLoadApi={setLoadApi}
              loadApi={loadApi}
              data={data}
              buttonSave="Save changes"
              openCreateNew={openEdit}
              setOpenCreateNew={setOpenEdit}
              title="Edit"
            /> */}
      </div>

      <div>
        <Tippy
          arrow={false}
          placement="bottom"
          content={
            <p className="text-[13px]  leading-[24px] px-[5px]">Delete</p>
          }
        >
          <button
            onClick={() => setOpenDelete(true)}
            className="cursor-pointer  w-[36px] h-[26px] px-[6px]  mr-[6.5px] text-red-f64e60"
          >
            <MdDeleteForever className="text-[30px] " />
          </button>
        </Tippy>
        {/* <FromDeleteUser
            setLoadApi={setLoadApi}
            loadApi={loadApi}
            data={data}
            setOpenDelete={setOpenDelete}
            openDelete={openDelete}
          /> */}
      </div>
    </div>
  );
};

export default TableRowUser;
