import React, { useState, useEffect, useMemo } from "react";
import { formatNumber } from "../../globalFunction";
import apiUrl from "../../../../config";
import "./styles.css";

const ChantierDetail = ({ year, designationId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "total",
    direction: "descending",
  });

  useEffect(() => {
    if (!year || !designationId) return;
    setLoading(true);
    fetch(`${apiUrl}/facturedesignation/${year}/${designationId}/chantier`)
      .then((r) => r.json())
      .then((result) => {
        setData(
          result.map((row) => ({
            id: row.id,
            codecht: row.codecht,
            libelle: row.LIBELLE,
            total: row.total,
          }))
        );
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [year, designationId]);

  const sortedData = useMemo(() => {
    let sortable = [...data];
    if (sortConfig) {
      sortable.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const total = data.reduce((sum, item) => sum + (item.total || 0), 0);

  if (loading) return <div>Chargement...</div>;
  if (!designationId) return <div>—</div>;

  return (
    <div className="my-custom-table">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort("libelle")}>Chantier</th>
              <th onClick={() => requestSort("total")}>Total HT</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr key={item.id}>
                <td>{item.libelle ?? `Chantier #${item.codecht}`}</td>
                <td style={{ textAlign: "right" }}>{formatNumber(item.total)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ backgroundColor: "#f2f2f2", fontWeight: "bold" }}>
              <td>Total</td>
              <td style={{ textAlign: "right" }}>{formatNumber(total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ChantierDetail;
