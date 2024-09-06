import { ListBase, WithListContext } from "ra-core";
import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const FruitChart = () => (
  <ListBase resource="overdueInvoices" disableSyncWithLocation>
    <WithListContext
      render={({ data }) => (
        <BarChart
          margin={{
            top: 10,
            left: 40,
            bottom: 10,
          }}
          width={500}
          height={300}
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
  </ListBase>
);

export default FruitChart;
