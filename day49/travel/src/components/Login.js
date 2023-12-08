"use client";
import { Button, Input } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api-social-psi.vercel.app/api/v1/auth/login `,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      console.log("data", data);
      console.log("response", response);
      if (response.ok) {
        signIn("credentials", {
          user: JSON.stringify(data),
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const session = useSession();
  if (session.status === "authenticated") {
    redirect("/");
  }
  return (
    <div className="flex flex-col h-[100vh] bg-white !z-[199] relative items-center justify-center">
      <h3 className="text-[2.5rem] mb-2 font-semibold">Log In</h3>
      <form
        action=""
        className="w-[500px] mx-auto flex flex-col gap-[1rem]"
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          variant="bordered"
          isRequired
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          variant="bordered"
          isRequired
          onChange={handleChange}
        />
        <Button
          color="danger"
          radius="sm"
          size="lg"
          type="submit"
          className="w-full h-12"
        >
          Sign In
        </Button>
        <p className="text-center font-[500]"> OR </p>
        <div>
          <Button
            size="lg"
            color="default"
            variant="bordered"
            className="flex items-center w-full"
            radius="sm"
            onClick={() => {
              signIn("github");
            }}
          >
            <FaGithub fontSize={"1.4rem"} />
            Github
          </Button>
        </div>
        <div>
          <Button
            size="lg"
            color="default"
            variant="bordered"
            className="flex items-center w-full"
            radius="sm"
            onClick={() => {
              signIn("google");
            }}
          >
            <FcGoogle fontSize={"1.4rem"} />
            Google
          </Button>
        </div>
        <p className="text-center">
          Don't you have account?{" "}
          <Link
            className="underline decoration-[1.5] text-danger"
            href={"/signup"}
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
