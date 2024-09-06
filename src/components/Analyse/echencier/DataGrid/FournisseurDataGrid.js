import React, { useState, useEffect } from "react";
import "./styles.css"; // Import the CSS for styling
import apiUrl from "../../../../config";

// SortableTable component
const SortableTable = () => {
  const [dataTable1, setDataTable1] = useState([]);
  const [dataTable2, setDataTable2] = useState([]);
  const [sortConfig1, setSortConfig1] = useState({
    key: "id",
    direction: "ascending",
  });
  const [sortConfig2, setSortConfig2] = useState({
    key: "id",
    direction: "ascending",
  });
  const [loading, setLoading] = useState(true);

  // Fetch data from two different endpoints
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(`${apiUrl}/sumfournisseur`);
        const result1 = await response1.json();
        const formattedData1 = result1.map((four) => ({
          id: four.id,
          nom: four.nom,
          total: four.NetApayer,
        }));
        setDataTable1(formattedData1);

        const response2 = await fetch(`${apiUrl}/sumchantier`);
        const result2 = await response2.json();
        const formattedData2 = result2.map((cht) => ({
          id: cht.id,
          nom: cht.nomChantier,
          total: cht.NetApayer,
        }));
        setDataTable2(formattedData2);
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

  // Sorting logic for table 2
  const sortedData2 = React.useMemo(() => {
    let sortableItems = [...dataTable2];
    if (sortConfig2 !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig2.key] < b[sortConfig2.key]) {
          return sortConfig2.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig2.key] > b[sortConfig2.key]) {
          return sortConfig2.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [dataTable2, sortConfig2]);

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

  const requestSort2 = (key) => {
    let direction = "ascending";
    if (
      sortConfig2 &&
      sortConfig2.key === key &&
      sortConfig2.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig2({ key, direction });
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
              <th onClick={() => requestSort1("nom")}>Fournisseur</th>
              <th onClick={() => requestSort1("total")}>NetApayer</th>
            </tr>
          </thead>
          <tbody>
            {sortedData1.map((item) => (
              <tr key={item.id}>
                <td>{item.nom}</td>
                <td>{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort2("nom")}>Chantier</th>
              <th onClick={() => requestSort2("total")}>NetApayer</th>
            </tr>
          </thead>
          <tbody>
            {sortedData2.map((item) => (
              <tr key={item.id}>
                <td>{item.nom}</td>
                <td>{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SortableTable;
