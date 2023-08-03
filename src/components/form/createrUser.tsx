import { useEffect, useState } from "react";

import { useFormik } from "formik";

import WrappedDarwerUserUserCreateEditDelete from "../Wrapped/darwerUserCreateEditDelete";
import { ErrorLogin } from "../notification/ErrorsLogin";
import { Input } from "../inputs/Input";
import { InputCheck } from "../inputs/InputCheck";
import { Button } from "@mui/material";
import { createUser } from "@/api/User/createUser";
import { createNewUserSchema } from "../yup/createNewUserSchema";

interface IProps {
  setLoadApi?: any;
  loadApi?: boolean;
  title?: string;
  openCreateNew?: boolean;
  setOpenCreateNew?: any;
  data?: any;
  buttonSave?: string;
}

const FromCreateNewUser: React.FC<IProps> = ({
  loadApi,
  setLoadApi,
  setOpenCreateNew,
  openCreateNew,
  title = "Create new",
  buttonSave = "Create",
  data = {
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    role: ["user"],
  },
}) => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(false);
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      setRole(data.role?.includes("admin"));
      setFieldValue("lastName", data.lastName);
      setFieldValue("firstName", data.firstName);
      setFieldValue("email", data.email);
    };
    getUsers();
  }, []);
  const {
    setFieldValue,
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: createNewUserSchema,
    onSubmit: async (values: any, actions: any) => {
      setLoading(true);
      actions.resetForm();
      setMessageError("");
      setRole(false);
      if (title === "Create new") {
        createUser({
          ...values,
        })
          .then(() => {
            console.log("ddungs");

            setLoadApi(!loadApi);
            setOpenCreateNew(false);
          })
          .catch(({ status, message }) => {
            setMessageError("Email already exist.");
          })
          .finally();
      }
      // if (title === "Edit") {
      //   updateOneById(data._id, {
      //     ...values,
      //     role: role ? [userRole.USER, userRole.ADMIN] : [userRole.USER],
      //   })
      //     .then(() => {
      //       setLoadApi(!loadApi);
      //       setOpenCreateNew(false);
      //     })
      //     .catch(({ status, message }) => {
      //       setMessageError("Email already exist.");
      //     })
      //     .finally();
      // }
    },
  });

  return (
    <WrappedDarwerUserUserCreateEditDelete
      open={openCreateNew}
      setOpen={setOpenCreateNew}
      setMessageError={setMessageError}
    >
      <div className="w-[500px] rounded-md ">
        <h1 className="px-[22.75px] border-b-[1px] border-b-black-7e8299 py-[19.5px] text-black-181c32 font-medium text-[17.55px]">
          {title} user
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="p-[22.75px]">
            {messageError !== "" && (
              <ErrorLogin classCSS="" messageError={messageError} />
            )}

            <div className="flex  justify-between   items-center mt-[9.75px]">
              <label className="text-[13px]  text-black-3f4254 ">Email:</label>

              <div className="w-[347px]">
                <Input
                  classCSS="py-[8.45px] px-[19.5px] h-[38.38px] text-[13px] "
                  id="email"
                  error={errors.email}
                  touched={touched.email}
                  errorTitle={errors.email}
                  type="email"
                  value={values.email}
                  placeholder="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex  justify-between items-center mt-[9.75px]">
              <label className="text-[13px] text-black-3f4254 ">
                First Name:
              </label>
              <div className="w-[347px]">
                <Input
                  classCSS="py-[8.45px] px-[19.5px] h-[38.38px] text-[13px] "
                  id="firstName"
                  error={errors.firstName}
                  onBlur={handleBlur}
                  touched={touched.firstName}
                  errorTitle={errors.firstName}
                  value={values.firstName}
                  placeholder="Firt Name"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-between items-center  mt-[9.75px]">
              <label className="text-[13px] text-black-3f4254 ">
                Last Name:
              </label>
              <div className="w-[347px]">
                <Input
                  classCSS="py-[8.45px] px-[19.5px] h-[38.38px] text-[13px] "
                  id="lastName"
                  error={errors.lastName}
                  onBlur={handleBlur}
                  touched={touched.lastName}
                  errorTitle={errors.lastName}
                  value={values.lastName}
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex  justify-between  items-center  mt-[9.75px]">
              <label className="text-[13px]  text-black-3f4254 ">
                New Password:
              </label>

              <div className="w-[347px]">
                <Input
                  classCSS="py-[8.45px] px-[19.5px] h-[38.38px] text-[13px] "
                  id="password"
                  error={errors.password}
                  touched={touched.password}
                  errorTitle={errors.password}
                  type="password"
                  value={values.password}
                  placeholder="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex  justify-between  items-center  mt-[9.75px] ">
              <label className="text-[13px]  text-black-3f4254 ">
                Confirm Password:
              </label>
              <div className="w-[347px]">
                <Input
                  classCSS="py-[8.45px] px-[19.5px] h-[38.38px] text-[13px]  "
                  id="confirmPassword"
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  errorTitle={errors.confirmPassword}
                  value={values.confirmPassword}
                  type="password"
                  placeholder="Confirm Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center px-[19.5px] pb-[19.5px]">
            <Button variant="outlined" type="submit" color="success">
              Create
            </Button>
            <Button
              color="error"
              type="reset"
              onClick={() => {
                setOpenCreateNew(false);
                setMessageError("");
              }}
              className="ml-[10px]"
            >
              cancel
            </Button>
          </div>
        </form>
      </div>
    </WrappedDarwerUserUserCreateEditDelete>
  );
};

export default FromCreateNewUser;
