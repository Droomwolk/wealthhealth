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

function formatDateFR(value) {
  if (!value) return "";
  let d = value instanceof Date ? value : new Date(value);
  if (typeof value === "string" && /^\d{2}\/\d{2}\/\d{4}$/.test(value))
    return value;
  if (isNaN(d)) return String(value);
  return d.toLocaleDateString("fr-FR");
}

export default function Table({ pagination }) {
  const raw = useSelector((state) => state.employee) ?? [];
  const rows = React.useMemo(() => raw.map(normalizeRow), [raw]);

  const columns = React.useMemo(
    () =>
      baseColumns.map((col) => {
        const common = { flex: 1, minWidth: 140 };
        if (col.field === "dateOfBirth" || col.field === "startDate") {
          return {
            ...col,
            ...common,
            valueFormatter: ({ value }) => formatDateFR(value),
            sortComparator: (v1, v2) =>
              new Date(v1).getTime() - new Date(v2).getTime(),
          };
        }
        return { ...col, ...common };
      }),
    []
  );

  const isSm = useMediaQuery("(max-width:768px)");
  const isXs = useMediaQuery("(max-width:480px)");

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});
  React.useEffect(() => {
    if (isSm) {
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

  // ---- Pagination universelle (v5 + v6) ----
  const initialPageSize = Number(pagination) || 15;

  // État v6 (paginationModel)
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: initialPageSize,
  });

  // État v5 (pageSize simple)
  const [pageSizeV5, setPageSizeV5] = React.useState(initialPageSize);

  const handlePaginationModelChange = (model) => {
    // v6
    if (model?.pageSize && model.pageSize !== paginationModel.pageSize) {
      setPageSizeV5(model.pageSize); // garde V5 en phase
    }
    setPaginationModel(model);
  };

  const handlePageSizeChangeV5 = (newSize) => {
    // v5
    setPageSizeV5(newSize);
    setPaginationModel((m) => ({ ...m, pageSize: newSize })); // garde v6 en phase
  };

  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        // --- v6 ---
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={[5, 10, 15, 20, 25, 50]}
        // --- v5 ---
        pagination
        pageSize={pageSizeV5}
        onPageSizeChange={handlePageSizeChangeV5}
        rowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
        // Affichage & layout
        autoHeight
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(m) => setColumnVisibilityModel(m)}
        density={isSm ? "compact" : "standard"}
        hideFooterSelectedRowCount
        disableRowSelectionOnClick
        sx={{
          width: "100%",
          minHeight: 420, // évite 0px
          "& .MuiDataGrid-main": { width: "100%" },
          "& .MuiDataGrid-virtualScroller": { overflowX: "auto" },
          // S'assure que le footer (pagination) est visible
          "& .MuiDataGrid-footerContainer": { display: "flex" },
        }}
      />
    </Box>
  );
}

Table.propTypes = {
  pagination: PropTypes.number,
};
