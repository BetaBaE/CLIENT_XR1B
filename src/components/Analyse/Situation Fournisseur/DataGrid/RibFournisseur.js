import React, { useState, useEffect } from "react";
import "./styles.css"; // Import the CSS for styling
import apiUrl from "../../../../config";

// SortableTable component
const RibFournisseur = ({ nom }) => {
  const [dataTable1, setDataTable1] = useState([]);
  const [sortConfig1, setSortConfig1] = useState({
    key: "id",
    direction: "ascending",
  });

  console.log("selectedId", nom);

  const [loading, setLoading] = useState(true);

  // Fetch data from two different endpoints
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          `${apiUrl}/ribfournisseur?fournisseur=%7B%22nom%22%3A%22${nom}%22%7D&`
        );
        const result1 = await response1.json();
        const formattedData1 = result1.map((four) => ({
          id: four.rib,
          etat: four.etat,
          Redacteur: four.Redacteur,
          Validateur: four.Validateur,
          datecreation: four.datecreation,
          DateModification: four.DateModification,
        }));
        setDataTable1(formattedData1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (nom) {
      // Only fetch if id is not null
      fetchData();
    }
  }, [nom]);

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
  console.log(dataTable1);
  return dataTable1.length > 0 ? (
    <div className="my-custom-table">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort1("rib")}>rib</th>
              <th onClick={() => requestSort1("etat")}>Etat</th>
              <th onClick={() => requestSort1("Redacteur")}>Redacteur</th>
              <th onClick={() => requestSort1("Validateur")}>Validateur</th>
              {/* <th onClick={() => requestSort1("datecreation")}>
                date creation
              </th>
              <th onClick={() => requestSort1("DateModification")}>
                DateModification
              </th> */}
            </tr>
          </thead>
          <tbody>
            {sortedData1.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.etat}</td>
                <td>{item.Redacteur}</td>
                <td>{item.Validateur}</td>
                {/* <td>{item.datecreation}</td>
                <td>{item.DateModification}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div>Aucune statistique disponible</div>
  );
};

export default RibFournisseur;
