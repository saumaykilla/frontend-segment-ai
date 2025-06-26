"use client";
import {
  faCloudArrowUp,
  faFileText,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  useForm,
  useFieldArray,
} from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, {
  useEffect,
  useState,
} from "react";
import {
  Bounce,
  toast,
} from "react-toastify";

type MatchResponse =
  {
    results: {
      [
        requestItem: string
      ]: {
        match: string;
        score: number;
      }[];
    };
  };

const UploadFile =
  () => {
    const [
      submitting,
      setSubmitting,
    ] =
      useState<boolean>(
        false
      );
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const [
      columns,
      setColumns,
    ] =
      useState<
        string[]
      >(
        []
      );
    const {
      control,
      register,
      watch,
      reset,
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
              rows: [],
            },
        }
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

    /* eslint-enable @typescript-eslint/no-explicit-any */
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
          setSubmitting(
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
                "/api/extractFromFile",
                formData,
                {
                  headers:
                    {
                      "Content-Type":
                        "multipart/form-data",
                    },
                }
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
            setColumns(
              Object.keys(
                res
                  ?.data?.[0]
              )
            );
            reset(
              {
                rows: res?.data,
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
            setSubmitting(
              false
            );
          }
        }
      };

    const handleSave =
      () => {
        // Clone extracted data
        const extract =
          [
            ...watch()
              ?.rows,
          ];

        // Collect selected matches
        const selectedMatches: Record<
          string,
          string
        > =
          {};

        if (
          matchRecords
        ) {
          Object.entries(
            matchRecords.results
          ).forEach(
            ([
              requestItem,
            ]) => {
              const selected =
                (
                  document.getElementById(
                    `select-${requestItem}`
                  ) as HTMLSelectElement
                )
                  ?.value;

              selectedMatches[
                requestItem
              ] =
                selected;
            }
          );
        }

        // Replace "Request Item" in extract with matched selection
        const updated =
          extract.map(
            (
              item
            ) => {
              const original =
                item[
                  "Request Item"
                ];
              const matched =
                selectedMatches[
                  original
                ];
              return {
                ...item,
                "Request Item":
                  matched ||
                  original,
              };
            }
          );

        // Create file
        const blob =
          new Blob(
            [
              JSON.stringify(
                updated,
                null,
                2
              ),
            ],
            {
              type: "application/json",
            }
          );

        const link =
          document.createElement(
            "a"
          );
        link.href =
          URL.createObjectURL(
            blob
          );
        link.download =
          "processed_data.json";
        link.click();

        toast.success(
          "Extracted data updated with matches and saved to file!"
        );
      };

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
    const [
      matchRecords,
      setMatchRecords,
    ] =
      useState<MatchResponse | null>(
        null
      );
    useEffect(() => {
      const match =
        async () => {
          if (
            tabs ===
            "match"
          ) {
            try {
              setSubmitting(
                true
              );
              const requestItems =
                watch()?.rows?.map(
                  (
                    obj
                  ) =>
                    obj[
                      "Request Item"
                    ]
                );
              const request =
                await axios.post(
                  "https://endeavor-interview-api-gzwki.ondigitalocean.app/match/batch",
                  {
                    queries:
                      requestItems,
                  }
                );
              setMatchRecords(
                request?.data
              );
            } catch (error) {
              console.log(
                error
              );
            } finally {
              setSubmitting(
                false
              );
            }
          }
        };

      match();
    }, [
      tabs,
    ]);

    return (
      <div className="w-screen h-screen flex  justify-center mx-auto py-6 sm:px-6 lg:px-8">
        {watch()
          ?.rows
          ?.length ===
        0 ? (
          submitting ? (
            <div className="w-screen h-screen flex items-center justify-center bg-white">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-700 text-sm">
                  Extracting
                  From
                  PDF
                </p>
              </div>
            </div>
          ) : (
            <main
              id="main-content"
              className="max-w-7xl w-full flex flex-col gap-6"
            >
              <div className="px-4 sm:px-0 flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Document
                  Processing
                </h1>
                <p className="text-sm text-gray-600">
                  Upload
                  document
                  to
                  extract
                  data
                  automatically
                </p>
              </div>

              <div
                className=" bg-white shadow rounded-lg overflow-hidden"
                id="document-processor"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div
                    id="file-upload-section"
                    className="mb-8"
                  >
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Upload
                      Document
                    </h2>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                      <div className="text-center flex flex-col gap-3  items-center">
                        <FontAwesomeIcon
                          icon={
                            faCloudArrowUp
                          }
                          className="w-10 h-10 text-gray-400"
                        />
                        <p className="text-gray-700 font-medium">
                          Upload
                          your
                          file
                          here
                        </p>
                        <div>
                          <label
                            htmlFor="file-upload"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0284c7] hover:bg-[#0369a1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer"
                          >
                            <span>
                              Select
                              file
                            </span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept=".pdf"
                              onChange={
                                handleFileUpload
                              }
                            />
                          </label>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          Supported
                          formats:
                          PDF,
                          DOCX,
                          JPG,
                          PNG
                          (max
                          10MB)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          )
        ) : (
          <div className="flex flex-col gap-4 w-full mx-auto">
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
                            {submitting && (
                              <tr>
                                <td className="flex flex-col items-center gap-2">
                                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                  <p className="text-gray-700 text-sm">
                                    Fecthing
                                    Match
                                    Results
                                  </p>
                                </td>
                              </tr>
                            )}
                            {matchRecords &&
                              Object.entries(
                                matchRecords.results
                              ).map(
                                (
                                  [
                                    requestItem,
                                    matches,
                                  ],
                                  idx
                                ) => (
                                  <tr
                                    key={
                                      idx
                                    }
                                  >
                                    <td className="border p-2">
                                      {
                                        requestItem
                                      }
                                    </td>
                                    <td className="border p-2">
                                      <select
                                        id={`select-${requestItem}`}
                                        className="border rounded p-1 w-full"
                                      >
                                        {matches.map(
                                          (
                                            matchObj,
                                            i
                                          ) => (
                                            <option
                                              key={
                                                i
                                              }
                                              value={
                                                matchObj.match
                                              }
                                            >
                                              {
                                                matchObj.match
                                              }{" "}
                                              (
                                              {matchObj.score.toFixed(
                                                1
                                              )}
                                              %)
                                            </option>
                                          )
                                        )}
                                      </select>
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
            )}
            <div className="flex justify-end mt-6">
              <button
                onClick={
                  handleSave
                }
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0284c7] hover:bg-[#0369a1]"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

export default UploadFile;
