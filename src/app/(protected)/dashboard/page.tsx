"use client";
import React, {
  useEffect,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Bounce,
  toast,
} from "react-toastify";

const Dashboard =
  () => {
    const router =
      useRouter();
    const [
      result,
      setResult,
    ] =
      useState<
        Array<{
          generateDate: string;
          id: string;
          productName: string;
          segment: string;
          objective: string;
        }>
      >(
        []
      );
    useEffect(() => {
      const fetchData =
        async () => {
          const supabase =
            await createClient();
          try {
            const {
              data,
              error,
            } =
              await supabase
                .from(
                  "insight"
                )
                .select(
                  "id, objective, productName, segment, generateDate"
                );
            if (
              error
            ) {
              throw new Error(
                "Failed to fetch the data"
              );
            }
            if (
              data
            )
              setResult(
                data
              );
          } catch (error) {
            console.log(
              error
            );
          }
        };
      fetchData();
    }, []);

    return (
      <div
        id="dashboard-content"
        className="p-6"
      >
        <header className="bg-white  sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center justify-between ">
            <h1 className="text-md md:text-2xl font-semibold text-gray-800">
              My
              Reports
            </h1>
            <div
              onClick={() =>
                router.push(
                  "/create"
                )
              }
              className={`md:hidden bg-primary-500 text-white flex items-center px-3 py-2.5 text-sm font-medium rounded-lg  cursor-pointer`}
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
            </div>
          </div>
        </header>
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Segment
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Objective
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Generate
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {result &&
              result.length >
                0 ? (
                result.map(
                  (
                    item
                  ) => (
                    <tr
                      key={
                        item.id
                      }
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                        {
                          item.productName
                        }
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {
                          item.segment
                        }
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {
                          item.objective
                        }
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {
                          item.generateDate
                        }
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 space-x-3">
                        <button
                          onClick={() =>
                            router.push(
                              `/${item.id}`
                            )
                          }
                          className="px-3 py-1.5 bg-primary-600 text-white rounded hover:bg-primary-700"
                        >
                          View
                        </button>
                        <button
                          onClick={async () => {
                            const supabase =
                              createClient();
                            try {
                              const {
                                error,
                              } =
                                await supabase
                                  .from(
                                    "insight"
                                  )
                                  .delete()
                                  .eq(
                                    "id",
                                    item.id
                                  );
                              if (
                                error
                              )
                                throw new Error(
                                  "failed to delete"
                                );
                              setResult(
                                (
                                  prev
                                ) =>
                                  prev.filter(
                                    (
                                      i
                                    ) =>
                                      i.id !==
                                      item.id
                                  )
                              );
                            } catch (error) {
                              console.log(
                                error
                              );
                              toast.error(
                                "Failed to delete the data",
                                {
                                  position:
                                    "top-right",
                                  autoClose: 5000,
                                  hideProgressBar:
                                    false,
                                  closeOnClick:
                                    true,
                                  pauseOnHover:
                                    true,
                                  draggable:
                                    true,
                                  progress:
                                    undefined,
                                  theme:
                                    "light",
                                  transition:
                                    Bounce,
                                }
                              );
                            }
                          }}
                          className="px-3 py-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={
                      5
                    }
                    className="text-center p-4 text-muted-foreground"
                  >
                    No
                    Reports
                    to
                    Show
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="block md:hidden space-y-4">
          {result &&
          result.length >
            0 ? (
            result.map(
              (
                item
              ) => (
                <div
                  key={
                    item.id
                  }
                  className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {
                      item.productName
                    }
                  </h3>
                  <div className="space-y-1 text-sm text-gray-700 mb-3">
                    <div>
                      <span className="font-medium text-gray-500">
                        Segment:
                      </span>{" "}
                      {
                        item.segment
                      }
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">
                        Objective:
                      </span>{" "}
                      {
                        item.objective
                      }
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">
                        Generated:
                      </span>{" "}
                      {
                        item.generateDate
                      }
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() =>
                        router.push(
                          `/${item.id}`
                        )
                      }
                      className="flex-1 px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded hover:bg-primary-700"
                    >
                      View
                    </button>
                    <button
                      onClick={async () => {
                        const supabase =
                          createClient();
                        try {
                          const {
                            error,
                          } =
                            await supabase
                              .from(
                                "insight"
                              )
                              .delete()
                              .eq(
                                "id",
                                item.id
                              );
                          if (
                            error
                          )
                            throw new Error(
                              "failed to delete"
                            );
                          setResult(
                            (
                              prev
                            ) =>
                              prev.filter(
                                (
                                  i
                                ) =>
                                  i.id !==
                                  item.id
                              )
                          );
                        } catch (error) {
                          console.log(
                            error
                          );
                          toast.error(
                            "Failed to delete the data",
                            {
                              position:
                                "top-right",
                              autoClose: 5000,
                              hideProgressBar:
                                false,
                              closeOnClick:
                                true,
                              pauseOnHover:
                                true,
                              draggable:
                                true,
                              progress:
                                undefined,
                              theme:
                                "light",
                              transition:
                                Bounce,
                            }
                          );
                        }
                      }}
                      className="flex-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-100 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="text-center text-muted-foreground text-sm">
              No
              Reports
              to
              Show
            </div>
          )}
        </div>
      </div>
    );
  };

export default Dashboard;
