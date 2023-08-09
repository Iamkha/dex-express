"use client";
import EnhancedTable from "../table/table";

export function renderTable(data: any, bgTableDark: boolean, loading: boolean) {
  function isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  data = Array.isArray(data) ? data : data;

  // Check if data is SF
  const initialArr = data?.some((el: any) =>
    Object.keys(el).some((ele) => ele === "Id")
  )
    ? ["View SF data"]
    : [];

  const headLabelsArr = data?.reduce((a: any, b: any) => {
    if (typeof b === "string") return a;
    const labels = Object.keys(b).filter(
      (el) => !a.includes(el) && b[el] !== null && b[el] !== undefined
    );
    return [...a, ...labels];
  }, initialArr);

  const headLabels = headLabelsArr?.map((el: any) => ({ text: el }));

  const tableRows = data?.map((item: any) =>
    typeof item === "string"
      ? [item]
      : headLabelsArr?.map((el: any) => {
          if (item[el] === null || item[el] === undefined || item[el] === "[]")
            return "";
          if (typeof item[el] !== "object" && el !== "body") {
            return item[el].toString();
          }
          if (typeof item[el] !== "object" && isJsonString(item[el])) {
            if (item[el] !== "" && typeof item[el] === "string") {
              return renderTable([JSON.parse(item[el])], true, loading);
            }
            return item[el].toString();
          }

          if (typeof item[el] === "object" && Array.isArray(item[el])) {
            return renderTable(item[el], false, loading);
          }
          if (
            typeof item[el] === "object" &&
            Array.isArray(item[el]) === false
          ) {
            return renderTable([item[el]], false, loading);
          }
          return item[el].toString();
        })
  );

  return (
    <EnhancedTable
      isLoading={loading}
      headRowLabels={headLabels}
      rows={tableRows}
      className={bgTableDark ? "!bg-table-dark" : ""}
    />
  );
}
