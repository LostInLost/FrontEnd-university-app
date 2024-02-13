"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Input,
} from "@nextui-org/react";
import React, { BaseSyntheticEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function FormLogin() {
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      user_email: formData.get("uaer_email") ?? "",
      password: formData.get("password") ?? "",
      redirect: false,
    });

    if (!res?.ok || res?.status !== 200)
      return setErrMsg("Username or password is wrong!");

    return router.push("dashboard");
  };
  return (
    <Card className="p-3">
      <CardHeader>
        <h1 className="text-lg font-bold">Welcome to University App</h1>
      </CardHeader>
      <CardBody>
        {errMsg && (
          <Chip color={"danger"} size={"lg"} className="my-3">
            {errMsg}
          </Chip>
        )}
        <form
          action=""
          method="post"
          className="flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          <Input type="text" name="uaer_email" label={"Username or Email"} />
          <Input type="password" name="password" label={"Password"} />
          <Button type="submit" color={"primary"}>
            Sign In
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
