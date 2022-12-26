import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { columns } from '../../data/data';
import '../../scss/main.scss';

export default function Table({ pagination }) {
  const rows = useSelector((state) => state.employee);
  return (
    <Box sx={{ height: 525, width: '80%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={parseInt(pagination)}
        rowsPerPages={parseInt(pagination)}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
}

Table.propTypes = {
  pagination: PropTypes.number,
};
