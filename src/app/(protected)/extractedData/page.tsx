"use client";
import { SearchableMatchSelect } from "@/components/searchMatchDropdown";
import { useExtractedDataStore } from "@/lib/store/store";
import { createClient } from "@/lib/supabase/client";
import {
  faFileText,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  redirect,
  useSearchParams,
} from "next/navigation";
import React, {
  useState,
} from "react";
import {
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  Bounce,
  toast,
} from "react-toastify";

const ExtractData =
  () => {
    const data =
      useExtractedDataStore(
        (
          state
        ) =>
          state.parsedData
      );
    if (
      data?.length ===
        0 ||
      !data
    ) {
      toast.error(
        "Failed to read the uploaded File",
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
      redirect(
        "/dashboard"
      );
    }

    const {
      control,
      register,
      watch,
      setValue,
    } =
      useForm<{
        rows: Array<{
          [
            key: string
          ]: any;
        }>;
      }>(
        {
          defaultValues:
            {
              rows: data,
            },
        }
      );
    const [
      tabs,
      setTabs,
    ] =
      useState<
        | "extract"
        | "match"
      >(
        "extract"
      );
    const {
      fields,
      remove,
      append,
    } =
      useFieldArray(
        {
          control,
          name: "rows",
        }
      );
    const searchParams =
      useSearchParams();
    const id =
      searchParams.get(
        "id"
      );
    const columns =
      data
        ? Object.keys(
            data?.[0]
          )
        : [];
    const [
      saving,
      setSaving,
    ] =
      useState<boolean>(
        false
      );
    const supabase =
      createClient();
    const handleUpdate =
      async (
        id: string
      ) => {
        setSaving(
          true
        );
        const items =
          watch()
            ?.rows;
        const user =
          await supabase.auth.getUser();
        const userId =
          user
            .data
            .user
            ?.id;
        const {
          error,
        } =
          await supabase
            .from(
              "documents"
            )
            .update(
              [
                {
                  user_id:
                    userId,
                  rows: items,
                },
              ]
            )
            .eq(
              "id",
              id
            );
        if (
          error
        ) {
          toast.error(
            "Failed to Update the Data",
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
          setSaving(
            false
          );
        } else {
          toast.success(
            "Successfully, Updated the Data ",
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
          redirect(
            "/dashboard"
          );
        }
      };
    const handleSave =
      async () => {
        setSaving(
          true
        );
        const items =
          watch()
            ?.rows;
        const user =
          await supabase.auth.getUser();
        const user_id =
          user
            .data
            .user
            ?.id;

        const {
          error,
        } =
          await supabase
            .from(
              "documents"
            )
            .insert(
              [
                {
                  user_id:
                    user_id,
                  rows: items,
                },
              ]
            );
        if (
          error
        ) {
          toast.error(
            "Failed to Save the Data",
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
          setSaving(
            false
          );
        } else {
          toast.success(
            "Successfully, Saved the Data ",
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
          redirect(
            "/dashboard"
          );
        }
      };
    return saving ? (
      <div className="flex w-full h-full items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-700 text-sm">
            {id
              ? "Updating"
              : "Saving"}
            the
            Data
          </p>
        </div>
      </div>
    ) : (
      <div className="flex z-10 h-full pb-10 flex-col gap-4 w-full mx-auto">
        <div
          id="tab-navigation"
          className="border-b border-neutral-200 mb-8"
        >
          <nav className=" flex space-x-8">
            <button
              onClick={() =>
                setTabs(
                  "extract"
                )
              }
              className={`${
                tabs ===
                "extract"
                  ? "border-neutral-900 text-neutral-900"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              } border-b-2 flex items-center gap-2  py-2 px-1 text-sm `}
            >
              <FontAwesomeIcon
                icon={
                  faFileText
                }
                className="w-4 h-4"
              />
              Extract
              Data
            </button>
            <button
              onClick={() =>
                setTabs(
                  "match"
                )
              }
              className={`${
                tabs ===
                "match"
                  ? "border-neutral-900 text-neutral-900"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              } border-b-2 flex items-center gap-2  py-2 px-1 text-sm `}
            >
              <FontAwesomeIcon
                icon={
                  faSearch
                }
                className="w-4 h-4"
              />
              Match
            </button>
          </nav>
        </div>
        {tabs ===
        "extract" ? (
          <div
            id="extracted-data-form"
            className=" bg-white shadow rounded-lg overflow-hidden"
          >
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  Extracted
                  Data
                </h2>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Review
                and
                edit
                the
                extracted
                information
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6 h-[800px] overflow-y-auto">
              <div className="space-y-6">
                <div id="line-items-section">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Line
                      Items
                    </h3>
                    <button
                      onClick={() => {
                        append(
                          {}
                        );
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0284c7] hover:bg-[#0369a1]"
                    >
                      Add
                      LineItem
                    </button>
                  </div>
                  <div className="overflow-x-auto border border-gray-200 rounded-md shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {columns?.map(
                            (
                              col,
                              idx
                            ) => {
                              return (
                                <th
                                  key={
                                    idx
                                  }
                                  scope="col"
                                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  {
                                    col
                                  }
                                </th>
                              );
                            }
                          )}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {fields?.map(
                          (
                            field,
                            rowIndex
                          ) => (
                            <tr
                              key={
                                field.id
                              }
                            >
                              {columns?.map(
                                (
                                  col
                                ) => {
                                  return (
                                    <td
                                      className="px-3 py-4 whitespace-nowrap text-sm text-gray-900"
                                      key={
                                        col
                                      }
                                    >
                                      <input
                                        type="text"
                                        className="block w-full border-0 p-0 focus:ring-0 sm:text-sm text-gray-900"
                                        {...register(
                                          `rows.${rowIndex}.${col}`
                                        )}
                                      />
                                    </td>
                                  );
                                }
                              )}
                              <td>
                                <button
                                  type="button"
                                  onClick={() =>
                                    remove(
                                      rowIndex
                                    )
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={
                                      faTrash
                                    }
                                    className="text-red-400 w-4 h-4"
                                  />
                                </button>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            id="matched-data-form"
            className=" bg-white shadow rounded-lg overflow-hidden"
          >
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  Matched
                  Data
                </h2>
              </div>
            </div>
            <div className="px-4 py-5 sm:p-6 h-[800px] overflow-y-auto">
              <div className="space-y-6">
                <div id="line-items-section">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Line
                      Items
                    </h3>
                  </div>
                  <div className="overflow-x-auto border border-gray-200 rounded-md shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Request
                            Item
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Match
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {watch()?.rows?.map(
                          (
                            row,
                            idx
                          ) => {
                            return (
                              <tr
                                key={
                                  idx
                                }
                              >
                                <td className="border p-2">
                                  {
                                    row?.[
                                      "Request Item"
                                    ]
                                  }
                                </td>
                                <td className="border p-2">
                                  <SearchableMatchSelect
                                    idx={
                                      idx
                                    }
                                    requestItem={
                                      row?.[
                                        "Request Item"
                                      ]
                                    }
                                    setValue={
                                      setValue
                                    }
                                  />
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-end mt-6">
          <button
            disabled={
              saving
            }
            onClick={() =>
              id
                ? handleUpdate(
                    id
                  )
                : handleSave()
            }
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0284c7] hover:bg-[#0369a1]"
          >
            {id
              ? "Update"
              : "Save"}
          </button>
        </div>
      </div>
    );
  };

export default ExtractData;
