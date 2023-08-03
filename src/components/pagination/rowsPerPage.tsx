"use client";

import React, { useEffect, useMemo, useState } from "react";

import MenuList from "@mui/joy/MenuList";
import MenuItem from "@mui/joy/MenuItem";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { AiOutlineDown } from "react-icons/ai";
import { RowPage, RowPageDashboard } from "@/constants/rowPage";

interface IProps {
  paging?: number;
  setPaging?: any;
  dataLenght?: number;
  rowsPerPage?: number;
  setRowsPerPage?: any;
  dashboard?: boolean;
}

const RowsPerPage: React.FC<IProps> = ({
  rowsPerPage = 5,
  setRowsPerPage,
  paging = 1,
  setPaging,
  dashboard = false,
  dataLenght = 0,
}) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);

  const pagingLenght = Math.ceil(Math.max(dataLenght, 1) / rowsPerPage);
  useEffect(() => {
    if (pagingLenght < paging && check) {
      setPaging(pagingLenght);
    }
  }, [paging, pagingLenght]);

  return (
    <div className="min-w-[174px] w-[174px] h-[34px] relative">
      <div className="flex justify-center items-center">
        <p className="text-[13px] text-black-3f4254 font-normal">
          Rows per page:
        </p>
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="text-[14px] ml-[6.5px]   flex items-center outline-none rounded-[5px] border !border-solid-[1px] !border-gray-e4e6ef text-black-3f4254 cursor-pointer bg-slate-100 py-[5.725px] px-[7.46px]"
        >
          {rowsPerPage} <AiOutlineDown className="ml-[6.5px] text-[12px]" />
        </button>
      </div>

      {openMenu && (
        <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
          <MenuList
            className="absolute   bottom-[35px] w-[70px] right-4 z-10"
            variant="outlined"
            onKeyDown={() => setOpenMenu(false)}
            sx={{ boxShadow: "md" }}
          >
            {(dashboard ? RowPageDashboard : RowPage)?.map((data) => (
              <MenuItem
                key={data.number}
                className="focus:!bg-green-600 "
                onClick={() => {
                  setCheck(true),
                    setOpenMenu(false),
                    setRowsPerPage(data.number);
                }}
              >
                {data.number}
              </MenuItem>
            ))}
          </MenuList>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default RowsPerPage;
