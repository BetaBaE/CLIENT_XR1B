import { useEffect, useMemo, useState } from "react";
import apiUrl from "../../../../config";
import "./styles.css";
import { formatNumber } from "../../globalFunction";

const ClotureChantier = ({ onRowClick, chantier }) => {
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
        const response1 = await fetch(
          `${apiUrl}/clotuerchantier?chantier={"id":"${chantier}"}`
        );
        const result1 = await response1.json();
        const formattedData1 = result1.map((four) => ({
          id: four.mois,
          HTMois: four.HT_mois,
          cumul: four.cumul1,
        }));
        setDataTable1(formattedData1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (chantier) {
      // Only fetch if id is not null
      fetchData();
    }
  }, [chantier]);

  // Sorting logic for table 1
  const sortedData1 = useMemo(() => {
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
              <th onClick={() => requestSort1("id")}>Mois</th>
              <th onClick={() => requestSort1("HTMois")}>HT de Mois</th>
              <th onClick={() => requestSort1("cumul")}>Cumul</th>
            </tr>
          </thead>
          <tbody>
            {sortedData1.map((item) => (
              <tr key={item.id} onClick={() => onRowClick(item.id)}>
                <td>{item.id}</td>
                <td style={{ textAlign: "right" }}>
                  {formatNumber(item.HTMois)}
                </td>
                <td style={{ textAlign: "right" }}>
                  {formatNumber(item.cumul)}
                </td>
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

export default ClotureChantier;