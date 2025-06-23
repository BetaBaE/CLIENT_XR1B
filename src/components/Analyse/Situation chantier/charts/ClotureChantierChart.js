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
import { formatNumber } from "../../globalFunction";

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
    const { mois, HT_mois, cumul1 } = payload[0].payload;

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
        <p style={{ color: "#0088FE", fontWeight: 700 }}>{`${mois}`}</p>
        <p>
          {`HT: `}
          <span style={{ color: "#0088FE", fontWeight: 600 }}>
            {formatNumber(HT_mois)}
          </span>
        </p>
        <p>
          {`Cumul: `}
          <span style={{ color: "#000039", fontWeight: 600 }}>
            {formatNumber(cumul1)}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const ClotureChantierChart = ({ chantier }) => {
  const [loading, setLoading] = useState(true);
  const [dataWithPercentageChange, setDataWithPercentageChange] = useState([]);
  // chantier={%22id%22:%22A-9995%22}
  const route = `clotuerchantier?chantier={%22id%22:%22${chantier}%22}&`;

  const processChartData = (data) => {
    if (!data || data.length === 0) return [];
    return data.map((item, index) => {
      if (index === 0) {
        return { ...item, percentageChange: 0 };
      }
      const previousValue = data[index - 1].HT_mois;
      const percentageChange =
        ((item.HT_mois - previousValue) / previousValue) * 100;
      return { ...item, percentageChange };
    });
  };

  useEffect(() => {
    setLoading(true);
    setDataWithPercentageChange([]);
  }, [chantier]);
  return (
    <ListBase resource={route}>
      <WithListContext
        render={({ data }) => {
          if (loading && data) {
            const processedData = processChartData(data);
            setDataWithPercentageChange(processedData);
            setLoading(false);
          }

          if (loading) {
            return <div>Loading...</div>;
          }

          if (!dataWithPercentageChange.length) {
            return <div>Aucune statistique disponible</div>;
          }

          return (
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart
                data={dataWithPercentageChange}
                margin={{ top: 5, right: 65, left: 20, bottom: 5 }}
              >
                <CartesianGrid stroke="#eee" />
                <XAxis dataKey="mois" />
                <YAxis tickFormatter={formatYAxisNumber} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  wrapperStyle={{ lineHeight: "40px" }}
                />
                <Brush dataKey="mois" height={30} stroke="#0088FE" />
                <Bar dataKey="HT_mois" fill="#87ceeb" barSize={15} name="HT" />
                <Line dataKey="cumul1" stroke="#000039" name="Cumul" />
              </ComposedChart>
            </ResponsiveContainer>
          );
        }}
      />
    </ListBase>
  );
};

export default ClotureChantierChart;
