import { Box, Button, Container, Stack, TextField } from "@mui/material";
import {
  GridActionsCellItem,
  GridColDef,
  GridDeleteIcon,
} from "@mui/x-data-grid";
import TableComponent from "../../components/Table";
import { adminCompaniesTable } from "../../vite-env";
import { Delete, Edit, LinearScale } from "@mui/icons-material";

const Companies = () => {
  const tableColumns: GridColDef[] = [
    { field: "logo", headerName: "Logo", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      width: 80,
      getActions: (params) => [

        <GridActionsCellItem
        icon={<Delete />}
        label="Delete"
        showInMenu
      />,
        <GridActionsCellItem
        icon={<Edit />}
        label="Edit"
        showInMenu
      />,
      ],
    },
  ];

  const tableRows: adminCompaniesTable[] = [
    {
      id: 1,
      logo: "",
      name: "Google",
      date: "25-02-2024",
    },
    {
      id: 2,
      logo: "",
      name: "Asus",
      date: "07-01-2024",
    },
    {
      id: 3,
      logo: "",
      name: "Microsoft",
      date: "15-8-2024",
    },
  ];

  return (
    <Container maxWidth="md">
      <Stack direction={"row"} mt={4} mb={3}>
<TextField size="small"   sx={{
  marginRight:"auto",
  


}}  placeholder="filter by company name" />

<Button variant="contained"  size="small" sx={{
  textTransform:"none",
}}> New Company </Button>
      </Stack>



      {/* ------------------ table----------------------- */}
      <Box>
        <TableComponent<adminCompaniesTable>
          rows={tableRows}
          columns={tableColumns}
          height="30rem"
          widgth="100%"
        />
      </Box>
    </Container>
  );
};

export default Companies;
