import React, { useState, useEffect } from "react";
// import "./styles.css"; // Import the CSS for styling
import apiUrl from "../../../../config";
import { formatNumber } from "../../globalFunction";

// SortableTable component
const DetailCheque = ({ sommeCheque }) => {
  const [dataTable1, setDataTable1] = useState([]);
  const [sortConfig1, setSortConfig1] = useState({
    key: "Montant",
    direction: "descending",
  });

  const [loading, setLoading] = useState(true);
  const [somme, setSomme] = useState(0);

  // Fetch data from two different endpoints
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(`${apiUrl}/chequedetail`);
        const result1 = await response1.json();
        let res = 0;
        result1.forEach((element) => {
          res = element.Montant + res;
        });
        setSomme(res);

        const formattedData1 = result1.map((four) => ({
          id: four.cheque,
          jrpasse: four.jrpasse,
          datecheque: four.datecheque,
          cheque: four.cheque,
          BANK: four.BANK,
          Montant: four.Montant,
          NOM: four.NOM,
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
  sommeCheque(somme);
  return (
    <div className="my-custom-table">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort1("jrpasse")}>Jrs</th>
              <th onClick={() => requestSort1("datecheque")}>Date cheque</th>
              <th onClick={() => requestSort1("cheque")}>N° cheque</th>
              <th onClick={() => requestSort1("BANK")}>Bank</th>
              <th onClick={() => requestSort1("Montant")}>Montant</th>
              <th onClick={() => requestSort1("NOM")}>Fournisseur</th>
            </tr>
          </thead>
          <tbody>
            {sortedData1.map((item) => (
              <tr key={item.id}>
                <td>
                  <b>{item.jrpasse}</b>
                </td>
                <td>{item.datecheque.split("T00")[0]}</td>
                <td>{item.cheque}</td>
                <td>{item.BANK}</td>
                <td style={{ textAlign: "right" }}>
                  {formatNumber(item.Montant)}
                </td>
                <td>{item.NOM}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailCheque;
