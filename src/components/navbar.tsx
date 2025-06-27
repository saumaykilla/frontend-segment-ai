"use client";
import { createClient } from "@/lib/supabase/client";
import {
  faFileLines,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar =
  () => {
    const router =
      useRouter();

    const logout =
      async () => {
        const supabase =
          createClient();
        await supabase.auth.signOut();
        router.push(
          "/auth/login"
        );
      };
    return (
      <div className="flex items-center z-150 bg-white justify-between fixed w-full p-4 pr-10 border-b-2 border-[#DDDDDD]">
        <div className="flex items-center ">
          <div className="w-8 h-8 bg-gradient-to-br from-[#0ea5e9] to-[#0369a1] rounded-lg flex items-center justify-center mr-3">
            <FontAwesomeIcon
              icon={
                faFileLines
              }
              className="w-5 h-5 text-white"
            />
          </div>
          <span className="text-xl font-bold text-gray-900">
            DocProcessor
          </span>
        </div>
        <div className="flex items-center space-x-4 ">
          <button
            onClick={
              logout
            }
            className="flex items-center space-x-2 hover:cursor-pointer px-4 py-2 text-sm text-neutral-700 hover:text-neutral-900 border border-neutral-300 rounded-md hover:bg-neutral-50"
          >
            <FontAwesomeIcon
              icon={
                faSignOutAlt
              }
              className="w-5 h-5 text-black"
            />
            <span>
              Logout
            </span>
          </button>
        </div>
      </div>
    );
  };

export default Navbar;
