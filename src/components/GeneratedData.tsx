"use client";
import { InsightsData } from "@/lib/types";
import React, {
  useState,
} from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBookmark,
  faBullseye,
  faChartSimple,
  faCheck,
  faExclamation,
  faGift,
  faLightbulb,
  faLocationArrow,
  faMoneyBill,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import InsightCard from "./InsightCard";
import { createClient } from "@/lib/supabase/client";
import {
  Bounce,
  toast,
} from "react-toastify";

const GeneratedData =
  ({
    data,
    productName,
    segment,
    objective,
    generateDate,
  }: {
    data: InsightsData;
    productName: string;
    segment: string;
    objective: string;
    generateDate: string;
  }) => {
    const handleSave =
      async () => {
        const payload =
          {
            insights:
              data,
            productName:
              productName,
            segment:
              segment,
            objective:
              objective,
            generateDate:
              generateDate,
          };
        try {
          const supabase =
            await createClient();
          const user_id =
            (
              await supabase.auth.getUser()
            )
              ?.data
              .user
              ?.id;
          const {
            error,
          } =
            await supabase
              .from(
                "insight"
              )
              .insert(
                {
                  user_id:
                    user_id,
                  ...payload,
                }
              );

          if (
            error
          ) {
            throw new Error(
              error?.message
            );
          }
          router.push(
            "/dashboard"
          );
          toast.success(
            "Insight Saved to Dashboard",
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
        } catch (error) {
          console.log(
            error
          );
          toast.error(
            "Failed to Save the Insights",
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
      };
    const path =
      usePathname();
    const router =
      useRouter();
    const dataKeys =
      Object.keys(
        data
      );
    const isSWOT =
      dataKeys.includes(
        "Strengths"
      ) &&
      dataKeys.includes(
        "Weaknesses"
      ) &&
      dataKeys.includes(
        "Opportunities"
      ) &&
      dataKeys.includes(
        "Threats"
      );

    const filteredKeys =
      isSWOT
        ? dataKeys.filter(
            (
              key
            ) =>
              ![
                "Strengths",
                "Weaknesses",
                "Opportunities",
                "Threats",
              ].includes(
                key
              )
          )
        : dataKeys;

    const initialTabs =
      filteredKeys.length >
      1
        ? [
            "All Insights",
            ...(isSWOT
              ? [
                  "SWOT Analysis",
                  ...filteredKeys,
                ]
              : filteredKeys),
          ]
        : filteredKeys;

    const [
      tabs,
    ] =
      useState<
        string[]
      >(
        initialTabs
      );

    return (
      <main
        id="main-content"
        className="flex flex-col flex-1 min-w-0 min-h-0 overflow-auto"
      >
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-2 md:px-6 py-4 flex items-center justify-between  ">
            <div className="flex items-center">
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
              </div>
              <span className="text-md md:text-2xl text-left font-semibold text-gray-800">
                {
                  productName
                }
              </span>
            </div>
            {path ===
              "/create" && (
              <button
                onClick={
                  handleSave
                }
                className="flex items-center px-3 py-2  text-xs md:text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100"
              >
                <FontAwesomeIcon
                  className=" w-5 h-5 mr-3"
                  icon={
                    faBookmark
                  }
                />
                <span>
                  Save
                </span>
              </button>
            )}
          </div>
          <div
            id="analysis-meta"
            className="hidden px-2 md:px-6 py-3 md:flex"
          >
            <div className="flex flex-wrap md:items-center text-xs md:text-sm text-gray-600 gap-4">
              <div className="flex items-center">
                <span className="font-medium mr-2">
                  Segment:
                </span>
                <span>
                  {
                    segment
                  }
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2">
                  Objective:
                </span>
                <span>
                  {
                    objective
                  }
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2">
                  Generated:
                </span>
                <span>
                  {
                    generateDate
                  }
                  {}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div
          id="results-content"
          className="w-full h-full  overflow-x-auto"
        >
          <Tabs
            className="bg-white w-full h-full border-b border-gray-200"
            defaultValue={
              tabs?.[0]
            }
          >
            <TabsList className="flex flex-nowrap items-start justify-start overflow-x-auto w-full px-4 box-border">
              {tabs?.map(
                (
                  tab,
                  index
                ) => (
                  <TabsTrigger
                    className="whitespace-nowrap"
                    value={
                      tab
                    }
                    key={
                      index
                    }
                  >
                    {
                      tab
                    }
                  </TabsTrigger>
                )
              )}
            </TabsList>

            <TabsContent
              className="flex-1 min-h-0 overflow-y-auto px-10 py-10"
              value="All Insights"
            >
              {data?.[
                "Strengths"
              ] &&
                data?.[
                  "Weaknesses"
                ] &&
                data?.Opportunities &&
                data?.Weaknesses && (
                  <>
                    <div className="text-xl font-semibold text-gray-800 flex items-center">
                      <FontAwesomeIcon
                        icon={
                          faChartSimple
                        }
                        className="text-primary-500 mr-2"
                      />
                      SWOT
                      Analysis
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-auto items-center">
                      <InsightCard
                        data={
                          data?.[
                            "Strengths"
                          ] ||
                          []
                        }
                        name="Strengths"
                        icon={
                          faCheck
                        }
                        bulletColor="text-green-600"
                        iconBgColor="bg-green-100"
                        iconColor="text-green-600"
                      />
                      <InsightCard
                        data={
                          data?.[
                            "Weaknesses"
                          ] ||
                          []
                        }
                        name="Weaknesses"
                        icon={
                          faXmark
                        }
                        bulletColor="text-red-600"
                        iconBgColor="bg-red-100"
                        iconColor="text-red-600"
                      />
                      <InsightCard
                        data={
                          data?.[
                            "Opportunities"
                          ] ||
                          []
                        }
                        name="Opportunities"
                        icon={
                          faLightbulb
                        }
                        bulletColor="text-blue-600"
                        iconBgColor="bg-blue-100"
                        iconColor="text-blue-600"
                      />
                      <InsightCard
                        data={
                          data?.[
                            "Threats"
                          ] ||
                          []
                        }
                        name="Threats"
                        icon={
                          faExclamation
                        }
                        bulletColor="text-orange-600"
                        iconBgColor="bg-orange-100"
                        iconColor="text-orange-600"
                      />
                    </div>
                  </>
                )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-auto items-center">
                {data?.[
                  "Marketing OKRs"
                ] && (
                  <InsightCard
                    data={
                      data?.[
                        "Marketing OKRs"
                      ] ||
                      []
                    }
                    name="Marketing OKRs"
                    icon={
                      faBullseye
                    }
                    bulletColor="text-primary-600"
                    iconBgColor="bg-primary-100"
                    iconColor="text-primary-500"
                  />
                )}
                {data?.[
                  "Market Positioning"
                ] && (
                  <InsightCard
                    data={
                      data?.[
                        "Market Positioning"
                      ] ||
                      []
                    }
                    name="Market Positioning"
                    icon={
                      faLocationArrow
                    }
                    bulletColor="text-primary-600"
                    iconBgColor="bg-primary-100"
                    iconColor="text-primary-500"
                  />
                )}
                {data?.[
                  "Buyer Persona"
                ] && (
                  <InsightCard
                    data={
                      data?.[
                        "Buyer Persona"
                      ] ||
                      []
                    }
                    name="Buyer Persona"
                    icon={
                      faUser
                    }
                    bulletColor="text-primary-600"
                    iconBgColor="bg-primary-100"
                    iconColor="text-primary-500"
                  />
                )}
                {data?.[
                  "Channels & Distribution"
                ] && (
                  <InsightCard
                    data={
                      data?.[
                        "Channels & Distribution"
                      ] ||
                      []
                    }
                    name="Channels & Distribution"
                    icon={
                      faGift
                    }
                    bulletColor="text-primary-600"
                    iconBgColor="bg-primary-100"
                    iconColor="text-primary-500"
                  />
                )}
                {data?.[
                  "Investment Opportunities"
                ] && (
                  <InsightCard
                    data={
                      data?.[
                        "Investment Opportunities"
                      ] ||
                      []
                    }
                    name="Investment Opportunities"
                    icon={
                      faMoneyBill
                    }
                    bulletColor="text-primary-600"
                    iconBgColor="bg-primary-100"
                    iconColor="text-primary-500"
                  />
                )}
              </div>
            </TabsContent>
            <TabsContent
              className="flex-1 min-h-0 overflow-y-auto px-10 py-10"
              value="SWOT Analysis"
            >
              <div className="text-xl font-semibold text-gray-800 flex items-center">
                <FontAwesomeIcon
                  icon={
                    faChartSimple
                  }
                  className="text-primary-500 mr-2"
                />
                SWOT
                Analysis
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-auto items-center">
                <InsightCard
                  data={
                    data?.[
                      "Strengths"
                    ] ||
                    []
                  }
                  name="Strengths"
                  icon={
                    faCheck
                  }
                  bulletColor="text-green-600"
                  iconBgColor="bg-green-100"
                  iconColor="text-green-600"
                />
                <InsightCard
                  data={
                    data?.[
                      "Weaknesses"
                    ] ||
                    []
                  }
                  name="Weaknesses"
                  icon={
                    faXmark
                  }
                  bulletColor="text-red-600"
                  iconBgColor="bg-red-100"
                  iconColor="text-red-600"
                />
                <InsightCard
                  data={
                    data?.[
                      "Opportunities"
                    ] ||
                    []
                  }
                  name="Opportunities"
                  icon={
                    faLightbulb
                  }
                  bulletColor="text-blue-600"
                  iconBgColor="bg-blue-100"
                  iconColor="text-blue-600"
                />
                <InsightCard
                  data={
                    data?.[
                      "Threats"
                    ] ||
                    []
                  }
                  name="Threats"
                  icon={
                    faExclamation
                  }
                  bulletColor="text-orange-600"
                  iconBgColor="bg-orange-100"
                  iconColor="text-orange-600"
                />
              </div>
            </TabsContent>
            <TabsContent
              className="flex-1 min-h-0 px-10 py-10 overflow-y-scroll"
              value="Marketing OKRs"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-auto items-center">
                <InsightCard
                  data={
                    data?.[
                      "Marketing OKRs"
                    ] ||
                    []
                  }
                  name="Marketing OKRs"
                  icon={
                    faBullseye
                  }
                  bulletColor="text-primary-600"
                  iconBgColor="bg-primary-100"
                  iconColor="text-primary-500"
                />
              </div>
            </TabsContent>
            <TabsContent
              className="flex-1 min-h-0 px-10 py-10 overflow-y-scroll"
              value="Market Positioning"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-auto items-center">
                <InsightCard
                  data={
                    data?.[
                      "Market Positioning"
                    ] ||
                    []
                  }
                  name="Market Positioning"
                  icon={
                    faLocationArrow
                  }
                  bulletColor="text-primary-600"
                  iconBgColor="bg-primary-100"
                  iconColor="text-primary-500"
                />
              </div>
            </TabsContent>
            <TabsContent
              className="flex-1 min-h-0 px-10 py-10 overflow-y-scroll"
              value="Buyer Persona"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-auto items-center">
                <InsightCard
                  data={
                    data?.[
                      "Buyer Persona"
                    ] ||
                    []
                  }
                  name="Buyer Persona"
                  icon={
                    faUser
                  }
                  bulletColor="text-primary-600"
                  iconBgColor="bg-primary-100"
                  iconColor="text-primary-500"
                />
              </div>
            </TabsContent>
            <TabsContent
              className="flex-1 min-h-0 px-10 py-10 overflow-y-scroll"
              value="Channels & Distribution"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-auto items-center">
                <InsightCard
                  data={
                    data?.[
                      "Channels & Distribution"
                    ] ||
                    []
                  }
                  name="Channels & Distribution"
                  icon={
                    faGift
                  }
                  bulletColor="text-primary-600"
                  iconBgColor="bg-primary-100"
                  iconColor="text-primary-500"
                />
              </div>
            </TabsContent>
            <TabsContent
              className="flex-1 min-h-0 px-10 py-10 overflow-y-scroll"
              value="Investment Opportunities"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-auto items-center">
                <InsightCard
                  data={
                    data?.[
                      "Investment Opportunities"
                    ] ||
                    []
                  }
                  name="Investment Opportunities"
                  icon={
                    faMoneyBill
                  }
                  bulletColor="text-primary-600"
                  iconBgColor="bg-primary-100"
                  iconColor="text-primary-500"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    );
  };

export default GeneratedData;
