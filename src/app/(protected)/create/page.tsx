"use client";
import React, {
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  faArrowLeft,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { InsightsData } from "@/lib/types";
import GeneratedData from "@/components/GeneratedData";
import Loading from "@/components/Loading";
import {
  Bounce,
  toast,
} from "react-toastify";

const analysisOptions =
  [
    "SWOT Analysis",
    "Marketing OKRs",
    "Market Positioning",
    "Buyer Persona",
    "Investment Opportunities",
    "Channels & Distribution",
  ] as const;

type AnalysisOption =
  (typeof analysisOptions)[number];
const FormSchema =
  yup
    .object()
    .shape(
      {
        product:
          yup
            .string()
            .required(
              "Please select an option "
            ),
        business_objective:
          yup
            .string()
            .required(
              "Please select an option "
            ),
        segment:
          yup
            .string()
            .required(
              "Please select an option "
            ),
        focus_areas:
          yup
            .array()
            .of(
              yup
                .mixed<AnalysisOption>()
                .oneOf(
                  analysisOptions
                )
            )
            .min(
              1,
              "You have to select at least one item."
            )
            .required(
              "Please select at least one."
            ),
      }
    );

const page =
  () => {
    const [
      loading,
      setLoading,
    ] =
      useState<boolean>(
        false
      );
    const router =
      useRouter();
    const [
      insight,
      setInsight,
    ] =
      useState<InsightsData | null>(
        null
      );
    const methods =
      useForm<
        yup.InferType<
          typeof FormSchema
        >
      >(
        {
          resolver:
            yupResolver(
              FormSchema
            ),
          defaultValues:
            {
              focus_areas:
                [
                  "SWOT Analysis",
                  "Marketing OKRs",
                  "Market Positioning",
                ],
            },
        }
      );
    async function onSubmit(
      data: yup.InferType<
        typeof FormSchema
      >
    ) {
      setLoading(
        true
      );
      try {
        const req =
          await axios.post(
            "/api/generate",
            data
          );

        setInsight(
          req
            .data
            ?.data
        );
      } catch (error) {
        console.log(
          "error in getting result"
        );
        toast.error(
          "Something went wrong, Please try Again !!!",
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
        setLoading(
          false
        );
      }
    }
    return (
      <div className="flex flex-1 flex-col h-full ">
        {loading ? (
          <Loading />
        ) : insight ? (
          <>
            <GeneratedData
              data={
                insight
              }
              productName={
                methods?.watch()
                  ?.product
              }
              generateDate={new Date().toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month:
                    "long",
                  day: "numeric",
                }
              )}
              objective={
                methods?.watch()
                  ?.business_objective
              }
              segment={
                methods?.watch()
                  ?.segment
              }
            />
          </>
        ) : (
          <main
            id="main-content"
            className="flex-1 overflow-y-auto"
          >
            <header className="bg-white  sticky top-0 z-10">
              <div className="px-2 md:px-6 py-4 flex items-center justify-between  ">
                <h1 className="hidden md:flex text-md md:text-2xl font-semibold text-gray-800">
                  Create
                  New
                  Analysis
                </h1>
                <div
                  onClick={() =>
                    router.push(
                      "/dashboard"
                    )
                  }
                  className={`md:hidden text-xs  text-grey-400 text-nowrap flex items-center px-3 py-2.5  font-medium rounded-lg  cursor-pointer`}
                  id="createAnalysisBtn"
                >
                  <FontAwesomeIcon
                    className=" w-5 h-5 mr-3"
                    icon={
                      faArrowLeft
                    }
                  />
                  <span>
                    Back
                    To
                    Dashbaord
                  </span>
                </div>
              </div>
            </header>
            <div
              id="create-analysis-main"
              className="p-6"
            >
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="p-6">
                    <Form
                      {...methods}
                    >
                      <form
                        onSubmit={methods?.handleSubmit(
                          onSubmit
                        )}
                        id="main-analysis-form"
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      >
                        <div>
                          <FormField
                            control={
                              methods?.control
                            }
                            name="product"
                            render={({
                              field,
                            }) => (
                              <FormItem>
                                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                                  Select
                                  Product
                                </FormLabel>
                                <Select
                                  onValueChange={
                                    field.onChange
                                  }
                                  defaultValue={
                                    field.value
                                  }
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Choose a Product" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Electic Car">
                                      Electic
                                      Car
                                    </SelectItem>
                                    <SelectItem value="Coffee">
                                      Coffee
                                    </SelectItem>
                                    <SelectItem value="Mobile Phone">
                                      Mobile
                                      Phone
                                    </SelectItem>
                                  </SelectContent>
                                </Select>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          <FormField
                            control={
                              methods?.control
                            }
                            name="business_objective"
                            render={({
                              field,
                            }) => (
                              <FormItem>
                                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                                  Business
                                  Objective
                                </FormLabel>
                                <Select
                                  onValueChange={
                                    field.onChange
                                  }
                                  defaultValue={
                                    field.value
                                  }
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Choose Business Objective" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Increase Awareness">
                                      Increase
                                      Awareness
                                    </SelectItem>
                                    <SelectItem value="Increase Consideration">
                                      Increase
                                      Consideration
                                    </SelectItem>
                                    <SelectItem value="Increase Sales">
                                      Increase
                                      Sales
                                    </SelectItem>
                                  </SelectContent>
                                </Select>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          <FormField
                            control={
                              methods?.control
                            }
                            name="segment"
                            render={({
                              field,
                            }) => (
                              <FormItem>
                                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                                  Customer
                                  Segment
                                </FormLabel>
                                <Select
                                  onValueChange={
                                    field.onChange
                                  }
                                  defaultValue={
                                    field.value
                                  }
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Choose Customer Segment" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Gen Z Creators">
                                      Gen
                                      Z
                                      Creators
                                    </SelectItem>
                                    <SelectItem value="Urban Climate Advocates">
                                      Urban
                                      Climate
                                      Advocates
                                    </SelectItem>
                                    <SelectItem value="Cost-Sensitive SMB Owners">
                                      Cost-Sensitive
                                      SMB
                                      Owners
                                    </SelectItem>
                                    <SelectItem value="Retired DIYers">
                                      Retired
                                      DIYers
                                    </SelectItem>
                                    <SelectItem value="Enterprise IT Leaders">
                                      Enterprise
                                      IT
                                      Leaders
                                    </SelectItem>
                                  </SelectContent>
                                </Select>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <FormField
                            control={
                              methods.control
                            }
                            name="focus_areas"
                            render={({
                              field,
                            }) => (
                              <FormItem>
                                <div>
                                  <FormLabel className="block text-sm font-medium text-gray-700">
                                    Analysis
                                    Focus
                                    Areas
                                  </FormLabel>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                  {analysisOptions.map(
                                    (
                                      item,
                                      index
                                    ) => {
                                      const isChecked =
                                        field.value?.includes(
                                          item
                                        );
                                      return (
                                        <FormItem
                                          key={
                                            index
                                          }
                                          className="flex items-center space-x-2"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={
                                                isChecked
                                              }
                                              onCheckedChange={(
                                                checked
                                              ) => {
                                                if (
                                                  checked
                                                ) {
                                                  field.onChange(
                                                    [
                                                      ...field.value,
                                                      item,
                                                    ]
                                                  );
                                                } else {
                                                  field.onChange(
                                                    field.value.filter(
                                                      (
                                                        value
                                                      ) =>
                                                        value !==
                                                        item
                                                    )
                                                  );
                                                }
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="text-sm font-normal">
                                            {
                                              item
                                            }
                                          </FormLabel>
                                        </FormItem>
                                      );
                                    }
                                  )}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="md:col-span-2 mt-8 justify-end flex space-x-4">
                          <button
                            type="submit"
                            id="main-generate-btn"
                            className="px-8 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 flex items-center"
                          >
                            <FontAwesomeIcon
                              icon={
                                faBolt
                              }
                              className="w-4 h-4 mr-2"
                            />
                            Generate
                            Insights
                          </button>
                        </div>
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
      </div>
    );
  };

export default page;
