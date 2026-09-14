import React, { useState, useEffect } from "react";
import "./styles.css";
import apiUrl from "../../../../config";
import { formatNumber } from "../../globalFunction";

const DetailPaiementByMonth = ({ nom, mois }) => {
  const [dataTable1, setDataTable1] = useState([]);
  const [sortConfig1, setSortConfig1] = useState({
    key: "DateDouc",
    direction: "descending",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fournisseur = encodeURIComponent(JSON.stringify({ nom }));
        const response = await fetch(
          `${apiUrl}/paiementdetailbyfournisseur?fournisseur=${fournisseur}&mois=${encodeURIComponent(
            mois
          )}`
        );
        const result = await response.json();
        setDataTable1(
          result.map((row) => ({
            id: row.id,
            CODEDOCUTIL: row.CODEDOCUTIL,
            DateDouc: row.DateDouc,
            CODECHT: row.CODECHT,
            TOTALTTC: row.TOTALTTC,
            NETAPAYER: row.NETAPAYER,
            RAS: row.RAS,
            RasIR: row.RasIR,
            etat: row.etat,
            typeDoc: row.typeDoc,
          }))
        );
      } catch (error) {
        console.error("Error fetching paiement detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (nom && mois) {
      fetchData();
    }
  }, [nom, mois]);

  const sortedData1 = React.useMemo(() => {
    let sortableItems = [...dataTable1];
    if (sortConfig1 !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig1.key] < b[sortConfig1.key]) {
          return sortConfig1.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig1.key] > b[sortConfig1.key]) {
          return sortConfig1.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [dataTable1, sortConfig1]);

  const requestSort1 = (key) => {
    let direction = "ascending";
    if (
      sortConfig1 &&
      sortConfig1.key === key &&
      sortConfig1.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig1({ key, direction });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return dataTable1.length > 0 ? (
    <div className="my-custom-table">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort1("CODEDOCUTIL")}>Doc</th>
              <th onClick={() => requestSort1("typeDoc")}>Type</th>
              <th onClick={() => requestSort1("DateDouc")}>Date</th>
              <th onClick={() => requestSort1("CODECHT")}>Chantier</th>
              <th onClick={() => requestSort1("TOTALTTC")}>TTC</th>
              <th onClick={() => requestSort1("NETAPAYER")}>Net</th>
              <th onClick={() => requestSort1("RAS")}>RAS</th>
              <th onClick={() => requestSort1("RasIR")}>RasIR</th>
              <th onClick={() => requestSort1("etat")}>Etat</th>
            </tr>
          </thead>
          <tbody>
            {sortedData1.map((item) => (
              <tr key={item.id}>
                <td>{item.CODEDOCUTIL}</td>
                <td>{item.typeDoc}</td>
                <td>
                  {item.DateDouc
                    ? String(item.DateDouc).split("T")[0]
                    : ""}
                </td>
                <td>{item.CODECHT}</td>
                <td style={{ textAlign: "right" }}>
                  {formatNumber(item.TOTALTTC || 0)}
                </td>
                <td style={{ textAlign: "right" }}>
                  {formatNumber(item.NETAPAYER || 0)}
                </td>
                <td style={{ textAlign: "right" }}>
                  {formatNumber(item.RAS || 0)}
                </td>
                <td style={{ textAlign: "right" }}>
                  {formatNumber(item.RasIR || 0)}
                </td>
                <td>{item.etat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div>Aucune Données disponible</div>
  );
};

export default DetailPaiementByMonth;
