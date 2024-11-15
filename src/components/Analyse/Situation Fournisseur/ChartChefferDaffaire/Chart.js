import { ListBase, WithListContext } from "react-admin";
import React, { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Legend,
  ResponsiveContainer,
  Brush,
  Line,
  ComposedChart,
} from "recharts";

const formatNumber = (num) => {
  const [integerPart, decimalPart] = num.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${formattedInteger}.${decimalPart}`;
};

const formatYAxisNumber = (num) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, percentageChange } = payload[0].payload;

    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "5px",
          border: "0.1px solid #000",
        }}
      >
        <p style={{ color: "#0088FE", fontWeight: 700 }}>{`${name}`}</p>
        <p>
          {`Net: `}
          <span style={{ color: "#0088FE", fontWeight: 600 }}>
            {formatNumber(payload[0].value)}
          </span>
        </p>
        <p>
          {`Change: `}
          <span
            style={{
              color: percentageChange >= 0 ? "green" : "red",
              fontWeight: 600,
            }}
          >
            {percentageChange.toFixed(2)}%
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const ChartChefferDaffaire = ({ nom }) => {
  const [loading, setLoading] = useState(true);
  const [dataWithPercentageChange, setDataWithPercentageChange] = useState([]);
  const route = `chefferDAffaire?fournisseur=%7B%22nom%22%3A%22${nom}%22%7D&`;

  useEffect(() => {
    // Clear data and set loading when `nom` changes
    setLoading(true);
    setDataWithPercentageChange([]);
  }, [nom]);

  const processChartData = (data) => {
    if (!data || data.length === 0) return [];

    return data.map((item, index) => {
      if (index === 0) {
        return { ...item, percentageChange: 0 };
      }
      const previousValue = data[index - 1].TTC;
      const percentageChange =
        ((item.TTC - previousValue) / previousValue) * 100;
      return { ...item, percentageChange };
    });
  };

  return (
    <ListBase resource={route}>
      <WithListContext
        render={({ data }) => {
          // Process data when available
          if (data && loading) {
            setDataWithPercentageChange(processChartData(data));
            setLoading(false);
          }

          if (loading) {
            return <div>Loading...</div>;
          }

          if (!dataWithPercentageChange.length || data.length === 0) {
            return <div>Aucune statistique disponible</div>;
          }

          return (
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart
                width={600}
                height={300}
                data={dataWithPercentageChange}
                margin={{
                  top: 5,
                  right: 65,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid stroke="#eee" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={formatYAxisNumber} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  wrapperStyle={{ lineHeight: "40px" }}
                />
                <Brush dataKey="name" height={30} stroke="#0088FE" />
                <Bar dataKey="TTC" fill="#87ceeb" barSize={15} />
                <Line type="monotone" dataKey="TTC" stroke="#000039" />
              </ComposedChart>
            </ResponsiveContainer>
          );
        }}
      />
    </ListBase>
  );
};

export default ChartChefferDaffaire;
