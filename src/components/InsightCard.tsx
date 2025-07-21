import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

type InsightCardProps =
  {
    name: string;
    data: string[];
    icon: IconDefinition;
    bulletColor?: string;
    iconBgColor?: string;
    iconColor?: string;
  };

const InsightCard: React.FC<
  InsightCardProps
> = ({
  name,
  data,
  icon,
  bulletColor = "text-green-500",
  iconBgColor = "bg-green-100",
  iconColor = "text-green-600",
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div
            className={`w-8 h-8 rounded-full ${iconBgColor} flex items-center justify-center mr-3`}
          >
            <FontAwesomeIcon
              icon={
                icon
              }
              className={`${iconColor} w-5 h-5`}
            />
          </div>
          <h3 className="text-lg font-medium text-gray-800">
            {
              name
            }
          </h3>
        </div>
        <ul className="space-y-3">
          {data?.map(
            (
              item,
              index
            ) => (
              <li
                key={
                  index
                }
                className="flex items-start"
              >
                <FontAwesomeIcon
                  icon={
                    faCircle
                  }
                  className={`text-xs mt-1.5 mr-2 w-2 h-2 ${bulletColor}`}
                />
                <p className="text-gray-700">
                  {
                    item
                  }
                </p>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default InsightCard;
