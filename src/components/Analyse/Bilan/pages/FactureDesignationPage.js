import React, { useState, useEffect } from "react";
import { Title } from "react-admin";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import apiUrl from "../../../../config";
import DesignationGrid from "../dataGrid/DesignationGrid";
import ChantierDetail from "../dataGrid/ChantierDetail";
import FournisseurDetail from "../dataGrid/FournisseurDetail";

const FactureDesignationPage = () => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [designationData, setDesignationData] = useState([]);
  const [loadingYears, setLoadingYears] = useState(true);
  const [loadingDesignation, setLoadingDesignation] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);

  // Load available years on mount — auto-select the max (first, ORDER BY DESC)
  useEffect(() => {
    fetch(`${apiUrl}/facturedesignation/years`)
      .then((r) => r.json())
      .then((result) => {
        const yearList = result.map((r) => r.year);
        setYears(yearList);
        if (yearList.length > 0) {
          setSelectedYear(yearList[0]); // max year = first item (ORDER BY year DESC)
        }
      })
      .catch(console.error)
      .finally(() => setLoadingYears(false));
  }, []);

  // Load designation data when year changes
  useEffect(() => {
    if (!selectedYear) return;
    setLoadingDesignation(true);
    setSelectedCode(null);
    setSelectedLabel(null);
    fetch(`${apiUrl}/facturedesignation/${selectedYear}`)
      .then((r) => r.json())
      .then((result) => {
        setDesignationData(
          result.map((row) => ({
            id: row.id,
            designation: row.designation,
            codeDesignation: row.codeDesignation,
            total: row.total,
          }))
        );
      })
      .catch(console.error)
      .finally(() => setLoadingDesignation(false));
  }, [selectedYear]);

  const handleRowClick = (id) => {
    const found = designationData.find((d) => d.id === id);
    setSelectedCode(id);
    setSelectedLabel(found?.designation ?? id);
  };

  const detailTitle = "Cliquez sur une désignation";

  return (
    <Box sx={{ p: 2 }}>
      <Title title="Factures par Désignation" />

      {/* Year selector */}
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel id="year-label">Année</InputLabel>
          <Select
            labelId="year-label"
            value={selectedYear ?? ""}
            label="Année"
            onChange={(e) => setSelectedYear(e.target.value)}
            disabled={loadingYears}
          >
            {years.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedCode && (
          <Box sx={{ color: "text.secondary", fontSize: 14 }}>
            Désignation sélectionnée :{" "}
            <strong>{selectedLabel}</strong>
          </Box>
        )}
      </Box>

      {/* Main layout */}
      <Grid container spacing={2} sx={{ height: "calc(100vh - 140px)" }}>
        {/* Left: ~40% - Designation table */}
        <Grid item xs={12} md={5} sx={{ height: "100%" }}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardHeader
              title={`Désignations — ${selectedYear ?? "..."}`}
              titleTypographyProps={{ variant: "subtitle1", fontWeight: "bold" }}
            />
            <CardContent sx={{ flex: 1, overflow: "hidden", p: 1 }}>
              <DesignationGrid
                data={designationData}
                loading={loadingDesignation}
                onRowClick={handleRowClick}
                selectedCode={selectedCode}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Right: ~60% - Chantier + Fournisseur stacked */}
        <Grid
          item
          xs={12}
          md={7}
          sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* Top right: Chantier */}
          <Card sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <CardHeader
              title={
                selectedCode ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `Chantiers — <strong>${selectedLabel}</strong> (${selectedYear})`,
                    }}
                  />
                ) : (
                  detailTitle
                )
              }
              titleTypographyProps={{ variant: "subtitle1", fontWeight: "bold" }}
            />
            <CardContent sx={{ flex: 1, overflow: "hidden", p: 1 }}>
              <ChantierDetail year={selectedYear} designationId={selectedCode} />
            </CardContent>
          </Card>

          {/* Bottom right: Fournisseur */}
          <Card sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <CardHeader
              title={
                selectedCode ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `Fournisseurs — <strong>${selectedLabel}</strong> (${selectedYear})`,
                    }}
                  />
                ) : (
                  detailTitle
                )
              }
              titleTypographyProps={{ variant: "subtitle1", fontWeight: "bold" }}
            />
            <CardContent sx={{ flex: 1, overflow: "hidden", p: 1 }}>
              <FournisseurDetail year={selectedYear} designationId={selectedCode} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FactureDesignationPage;
