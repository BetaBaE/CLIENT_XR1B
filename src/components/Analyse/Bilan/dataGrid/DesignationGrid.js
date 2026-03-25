import React, { useState, useMemo } from "react";
import { formatNumber } from "../../globalFunction";
import "./styles.css";

const DesignationGrid = ({ data, loading, onRowClick, selectedCode }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "total",
    direction: "descending",
  });

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

  return (
    <div className="my-custom-table" style={{ height: "100%" }}>
      <div className="table-container" style={{ height: "100%" }}>
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort("codeDesignation")}>Code</th>
              <th onClick={() => requestSort("designation")}>Désignation</th>
              <th onClick={() => requestSort("total")}>Total HT</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick(item.id)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedCode === item.id ? "#d0e8ff" : undefined,
                  fontWeight:
                    selectedCode === item.id ? "bold" : undefined,
                }}
              >
                <td>{item.codeDesignation}</td>
                <td>{item.designation}</td>
                <td style={{ textAlign: "right" }}>{formatNumber(item.total)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ backgroundColor: "#f2f2f2", fontWeight: "bold" }}>
              <td colSpan={2}>Total</td>
              <td style={{ textAlign: "right" }}>{formatNumber(total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default DesignationGrid;
