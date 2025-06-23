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
  ResponsiveContainer,
} from "recharts";

// Function to format numbers with commas
const formatNumber = (num) => {
  const [integerPart, decimalPart] = num.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${formattedInteger}.${decimalPart}`;
};

// Function to format Y-axis numbers
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

// Custom tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name } = payload[0].payload;

    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "5px",
          border: "0.1px solid #000",
        }}
      >
        <p style={{ color: "#0088FE", fontWeight: 700 }}>{`${name}`}</p>
        <p style={{ color: "#000", fontWeight: 500 }}>
          {`Montant Saisie: `}
          <span style={{ color: "#88c8ff", fontWeight: 600 }}>
            {formatNumber(payload[0].value)}
          </span>
        </p>
        <p style={{ color: "#000", fontWeight: 500 }}>
          {`Montant En cours: `}
          <span style={{ color: "#003461", fontWeight: 600 }}>
            {formatNumber(payload[1].value)}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

// Custom legend component
const CustomLegend = (props) => {
  const { payload } = props;

  // Map data keys to display names
  const legendLabels = {
    montantSaisie: "Montant Saisie",
    montantEnCours: "Montant En Cours",
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ul style={{ listStyleType: "none", padding: 0, display: "flex" }}>
        {payload.map((entry, index) => (
          <li
            key={`item-${index}`}
            style={{ marginRight: 20, display: "flex", alignItems: "center" }}
          >
            <span
              style={{
                backgroundColor: entry.color,
                width: 12,
                height: 12,
                // display: "inline-block",
                marginRight: 5,
              }}
            />
            <span style={{ fontWeight: "normal", color: entry.color }}>
              {legendLabels[entry.dataKey] || entry.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main chart component
const ChartOverDueInvoices = () => {
  return (
    <ListBase resource="overdueInvoices" disableSyncWithLocation>
      <WithListContext
        render={({ data }) => (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart width={600} height={300} data={data}>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatYAxisNumber} />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
              <CartesianGrid stroke="#eee" />
              <Bar
                dataKey="montantSaisie"
                fill="#88c8ff"
                barSize={30}
                stackId="stack"
                onClick={(e) => console.log(e)}
              />
              <Bar
                dataKey="montantEnCours"
                fill="#003461"
                barSize={30}
                stackId="stack"
                onClick={(e) => console.log(e)}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      />
    </ListBase>
  );
};

export default ChartOverDueInvoices;
