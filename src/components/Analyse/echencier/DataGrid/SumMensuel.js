import React, { useState, useEffect } from "react";
import "./styles.css"; // Import the CSS for styling
import apiUrl from "../../../../config";
import { formatNumber } from "../../globalFunction";

// SortableTable component
const TableSumMensuel = ({ onRowClick }) => {
  const [dataTable1, setDataTable1] = useState([]);
  const [sortConfig1, setSortConfig1] = useState({
    key: "id",
    direction: "ascending",
  });
  const [loading, setLoading] = useState(true);

  // Fetch data from two different endpoints
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(`${apiUrl}/summensuel`);
        const result1 = await response1.json();
        const formattedData1 = result1.map((four) => ({
          id: four.id,
          mois: four.id.split("T")[0],
          TTCMois: four.TTCMois,
          anc: four.anc,
          TOTAL: four.TOTAL,
          prcnt: four.prcnt,
        }));
        setDataTable1(formattedData1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sorting logic for table 1
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

  return (
    <div className="my-custom-table">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort1("id")}>Mois</th>
              <th onClick={() => requestSort1("TTCMois")}>TTC/Mois</th>
              <th onClick={() => requestSort1("anc")}>Anc/Mois</th>
              <th onClick={() => requestSort1("TOTAL")}>Total</th>
              <th onClick={() => requestSort1("prcnt")}>%</th>
            </tr>
          </thead>
          <tbody>
            {sortedData1.map((item) => (
              <tr key={item.id} onClick={() => onRowClick(item.id)}>
                <td>{item.mois}</td>
                <td style={{ textAlign: "right" }}>
                  {formatNumber(item.TTCMois)}
                </td>
                <td>{item.anc}</td>
                <td style={{ textAlign: "right" }}>
                  {formatNumber(item.TOTAL)}
                </td>
                <td>{`${item.prcnt}%`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSumMensuel;
