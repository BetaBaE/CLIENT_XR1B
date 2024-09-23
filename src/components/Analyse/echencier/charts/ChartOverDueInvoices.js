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

const ChartOverDueInvoices = () => {
  const [chartWidth, setChartWidth] = useState("100%");
  return (
    <ListBase resource="overdueInvoices" disableSyncWithLocation>
      {/* <ResponsiveContainer width="100%" height={300}> */}
      <WithListContext
        render={({ data }) => (
          <BarChart
            width={600}
            height={300}
            margin={{
              left: 40,
            }}
            data={data}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#eee" />
            <Bar dataKey="montant" fill="#8884d8" barSize={20} />
          </BarChart>
        )}
      />
      {/* </ResponsiveContainer> */}
    </ListBase>
  );
};

export default ChartOverDueInvoices;
