import { useState } from "react";

import { useFormik } from "formik";
import WrappedDarwerUserUserCreateEditDelete from "../Wrapped/darwerUserCreateEditDelete";
import { Button } from "@mui/material";
import { deleteOneById } from "@/api/User/deleteUser";

interface IProps {
  openDelete?: boolean;
  setOpenDelete?: any;
  data: any;
  title?: string;
  security?: boolean;
  setLoadApi?: any;
  loadApi?: boolean;
}

const FromDeleteUser: React.FC<IProps> = ({
  setLoadApi,
  loadApi,
  setOpenDelete,
  openDelete,
  data,
  security = false,
  title = "user",
}) => {
  const [loading, setLoading] = useState(false);

  const { handleSubmit } = useFormik({
    initialValues: {},
    onSubmit: async (values: any, actions: any) => {
      setLoading(true);
      actions.resetForm();
      if (title === "user") {
        deleteOneById(data._id)
          .then(() => {
            setLoadApi(!loadApi);
            setOpenDelete(false);
          })
          .catch()
          .finally();
      }
    },
  });

  return (
    <WrappedDarwerUserUserCreateEditDelete
      open={openDelete}
      setOpen={setOpenDelete}
    >
      <div className="w-[500px] rounded-md ">
        <h1 className="px-[22.75px]   py-[19.5px] text-black-181c32 font-medium text-[17.55px]">
          {security ? (
            <span> {title}</span>
          ) : (
            <span>
              Delete {title.charAt(0).toUpperCase()}
              {title.slice(1, title.length)}
            </span>
          )}
        </h1>
        <p className="px-[22.75px] pb-[19.5px] text-black-3f4254">
          {security ? (
            <span>
              Are you sure you want to regenerate the security code of this
              bucket?
            </span>
          ) : (
            <span>
              Are you sure you want to permanantly delete this {title}?
            </span>
          )}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-end items-center px-[19.5px] pb-[19.5px]">
            <Button variant="outlined" type="submit" color="success">
              Yes
            </Button>
            <Button
              color="error"
              type="reset"
              onClick={() => {
                setOpenDelete(false);
              }}
              className="ml-[10px]"
            >
              No
            </Button>
          </div>
        </form>
      </div>
    </WrappedDarwerUserUserCreateEditDelete>
  );
};

export default FromDeleteUser;
