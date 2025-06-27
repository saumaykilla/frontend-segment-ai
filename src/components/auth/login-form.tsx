"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faFileLines,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import {
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const SigninSchema =
  yup.object(
    {
      email:
        yup
          .string()
          .email(
            "Invalid email format"
          )
          .required(
            "Email is required"
          ),
      password:
        yup
          .string()
          .required(
            "Password is required"
          )
          .min(
            6,
            "Minimum 6 characters"
          )
          .matches(
            /[A-Z]/,
            "At least one uppercase letter"
          )
          .matches(
            /[0-9]/,
            "At least one number"
          )
          .matches(
            /[^a-zA-Z0-9]/,
            "At least one special character"
          ),
    }
  );

export function LoginForm({}: React.ComponentPropsWithoutRef<"div">) {
  const [
    error,
    setError,
  ] =
    useState<
      | string
      | null
    >(
      null
    );
  const [
    isLoading,
    setIsLoading,
  ] =
    useState(
      false
    );
  const router =
    useRouter();

  const {
    register,
    formState:
      {
        errors,
      },
    handleSubmit,
  } = useForm(
    {
      mode: "all",
      resolver:
        yupResolver(
          SigninSchema
        ),
    }
  );
  const handleLogin: SubmitHandler<
    yup.InferType<
      typeof SigninSchema
    >
  > = async (
    payload
  ) => {
    const supabase =
      createClient();
    setIsLoading(
      true
    );
    setError(
      null
    );

    try {
      const {
        error,
      } =
        await supabase.auth.signInWithPassword(
          {
            email:
              payload?.email,
            password:
              payload?.password,
          }
        );
      if (
        error
      )
        throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push(
        "/dashboard"
      );
    } catch (error: unknown) {
      setError(
        error instanceof
          Error
          ? error.message
          : "An error occurred"
      );
    } finally {
      setIsLoading(
        false
      );
    }
  };

  return (
    <main className="flex w-screen h-screen justify-center items-center">
      <section
        id="register-section"
        className=" flex items-center justify-center "
      >
        <div className="max-w-md w-full mx-auto">
          <div
            id="register-card"
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center ">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0ea5e9] to-[#0369a1] rounded-2xl flex items-center justify-center mx-auto ">
                <FontAwesomeIcon
                  icon={
                    faFileLines
                  }
                  className="w-5 h-5 text-white"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Sign
                Into
                Your
                Account
              </h1>
            </div>

            <form
              id="login-form"
              className="space-y-6"
            >
              <div
                className="flex flex-col gap-2"
                id="email-field"
              >
                <label className="block text-sm font-medium text-gray-700 ">
                  Email
                  Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      className="w-4 h-4 text-gray-400"
                      icon={
                        faEnvelope
                      }
                    />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                    {...register(
                      "email"
                    )}
                  />
                </div>
                {errors
                  ?.email
                  ?.message && (
                  <p className="text-sm text-red-500">
                    {
                      errors
                        ?.email
                        ?.message
                    }
                  </p>
                )}
              </div>

              <div
                className="flex flex-col gap-2"
                id="password-field"
              >
                <label className="block text-sm font-medium text-gray-700 ">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      className="w-4 h-4 text-gray-400"
                      icon={
                        faLock
                      }
                    />
                  </div>
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Create a password"
                    {...register(
                      "password"
                    )}
                  />
                </div>
                {errors
                  ?.password
                  ?.message && (
                  <p className="text-sm text-red-500">
                    {
                      errors
                        ?.password
                        ?.message
                    }
                  </p>
                )}
              </div>
              {error && (
                <p className="text-sm text-red-500">
                  {
                    error
                  }
                </p>
              )}
              <button
                type="submit"
                disabled={
                  isLoading
                }
                onClick={handleSubmit(
                  handleLogin
                )}
                className="w-full bg-gradient-to-br from-[#0ea5e9] to-[#0369a1] text-white py-3 rounded-lg  font-medium transition-all duration-200"
              >
                Sign
                Into
                Your
                Account
              </button>
            </form>

            <div
              id="login-link"
              className="mt-6 text-center"
            >
              <p className="text-gray-600">
                Don&apos;t
                have
                an
                account?
                <Link
                  href={
                    "/auth/sign-up"
                  }
                  className="text-[#0ea5e9] hover:underline cursor-pointer font-medium"
                >
                  Sign
                  up
                  here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
