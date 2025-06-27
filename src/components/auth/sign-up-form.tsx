"use client";

import { createClient } from "@/lib/supabase/client";
import {
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faFileLines,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

const SignupSchema =
  Yup.object().shape(
    {
      email:
        Yup.string()
          .email(
            "Invalid email"
          )
          .required(
            "Email is required"
          ),

      password:
        Yup.string()
          .required(
            "Password is required"
          )
          .min(
            6,
            "Password must be at least 6 characters"
          )
          .matches(
            /[A-Z]/,
            "Password must contain at least one uppercase letter"
          )
          .matches(
            /[0-9]/,
            "Password must contain at least one number"
          )
          .matches(
            /[@$!%*?&#^()_\-+={}[\]|\\:;"'<>,.~`]/,
            "Password must contain at least one special character"
          ),

      confirmPassword:
        Yup.string()
          .required(
            "Please confirm your password"
          )
          .oneOf(
            [
              Yup.ref(
                "password"
              ),
            ],
            "Passwords must match"
          ),
    }
  );

export function SignUpForm() {
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
          SignupSchema
        ),
    }
  );

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

  const handleSignUp: SubmitHandler<
    Yup.InferType<
      typeof SignupSchema
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
        await supabase.auth.signUp(
          {
            email:
              payload.email,
            password:
              payload.password,
            options:
              {
                emailRedirectTo: `${window.location.origin}/dashboard`,
              },
          }
        );
      if (
        error
      )
        throw error;
      router.push(
        "/auth/sign-up-success"
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
    <main className="flex w-screen h-screen  justify-center items-center">
      <section
        id="register-section"
        className=" flex items-center justify-center "
      >
        <div className="max-w-md w-full mx-auto px-4">
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
              <h1 className="text-2xl font-bold text-gray-900 py-2 pt-4">
                Create
                Account
              </h1>
            </div>

            <form
              id="register-form"
              className="space-y-6"
            >
              <div
                className="gap-2 flex flex-col"
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
                <label className="block text-sm font-medium text-gray-700">
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

              <div
                className="flex flex-col gap-2"
                id="confirm-password-field"
              >
                <label className="block text-sm font-medium text-gray-700">
                  Confirm
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
                      "confirmPassword"
                    )}
                  />
                </div>
                {errors
                  ?.confirmPassword
                  ?.message && (
                  <p className="text-sm text-red-500">
                    {
                      errors
                        ?.confirmPassword
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
                  handleSignUp
                )}
                className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#0369a1] text-white py-3 rounded-lgfont-medium transition-all duration-200"
              >
                Create
                Account
              </button>
            </form>

            <div
              id="login-link"
              className="mt-6 text-center"
            >
              <p className="text-gray-600">
                Already
                have
                an
                account?
                <Link
                  href={
                    "/auth/login"
                  }
                  className="text-[#0ea5e9] hover:underline cursor-pointer font-medium"
                >
                  Sign
                  in
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
