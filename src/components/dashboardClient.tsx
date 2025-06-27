"use client";
import React, {
  useState,
} from "react";
import { useExtractedDataStore } from "@/lib/store/store";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {
  Bounce,
  toast,
} from "react-toastify";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
const DashboardClient =
  ({
    data,
  }: {
    data:
      | any[]
      | null;
  }) => {
    const [
      uploading,
      setUplaoding,
    ] =
      useState<boolean>(
        false
      );
    const router =
      useRouter();
    const deleteDocument =
      async (
        documentId: string
      ) => {
        console.log(
          "documentId",
          documentId
        );
        const supabase =
          await createClient();
        const {
          error,
        } =
          await supabase
            .from(
              "documents"
            )
            .delete()
            .eq(
              "id",
              documentId
            );
        if (
          error
        ) {
          toast.error(
            "Failed to Delete ",
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
        } else {
          toast.success(
            "Successfully, Deleted the Data ",
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
          router.refresh();
        }
      };
    const handleFileUpload =
      async (
        e: React.ChangeEvent<HTMLInputElement>
      ) => {
        if (
          e
            ?.target
            ?.files &&
          e
            ?.target
            ?.files
            ?.length >
            0
        ) {
          setUplaoding(
            true
          );
          const formData =
            new FormData();
          formData.append(
            "file",
            e
              ?.target
              ?.files?.[0]
          );
          try {
            const res =
              await axios.post(
                // "/api/extractFromFile", // original extraction api
                "/api/customExtractFromFile", // custom extraction api
                formData,
                {
                  headers:
                    {
                      "Content-Type":
                        "multipart/form-data",
                    },
                }
              );

            useExtractedDataStore
              .getState()
              .setParsedData(
                res?.data
              );
            router.push(
              "/extractedData"
            );
            toast.success(
              "Extracted Information from the PDF ",
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
          } catch (err) {
            console.error(
              "Error:",
              err
            );
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
          } finally {
            setUplaoding(
              false
            );
          }
        }
      };
    const handleEdit =
      async (
        data: [],
        id: string
      ) => {
        useExtractedDataStore
          .getState()
          .setParsedData(
            data
          );
        router.push(
          `/extractedData?id=${id}`
        );
      };

    return uploading ? (
      <div className="flex w-full h-full items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-700 text-sm">
            Extracting
            From
            PDF
          </p>
        </div>
      </div>
    ) : (
      <main
        id="main-dashboard"
        className="px-6 container"
      >
        <div className="mb-6">
          <h2 className="text-2xl text-neutral-900 mb-2">
            Documents
          </h2>
          <p className="text-neutral-600">
            Manage
            your
            documents
            and
            files
          </p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg text-neutral-900">
                Document
                List
              </h3>
              <label
                htmlFor="file-upload"
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-br from-[#0ea5e9] to-[#0369a1] hover:cursor-pointer text-white rounded-md hover:bg-neutral-800"
              >
                <i className="fa-solid fa-plus"></i>
                <FontAwesomeIcon
                  icon={
                    faPlus
                  }
                  className="text-white w-4 h-4"
                />
                <span>
                  Upload
                </span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept=".pdf"
                  disabled={
                    uploading
                  }
                  onChange={
                    handleFileUpload
                  }
                />
              </label>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-neutral-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-neutral-500 uppercase tracking-wider">
                    Document
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-neutral-500 uppercase tracking-wider">
                    Create
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              {data &&
                data?.length >
                  0 && (
                  <tbody className="bg-white divide-y divide-neutral-200">
                    {data?.map(
                      (
                        lineItem,
                        idx
                      ) => {
                        return (
                          <tr
                            key={
                              idx
                            }
                            className="hover:bg-neutral-50"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                              {idx +
                                1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                              {
                                lineItem?.id
                              }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                              {
                                lineItem?.created_at
                              }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap flex  items-center text-sm space-x-2">
                              <button
                                onClick={() =>
                                  handleEdit(
                                    lineItem?.rows,
                                    lineItem?.id
                                  )
                                }
                                className="inline-flex items-center px-3 py-1 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50"
                              >
                                <FontAwesomeIcon
                                  icon={
                                    faEdit
                                  }
                                  className="w-4 h-4 mr-1"
                                />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  deleteDocument(
                                    lineItem?.id
                                  );
                                }}
                                className="inline-flex items-center px-3 py-1 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50"
                              >
                                <FontAwesomeIcon
                                  icon={
                                    faTrash
                                  }
                                  className="w-4 h-4 mr-1"
                                />
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                )}
              {!data ||
                (data?.length ===
                  0 && (
                  <tbody>
                    <tr className="text-center">
                      <td
                        colSpan={
                          4
                        }
                        className="p-4 text-gray-400"
                      >
                        No
                        Records
                        Found
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        </div>
      </main>
    );
  };

export default DashboardClient;
