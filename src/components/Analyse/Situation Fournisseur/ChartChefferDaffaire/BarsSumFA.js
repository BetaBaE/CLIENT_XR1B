import { ListBase, WithListContext } from "ra-core";
import React, { useEffect, useState } from "react";
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
          backgroundColor: "#fff",
          color: "#000", // Ensure text stays black in dark mode
          padding: "6px 10px",
          border: "1px solid #000",
          fontSize: "14px",
          borderRadius: "4px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          fontWeight: 700,
        }}
      >
        <p style={{ color: "#0088FE", fontWeight: 700 }}>{`${name}`}</p>
        {/* Display the name of the hovered bar */}
        <p>
          {`Net: `}
          <span style={{ color: "#0088FE", fontWeight: 600 }}>
            {formatNumber(payload[0].value)}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const BarsSumFA = ({ nom }) => {
  let route = `fastatebyFournisseur?fournisseur=%7B%22nom%22%3A%22${nom}%22%7D&`;
  const [loading, setLoading] = useState(true);
  const [dataWithPercentageChange, setDataWithPercentageChange] = useState([]);

  useEffect(() => {
    if (!loading && dataWithPercentageChange.length === 0) {
      setLoading(false);
    }
  }, [dataWithPercentageChange, loading]);

  return (
    <ListBase resource={route} disableSyncWithLocation>
      <WithListContext
        render={({ data }) => {
          if (data && loading) {
            setDataWithPercentageChange(data);
            setLoading(false);
          }

          if (loading) {
            return <div>Loading...</div>;
          }

          if (!dataWithPercentageChange.length || data.length === 0) {
            return <div>Aucune statistique disponible</div>;
          }
          if (!data || data.length === 0) {
            return <div>Aucune statistique disponible</div>;
          }
          return (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart width={600} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis tickFormatter={formatYAxisNumber} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <CartesianGrid stroke="#eee" />
                <Bar dataKey="NetApaye" fill="#0088FE" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          );
        }}
      />
    </ListBase>
  );
};

export default BarsSumFA;
