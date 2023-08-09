"use client";

import React, { useEffect, useState } from "react";
import WrapperContent from "@/components/Wrapped/content";
import RowsPerPage from "@/components/pagination/rowsPerPage";
import { Pagination } from "@mui/material";
import { getAllCompanies } from "@/api/companies/getAllCompaniest";
import { renderTable } from "@/components/renderTable/renderTable";

type Props = {};

const User = (props: Props) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [companies, setCompanies] = useState<any>([]);
  const [lastPage, setLastPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [loadApi, setLoadApi] = useState(false);

  const fetchCurPage = async () => {
    setLoading(true);
    await getAllCompanies({ page, limit })
      .then(({ data }) => {
        setCompanies(data.data);
        // setLastPage(data.pagination.lastPage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchCurPage();
  }, [page, limit, loadApi]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <WrapperContent title="Companies">
      <div className="px-[35px]  ">
        <p className="my-[6px] py-[25px] mr-[9px] text-[22.65px] text-black-181c32 font-medium">
          Companies
        </p>

        <div className="pt-[25px]">
          {renderTable(companies, false, loading)}
          <div className="flex w-full mt-[25px] justify-end items-center m-[35px]">
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
