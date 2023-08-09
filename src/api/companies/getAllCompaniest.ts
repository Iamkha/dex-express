import { request } from "../request";

export const getAllCompanies = ({
  page,
  limit,
}: {
  limit: number;
  page: number;
}) => {
  const url = `companies?page=${page}&limit=${limit}`;
  return request.get(url);
};
