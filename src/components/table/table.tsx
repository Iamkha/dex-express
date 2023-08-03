import React, { ReactNode, useEffect, useState } from "react";

import "../styles/style.scss";

import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
type TSortOrder = "asc" | "desc";

interface IHeadRow {
  text: string;
  colSpan?: number;
  width?: string | number;
  hasHeader?: boolean;
}

interface ITableHeader {
  order: TSortOrder;
  orderBy: number;
  onRequestSort: (propertyIndex: number) => void;
  headRowLabels: IHeadRow[];
}

const EnhancedTableHead: React.FC<ITableHeader> = ({
  order,
  orderBy,
  onRequestSort,
  headRowLabels,
}) => {
  return (
    <TableHead>
      <TableRow>
        {headRowLabels.map((label: any, index: number) => (
          <TableCell
            key={index}
            sortDirection={orderBy === index ? order : false}
            width={label.width}
            colSpan={label.colSpan}
            className="text-nowrap !pl-[16px] !pr-[24px] !py-[16px] !text-[13px]  font-family"
            sx={{
              width: `${label.width} !important`,
              whiteSpace: "break-spaces",
              border: "1px solid #e0e0e0",
            }}
          >
            {label.hasHeader ? (
              <TableSortLabel
                className="!text-[13px]  font-family"
                active={orderBy === index}
                direction={order}
                onClick={() => onRequestSort(index)}
              >
                {label.text}
              </TableSortLabel>
            ) : (
              label.text
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

interface ITableProps {
  headRowLabels: IHeadRow[];
  rows: any[];
  sortBy?: (order: TSortOrder, orderBy: number) => void;
  className?: string;
  isLoading?: boolean;
  fallbackLoading?: ReactNode;
}

const EnhancedTable: React.FC<ITableProps> = ({
  headRowLabels,
  rows,
  sortBy,
  className = "",
  isLoading = false,
  fallbackLoading,
}) => {
  const [order, setOrder] = useState<TSortOrder>("asc");
  const [orderBy, setOrderBy] = useState<number>(-1);

  const handleRequestSort = (propertyIndex: number) => {
    const isDesc = orderBy === propertyIndex && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(propertyIndex);
  };

  useEffect(() => {
    sortBy && sortBy(order, orderBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, orderBy]);

  return (
    <TableContainer>
      <div style={{ overflowX: "auto" }}>
        <Table
          size="small"
          className={`table-striped bg-table-light   ${className} `}
          sx={{
            border: rows?.length ? "1px solid #e0e0e0" : "none",
          }}
        >
          {!!headRowLabels.length && (
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headRowLabels={headRowLabels}
            />
          )}
          <TableBody>
            {isLoading && (
              <TableRow
                hover
                tabIndex={-1}
                className="bg-transparent !text-[13px] "
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent ",
                  },
                }}
              >
                <TableCell
                  colSpan={headRowLabels.length}
                  align="center"
                  sx={{
                    border: "1px solid #e0e0e0",
                    padding: "24px 0",
                  }}
                  className="!text-[13px]  font-family"
                >
                  {fallbackLoading || (
                    <CircularProgress className="!text-primary  font-family" />
                  )}
                </TableCell>
              </TableRow>
            )}

            {!!rows?.length && !isLoading
              ? rows.map((row: any, rowIndex: number) => (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={rowIndex}
                    className="odd:bg-table-dark !text-[13px] "
                  >
                    {row.map((item: any, fieldIndex: number) => (
                      <TableCell
                        className="!text-[13px]  font-family"
                        key={fieldIndex}
                        sx={{
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : !isLoading && (
                  <TableRow
                    hover
                    tabIndex={-1}
                    className="bg-white  "
                    sx={{
                      "&:hover": {
                        backgroundColor: "white !important",
                      },
                    }}
                  >
                    <TableCell
                      colSpan={headRowLabels.length}
                      align="center"
                      className="border border-solid border-border-color  font-family"
                      sx={{
                        border: "1px solid #e0e0e0",
                        padding: "24px 0",
                      }}
                    >
                      <p className="font-medium min-w-[99px] text-[13px]  font-family">
                        No data to display
                      </p>
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
};

export default EnhancedTable;
