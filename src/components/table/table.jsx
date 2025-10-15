// src/components/table/table.jsx
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { columns as baseColumns } from "../../data/data";
import "../../scss/main.scss";

function normalizeRow(r) {
  return {
    id:
      r.id ??
      `${r.firstName ?? r.FirstName}-${r.lastName ?? r.LastName}-${
        r.startDate ?? r.StartDate ?? ""
      }`,
    firstName: r.firstName ?? r.FirstName ?? "",
    lastName: r.lastName ?? r.LastName ?? "",
    dateOfBirth: r.dateOfBirth ?? r.DateOfBirth ?? "", // idéalement: Date JS
    startDate: r.startDate ?? r.StartDate ?? "",
    street: r.street ?? r.Street ?? "",
    city: r.city ?? r.City ?? "",
    state: r.state ?? r.State ?? "",
    zipCode: r.zipCode ?? r.ZipCode ?? "",
    department: r.department ?? r.Department ?? "",
  };
}

// formatteur robuste: accepte Date, ISO string, timestamp, "DD/MM/YYYY"
function formatDateFR(value) {
  if (!value) return "";
  let d = value instanceof Date ? value : new Date(value);
  // Si la valeur est au format "DD/MM/YYYY" (string), on la retourne telle quelle
  if (typeof value === "string" && /^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    return value;
  }
  if (isNaN(d)) return String(value);
  return d.toLocaleDateString("fr-FR");
}

export default function Table({ pagination }) {
  const raw = useSelector((state) => state.employee) ?? [];
  const rows = React.useMemo(() => raw.map(normalizeRow), [raw]);

  const columns = React.useMemo(
    () =>
      baseColumns.map((col) =>
        col.field === "dateOfBirth" || col.field === "startDate"
          ? {
              ...col,
              // affichage en JJ/MM/AAAA dans la cellule
              valueFormatter: ({ value }) => formatDateFR(value),
              // tri correct si vos valeurs sont des Date ; sinon, retirez cette ligne
              sortComparator: (v1, v2) =>
                new Date(v1).getTime() - new Date(v2).getTime(),
            }
          : col
      ),
    []
  );

  return (
    <Box sx={{ height: 525, width: "80%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={Number(pagination) || 10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}

Table.propTypes = {
  pagination: PropTypes.number,
};
