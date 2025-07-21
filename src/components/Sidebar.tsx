"use client";
import { createClient } from "@/lib/supabase/client";
import {
  faDashboard,
  faLineChart,
  faPlus,
  faSignOutAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import React, {
  useEffect,
  useState,
} from "react";

const Sidebar =
  ({
    userName,
  }: {
    userName: string;
  }) => {
    const path =
      usePathname();
    const supabase =
      createClient();
    const router =
      useRouter();
    return (
      <div className="w-full flex flex-col h-full">
        <div className="flex items-center px-4 py-5 border-b border-gray-200">
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

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          <Link
            href={
              "/dashboard"
            }
            className={`${
              path ===
              "/dashboard"
                ? "bg-primary-50 text-primary-600"
                : "text-gray-700 hover:bg-gray-100"
            } flex items-center px-3 py-2.5 text-sm font-medium rounded-lg  cursor-pointer`}
          >
            <FontAwesomeIcon
              className=" w-5 h-5 mr-3"
              icon={
                faDashboard
              }
            />

            <span>
              Dashboard
            </span>
          </Link>
          <Link
            href={
              "/create"
            }
            className={`${
              path ===
              "/create"
                ? "bg-primary-50 text-primary-600"
                : "text-gray-700 hover:bg-gray-100"
            } flex items-center px-3 py-2.5 text-sm font-medium rounded-lg  cursor-pointer`}
            id="createAnalysisBtn"
          >
            <FontAwesomeIcon
              className=" w-5 h-5 mr-3"
              icon={
                faPlus
              }
            />
            <span>
              Create
              Analysis
            </span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-start items-center">
            <FontAwesomeIcon
              className=" w-14 h-14 "
              icon={
                faUserCircle
              }
            />
            <div>
              <p className="text-xs font-medium text-gray-700">
                {
                  userName
                }
              </p>
            </div>
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
        </div>
      </div>
    );
  };

export default Sidebar;
