import { ListBase, WithListContext } from "ra-core";
import React from "react";
import { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const formatNumber = (num) => {
  // Split the number into integer and decimal parts
  const [integerPart, decimalPart] = num.toFixed(2).split(".");

  // Format the integer part with spaces as thousand separators
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // Return the formatted number with the decimal part
  return `${formattedInteger}.${decimalPart}`;
};

const formatYAxisNumber = (num) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B"; // Billions
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M"; // Millions
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K"; // Thousands
  } else {
    return num.toString(); // Return the number as is for smaller values
  }
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name } = payload[0].payload; // Get the name from the payload

    return (
      <div
        style={{
          backgroundColor: "#fff", // Background color for the tooltip
          padding: "5px",
          border: "0.1px solid #000", // Border color for the tooltip
        }}
      >
        <p style={{ color: "#0088FE", fontWeight: 700 }}>{`${name}`}</p>{" "}
        {/* Display the name of the hovered bar */}
        <p>
          {`Net: `}
          <span style={{ color: "#0088FE", fontWeight: 600 }}>
            {formatNumber(payload[0].value)}
          </span>
        </p>{" "}
      </div>
    );
  }
  return null;
};

const ChartOverDueInvoices = () => {
  return (
    <ListBase resource="overdueInvoices" disableSyncWithLocation>
      <WithListContext
        render={({ data }) => (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={600}
              height={300}
              // margin={{
              //   left: 10,
              // }}
              data={data}
            >
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatYAxisNumber} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <CartesianGrid stroke="#eee" />
              <Bar dataKey="montant" fill="#0088FE" barSize={30} />
            </BarChart>

            {/* <p className="content">{`Uv of "${activeItem.name}": ${activeItem.uv}`}</p> */}
          </ResponsiveContainer>
        )}
      />
      {/* </ResponsiveContainer> */}
    </ListBase>
  );
};

export default ChartOverDueInvoices;
