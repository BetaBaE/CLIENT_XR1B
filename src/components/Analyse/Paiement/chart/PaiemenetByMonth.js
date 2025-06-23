import { ListBase, WithListContext } from "react-admin";
import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Legend,
  ResponsiveContainer,
  Brush,
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
    const {
      name,
      TTCPay,
      TTCfa,
      montantReglee,
      montantEnCours,
      montantSaisie,
    } = payload[0].payload;

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
        }}
      >
        <p style={{ color: "#0088FE", fontWeight: 600 }}>{`Mois : ${name}`}</p>
        <p>
          PAI :{" "}
          <span style={{ color: "#87ceeb", fontWeight: 600 }}>
            {formatNumber(TTCPay)}
          </span>
        </p>
        <p>
          FA :{" "}
          <span style={{ color: "#007f66", fontWeight: 600 }}>
            {formatNumber(TTCfa)}
          </span>
        </p>
        <p>
          R :{" "}
          <span style={{ color: "#88c888", fontWeight: 600 }}>
            {formatNumber(montantReglee)}
          </span>
        </p>
        <p>
          EC :{" "}
          <span style={{ color: "#ffa500", fontWeight: 600 }}>
            {formatNumber(montantEnCours)}
          </span>
        </p>
        <p>
          S :{" "}
          <span style={{ color: "#FF748B", fontWeight: 600 }}>
            {formatNumber(montantSaisie)}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const PaimentByMonth = () => {
  const [loading, setLoading] = useState(true);
  const [dataWithPercentageChange, setDataWithPercentageChange] = useState([]);
  const route = `atnerpaiements`;

  const processChartData = (data) => {
    if (!data || data.length === 0) return [];
    return data.map((item, index) => {
      if (index === 0) {
        return { ...item, percentageChange: 0 };
      }
      const previousValue = data[index - 1].TTCPay;
      const percentageChange =
        ((item.TTCPay - previousValue) / previousValue) * 100;
      return { ...item, percentageChange };
    });
  };

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
                <XAxis dataKey="name" />
                <YAxis tickFormatter={formatYAxisNumber} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  wrapperStyle={{ lineHeight: "40px" }}
                />
                <Brush dataKey="name" height={30} stroke="#0088FE" />
                <Bar
                  dataKey="TTCPay"
                  fill="#87ceeb"
                  barSize={15}
                  name="Paiement (PAI)"
                />
                <Bar
                  dataKey="TTCfa"
                  fill="#007f66"
                  barSize={15}
                  name="Facturation (FA)"
                />
                {/* <Line
                  type="monotone"
                  dataKey="TTCAvg3"
                  stroke="#000039"
                  name="Seuil Min Paiement (SMP)"
                /> */}

                <Bar
                  dataKey="montantReglee"
                  fill="#88c888"
                  barSize={15}
                  stackId="stack"
                  name="Reglee (R)"
                  // onClick={(e) => console.log(e)}
                />
                <Bar
                  dataKey="montantEnCours"
                  fill="#ffa500"
                  barSize={15}
                  stackId="stack"
                  name="En Cours (EC)"
                />
                <Bar
                  dataKey="montantSaisie"
                  fill="#FF748B"
                  barSize={15}
                  stackId="stack"
                  name="Saisie (S)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          );
        }}
      />
    </ListBase>
  );
};

export default PaimentByMonth;
