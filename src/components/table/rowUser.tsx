import React, { useEffect, useMemo, useState } from "react";

import { getCookie } from "../cookies";

import Tippy from "@tippyjs/react";
import { SlPencil } from "react-icons/sl";
import { MdDeleteForever } from "react-icons/md";

import FromCreateNewUser from "../form/createrUser";
import FromDeleteUser from "../form/deleteUser";

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
  const [roleUser, setRoleUser] = useState<any>([]);
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    const user = getCookie("user") || "";
    const userGmail = getCookie("emailUser") || "";
    console.log(user?.split("/")?.[3] || "", "kha");

    const superadmin = user?.split("/")?.[3]?.split(",")?.[0] || "";
    const admin = user?.split("/")?.[3]?.split(",")?.[1] || "";
    const User = user?.split("/")?.[3]?.split(",")?.[2] || "";
    setEmail(userGmail);
    setRoleUser([superadmin, admin, User]);
  }, []);

  const isEdit = useMemo(() => {
    if (
      data.email === email ||
      (roleUser?.includes("superadmin") && !data.role.includes("superadmin"))
    ) {
      return true;
    }

    if (
      data.email === email ||
      (roleUser?.includes("admin") && data.role.includes("user"))
    ) {
      return true;
    }
    return false;
  }, [data, roleUser]);

  const isDeletes = useMemo(() => {
    if (
      roleUser?.includes("superadmin") &&
      !data.role.includes("superadmin") &&
      data.email !== email
    ) {
      return true;
    }
    if (
      roleUser?.includes("admin") &&
      data.role.includes("user") &&
      data.email !== email
    ) {
      return true;
    }
    return false;
  }, [data, roleUser]);

  return (
    <div className="flex ">
      {isEdit && (
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
          {openEdit && (
            <FromCreateNewUser
              setLoadApi={setLoadApi}
              loadApi={loadApi}
              data={data}
              buttonSave="Save changes"
              openCreateNew={openEdit}
              setOpenCreateNew={setOpenEdit}
              title="Edit"
            />
          )}
        </div>
      )}

      {isDeletes && (
        <>
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
          <FromDeleteUser
            setLoadApi={setLoadApi}
            loadApi={loadApi}
            data={data}
            setOpenDelete={setOpenDelete}
            openDelete={openDelete}
          />
        </>
      )}
    </div>
  );
};

export default TableRowUser;
