import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
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
    dateOfBirth: r.dateOfBirth ?? r.DateOfBirth ?? "",
    startDate: r.startDate ?? r.StartDate ?? "",
    street: r.street ?? r.Street ?? "",
    city: r.city ?? r.City ?? "",
    state: r.state ?? r.State ?? "",
    zipCode: r.zipCode ?? r.ZipCode ?? "",
    department: r.department ?? r.Department ?? "",
  };
}

// formatteur robuste : accepte Date, ISO string, timestamp, "DD/MM/YYYY"
function formatDateFR(value) {
  if (!value) return "";
  let d = value instanceof Date ? value : new Date(value);
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
              valueFormatter: ({ value }) => formatDateFR(value),
              sortComparator: (v1, v2) =>
                new Date(v1).getTime() - new Date(v2).getTime(),
            }
          : col
      ),
    []
  );

  // Détection de la taille d’écran
  const isXs = useMediaQuery("(max-width:480px)");
  const isSm = useMediaQuery("(max-width:768px)");

  // Colonnes visibles selon la taille d’écran
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});

  React.useEffect(() => {
    if (isSm) {
      // Mobile / tablette : vue compacte
      setColumnVisibilityModel({
        firstName: true,
        lastName: true,
        department: true,
        startDate: true,
        dateOfBirth: !isXs,
        street: false,
        city: false,
        state: false,
        zipCode: false,
      });
    } else {
      // Desktop : tout visible
      setColumnVisibilityModel({
        firstName: true,
        lastName: true,
        department: true,
        startDate: true,
        dateOfBirth: true,
        street: true,
        city: true,
        state: true,
        zipCode: true,
      });
    }
  }, [isSm, isXs]);

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "95%", md: "80%" },
        height: { xs: "auto", md: 525 },
        minWidth: 0,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: { pageSize: Number(pagination) || 10 },
        }}
        rowsPerPageOptions={[5, 10, 25, 50]}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(m) => setColumnVisibilityModel(m)}
        autoHeight={isSm}
        density={isSm ? "compact" : "standard"}
        hideFooterSelectedRowCount
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            fontSize: { xs: "0.9rem", sm: "1rem" },
          },
          "& .MuiDataGrid-cell": {
            fontSize: { xs: "0.9rem", sm: "1rem" },
            py: { xs: 0.5, sm: 1 },
          },
          // Forcer l’affichage du sélecteur “Rows per page” sur mobile
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-input": {
            display: "inline-flex !important",
          },
          "& .MuiTablePagination-toolbar": {
            flexWrap: "wrap",
            rowGap: 0.5,
            justifyContent: "center",
          },
        }}
      />
    </Box>
  );
}

Table.propTypes = {
  pagination: PropTypes.number,
};
