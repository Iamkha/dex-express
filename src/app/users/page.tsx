"use client";

import React, { useEffect, useState } from "react";
import { getAllUser } from "@/api/User/getAllUser";
import WrapperContent from "@/components/Wrapped/content";
import RowsPerPage from "@/components/pagination/rowsPerPage";
import TableRowUser from "@/components/table/rowUser";
import EnhancedTable from "@/components/table/table";
import { Pagination } from "@mui/material";
import Button from "@mui/material/Button";
import FromCreateNewUser from "@/components/form/createrUser";

type Props = {};

const User = (props: Props) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<any>([]);
  const [lastPage, setLastPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [loadApi, setLoadApi] = useState(false);
  const [openCreateNew, setOpenCreateNew] = useState(false);

  console.log(limit, page, "page");

  const fetchCurPage = async () => {
    setLoading(true);
    await getAllUser({ page, limit })
      .then(({ data }) => {
        setUsers(data.user);
        setLastPage(data.pagination.lastPage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchCurPage();
  }, [page, limit, loadApi]);
  console.log(users);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <WrapperContent title="User">
      <div className="px-[35px] ">
        <p className="my-[6px] py-[25px] mr-[9px] text-[22.65px] text-black-181c32 font-medium">
          User
        </p>
        <div className="w-full flex justify-end">
          <Button
            color="success"
            onClick={() => setOpenCreateNew(true)}
            variant="outlined"
          >
            New User
          </Button>
          <FromCreateNewUser
            setLoadApi={setLoadApi}
            loadApi={loadApi}
            data={users}
            openCreateNew={openCreateNew}
            setOpenCreateNew={setOpenCreateNew}
          />
        </div>
        <div className="pt-[25px]">
          <EnhancedTable
            isLoading={loading}
            headRowLabels={[
              { text: "Email" },
              { text: "first_name" },
              { text: "last_name" },
              { text: "Action" },
            ]}
            rows={users?.map((item: any, index: number) => [
              item.email,
              item.firstName,
              item.lastName,
              <div className="d-flex justify-content-start">
                <TableRowUser
                  setLoadApi={setLoadApi}
                  loadApi={loadApi}
                  index={index}
                  data={item}
                />
              </div>,
            ])}
          />
          <div className="flex w-full mt-[25px] justify-end items-center">
            <RowsPerPage rowsPerPage={limit} setRowsPerPage={setLimit} />
            <Pagination
              showFirstButton
              showLastButton
              page={page || 1}
              onChange={handleChange}
              count={lastPage}
              className=""
              color="standard"
              sx={{
                "& .Mui-selected": {
                  color: "white",
                  backgroundColor: "#16a34a !important",
                },
              }}
            />
          </div>
        </div>
      </div>
    </WrapperContent>
  );
};

export default User;
