import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from 'material-react-table';
import {
  Box,
  Button,
  LinearProgress,
  MenuItem,
  Typography,
  lighten,
} from '@mui/material';
import { MockData as data } from './makeData';

export type Employee = {
  storyName: string;
  progress: string;
  storyId: number;
  startDate: string;
  targetDate: string;
  attachment: string;
  status: string;
  priority: string;
  type: string;
  component: string;
  sprint: string;
  labels: string;
  tickets: string;
};

const Example = () => {
  const [selectedRow, setSelectedRow] = useState<Employee | null>(null);
  const navigate = useNavigate();

  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        id: 'storyName', // id used to define `group` column
        header: '',
        columns: [
          {
            accessorKey: 'storyName',
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'Story Name',
            size: 300,
          },
        ],
      },
      {
        id: 'progress',
        header: '',
        columns: [
          {
            accessorKey: 'progress',
            header: 'Progress',
            size: 200,
            Cell: ({ cell }) => (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={cell.getValue<number>()}
                    sx={(theme) => ({
                      backgroundColor: theme.palette.grey[300],
                      height: 6,
                      borderRadius: 5,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor:
                          cell.getValue<number>() < 50
                            ? theme.palette.error.main
                            : cell.getValue<number>() < 75
                              ? theme.palette.warning.main
                              : theme.palette.success.main,
                      },
                    })}
                  />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">{`${Math.round(
                    cell.getValue<number>(),
                  )}%`}</Typography>
                </Box>
              </Box>
            ),
          },
          {
            accessorKey: 'storyId',
            header: 'Story ID',
            size: 100,
          },
          {
            accessorFn: (row) => new Date(row.startDate), // convert to Date for sorting and filtering
            id: 'startDate',
            header: 'Start Date',
            filterVariant: 'date',
            filterFn: 'lessThan',
            sortingFn: 'datetime',
            size: 100,
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), // render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, // custom header markup
            muiFilterTextFieldProps: {
              sx: {
                minWidth: '100px',
              },
            },
          },
          {
            accessorFn: (row) => new Date(row.targetDate), // convert to Date for sorting and filtering
            id: 'targetDate',
            header: 'Target Date',
            filterVariant: 'date',
            filterFn: 'lessThan',
            sortingFn: 'datetime',
            size: 100,
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), // render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, // custom header markup
            muiFilterTextFieldProps: {
              sx: {
                minWidth: '100px',
              },
            },
          },
        ],
      },
      {
        accessorKey: 'attachment',
        header: 'Attachment',
        size: 100,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        size: 100,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        size: 100,
      },
      {
        accessorKey: 'component',
        header: 'Component',
        size: 100,
      },
      {
        accessorKey: 'sprint',
        header: 'Sprint',
        size: 100,
      },
      {
        accessorKey: 'labels',
        header: 'Labels',
        size: 100,
      },
      {
        accessorKey: 'tickets',
        header: 'Tickets',
        size: 100,
      },
    ],
    [],
  );

  const handleOpenStory = (row: Employee) => {
    setSelectedRow(row); // Set selected row data
    console.log('row', row)
    navigate("/create-story", { state: { row } }); // Pass data using state
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnFilterModes: true,
    enableColumnOrdering: false,
    enableGrouping: false,
    enableColumnPinning: false,
    enableColumnActions: false,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: false,
    enablePagination: false,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions'],
      },
    },
    renderRowActionMenuItems: ({ row, closeMenu }) => [
      <MenuItem
        key={0}
        onClick={() => {
          closeMenu();
        }}
        sx={{ px: 6 }}
      >
        Copy Link
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          closeMenu();
        }}
        sx={{ px: 6 }}
      >
        Duplicate Story
      </MenuItem>,
      <MenuItem
        key={2}
        onClick={() => {
          closeMenu();
        }}
        sx={{ px: 6 }}
      >
        Assign To Epic
      </MenuItem>,
      <MenuItem
        key={3}
        onClick={() => {
          handleOpenStory(row.original); // Pass row data to the function
          closeMenu();
        }}
        sx={{ px: 6 }}
      >
        Open Story
      </MenuItem>,
      <MenuItem
        key={4}
        onClick={() => {
          // Send email logic...
          closeMenu();
        }}
        sx={{ px: 6, pt: 2, borderTop: '1px solid #E3E7EB', color: 'red ' }}
      >
        Delete
      </MenuItem>,
    ],
    renderTopToolbar: ({ table }) => {
      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('activating ' + row.getValue('name'));
        });
      };

      const handleContact = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('contact ' + row.getValue('name'));
        });
      };

      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: 'flex',
            gap: '0.5rem',
            p: '20px',
            justifyContent: 'right',
          })}
        >
          <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <MRT_GlobalFilterTextField table={table} placeholder='Search Stories Here' />
            <MRT_ToggleFiltersButton table={table} title="Show Filters" />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              <Link to="/create-story">
                <Button
                  color="success"
                  onClick={handleActivate}
                  variant="contained"
                  sx={{ textTransform: "capitalize" }}
                >
                  Create Story
                </Button>
              </Link>
              <Button
                color="primary"
                onClick={handleContact}
                variant="outlined"
                sx={{ textTransform: "capitalize" }}
              >
                Edit Fields
              </Button>
            </Box>
          </Box>
        </Box>
      );
    },
  });

  return <MaterialReactTable table={table} />;
};

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const MuiReactTable = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Example />
  </LocalizationProvider>
);

export default MuiReactTable;
