import React, { useState, useEffect } from "react";
import "./styles.css"; // Import the CSS for styling
import apiUrl from "../../../../config";

// SortableTable component
const SumForMonth = ({ id }) => {
  const [dataTable1, setDataTable1] = useState([]);
  const [sortConfig1, setSortConfig1] = useState({
    key: "id",
    direction: "ascending",
  });

  console.log("selectedId", id);

  const [loading, setLoading] = useState(true);

  // Fetch data from two different endpoints
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(`${apiUrl}/sumformonth/${id}`);
        const result1 = await response1.json();
        const formattedData1 = result1.map((four) => ({
          id: four.id,
          nom: four.id,
          TotalFournisseur: four.TotalFournisseur,
          TotalMois: four.TotalMois,
        }));
        setDataTable1(formattedData1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      // Only fetch if id is not null
      fetchData();
    }
  }, [id]);

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
              <th onClick={() => requestSort1("id")}>Fournisseur</th>
              <th onClick={() => requestSort1("TotalFournisseur")}>
                Tot. Four
              </th>
              <th onClick={() => requestSort1("TotalMois")}>Tot. Mois</th>
            </tr>
          </thead>
          <tbody>
            {sortedData1.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.TotalFournisseur}</td>
                <td>{item.TotalMois}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SumForMonth;
