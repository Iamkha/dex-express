"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import jwt from "jwt-decode";
import { useFormik } from "formik";

// import { loginSchema } from "@/components/yup/loginSchema";
import { Input } from "@/components/inputs/Input";
import { ErrorLogin } from "@/components/notification/ErrorsLogin";
import { loginSchema } from "@/components/yup/loginSchema";
import { ITokenData, signIn } from "@/api/User/login";
import LoadingButton from "@mui/lab/LoadingButton";
import { setCookie } from "@/components/cookies";

const FormLogin = () => {
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");

  const router = useRouter();

  const { values, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values: any, actions: any) => {
      setLoading(true);
      await signIn(values.email, values.password)
        .then(({ data }: any) => {
          router.push("/users");
          setCookie("accessToken", data.token);
          if (data.token) {
            const { id, email, firstName, lastName, role } = jwt(
              data.token
            ) as ITokenData;
            setCookie("emailUser", email);
            setCookie("user", `${email}/${firstName}/${lastName}/${role}`);
          }
          setMessageError("");
          setLoading(false);
          actions.resetForm();
        })
        .catch((e: any) => {
          actions.resetForm();
          setMessageError("The login detail is incorrect");
          setLoading(false);
        });
    },
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center bg">
      <form onSubmit={handleSubmit} className="w-[400px] h-auto bg-white ">
        <h1 className=" w-full mb-[6px] leading-[31.19px] text-[26px] text-black-3f4254 text-center">
          Login Account
        </h1>
        <p className=" w-full  text-center text-gray-b5b5c3 mb-[65px] text-[13px] ">
          Enter your username and password
        </p>
        {messageError !== "" && <ErrorLogin messageError={messageError} />}
        <div className="mb-[23px]">
          <Input
            id="email"
            error={errors.email}
            touched={touched.email}
            errorTitle={errors.email}
            value={values.email}
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <Input
          id="password"
          type="password"
          error={errors.password}
          touched={touched.password}
          errorTitle={errors.password}
          value={values.password}
          placeholder="Password"
          onChange={handleChange}
        />

        <div className="flex mb-[22.75px] h-[67px] w-full justify-between items-center mt-[22.75px]">
          <a href="/auth/forgot-password">
            <span className="my-[9.75px] mr-[6.5px] text-[13px] text-gray-7e8299 hover:text-green-1bc5bd cursor-pointer">
              Forgot Password
            </span>
          </a>
          <LoadingButton
            variant="outlined"
            type="submit"
            loading={loading}
            color="success"
          >
            Login
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
