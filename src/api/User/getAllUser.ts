import { request } from "../request";

export const getAllUser = ({
  page,
  limit,
}: {
  limit: number;
  page: number;
}) => {
  const url = `user/all-user?page=${page}&limit=${limit}`;
  return request.get(url);
};
