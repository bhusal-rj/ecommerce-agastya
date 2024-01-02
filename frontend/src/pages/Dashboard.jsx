import React from "react";
import Block from "../components/dashboardComponents/Block";
import Card from "../components/dashboardComponents/Card";
import Chart from "../components/dashboardComponents/Orders";
import { MdProductionQuantityLimits } from "react-icons/md";
import { GoGraph } from "react-icons/go";

const BlockBar = [
  {
    label: 200,
    isActive: "true",
    icon: GoGraph,
    percentage: "+30%",
    message: "This Month",
    text: "Total Orders",

    list: MdProductionQuantityLimits,
  },
  {
    label: "200",
    isActive: "true",
    icon: GoGraph,
    percentage: "+30%",
    message: "This Month",
    text: "Total Orders",
    list: MdProductionQuantityLimits,
  },
  ,
  {
    label: "200",
    isActive: "true",
    icon: GoGraph,
    percentage: "+30%",
    message: "This Month",
    text: "Total Orders",

    list: MdProductionQuantityLimits,
  },
];

const Dashboard = () => {
  return (
    <div className="flex-col w-4/5">
      <div className="mt-5 mr-20">
        <p className="text-2xl">Welcome Back, Deepak</p>
      </div>
      <div className="max-w-full flex mt-6 mr-20 justify-between">
        {BlockBar.map((items, index) => {
          return <Block key={index} Data={items} />;
        })}
      </div>
      <div className="mr-20">
        <div className=" mt-3">
          <p className="text-2xl font font-md">Orders</p>
        </div>
        <Chart />
      </div>
      <Card />
    </div>
  );
};

export default Dashboard;
