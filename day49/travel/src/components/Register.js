"use client";
import { Button, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });
  const router = useRouter();
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
        `https://api-social-psi.vercel.app/api/v1/auth/register `,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Signup success!");
        router.push("/signin");
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
      <h3 className="text-[2.5rem] mb-2 font-semibold">Register</h3>
      <form
        action=""
        className="w-[500px] mx-auto flex flex-col gap-[1rem]"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          name="name"
          label="Name"
          placeholder="Enter your name"
          variant="bordered"
          isRequired
          onChange={handleChange}
        />
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
          radius="sm"
          size="lg"
          type="submit"
          className="w-full h-12"
          color="danger"
        >
          Sign Up
        </Button>
        <p className="text-center">
          You have account?{" "}
          <Link
            href={"/signin"}
            className="underline decoration-[1.5] text-danger"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
