"use client";
import { createClient } from "@/lib/supabase/client";
import {
  faLineChart,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";

const MobileHeader =
  () => {
    const supabase =
      createClient();
    const router =
      useRouter();
    return (
      <>
        <div className="flex items-center px-4 py-5">
          <div className="p-2 bg-primary-600 text-white rounded-lg">
            <FontAwesomeIcon
              className="w-8 h-8"
              icon={
                faLineChart
              }
            />
          </div>
          <h1 className="ml-2 text-xl font-semibold text-gray-800">
            SegmentSight
          </h1>
        </div>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push(
              "/auth/login"
            );
          }}
          className="mt-4 flex items-center w-full p-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
        >
          <FontAwesomeIcon
            className=" w-5 h-5 mr-3"
            icon={
              faSignOutAlt
            }
          />
          <span>
            Logout
          </span>
        </button>
      </>
    );
  };

export default MobileHeader;
