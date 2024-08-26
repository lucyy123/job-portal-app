import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import TableComponent from "../../../components/Table";
import useGetAllCompanies from "../../../hooks/useGetAllCompanies";
import { useLazyGetCompanyByIdQuery } from "../../../redux/api/companiesApi";
import { SingleCompany } from "../../../redux/reducers/companies";
import { ComapniesReducerInitialState, TableRowsType } from "../../../vite-env";

const Companies = () => {
  useGetAllCompanies();
  const { companies, loading } = useSelector(
    (state: { companies: ComapniesReducerInitialState }) => state.companies
  );
const [filteredCompanies,setFilteredCompanies] = useState(companies) || []
const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const dispacth = useDispatch();

  const [fetchData] = useLazyGetCompanyByIdQuery();


  const handleEdit = async (id: string) => {
    try {
      const res = await fetchData(id).unwrap();
      if (res.success) {
        dispacth(SingleCompany(res.company));
        navigate(`/admin/companies/${id}`);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
//*---------------------------------- Table Columns---------------------------
  const tableColumns: GridColDef[] = [
    {
      field: "logo",
      headerName: "Logo",
      width: 100,

      renderCell: (params) => (
        <Box>
          <img
            src={params.value}
            alt="logo"
            style={{ width: 50, height: 50 }}
          />
        </Box>
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "date", headerName: "Created At", flex: 1 },
    { field: "update", headerName: "Last Modifeid", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem icon={<Delete />} label="Delete" showInMenu />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          showInMenu
          onClick={() => handleEdit(params.id as string)}
        />,
      ],
    },
  ];



  const tableRows =
    filteredCompanies?.map((ele) => ({
      id: String(ele._id),
      logo: ele.logo || "",
      name: ele.name,
      date: String(ele.createdAt.split("T")[0]),
      update: String(ele.updatedAt.split("T")[0]),
    })) ?? [];


  useEffect(() => {

const res = companies?.filter((ele)=>{
  if(!searchTerm) {
    return ele
  }

  return ele.name.toLowerCase().includes(searchTerm)
});

setFilteredCompanies(res!)

  }, [dispacth,searchTerm,companies,setFilteredCompanies]);

  if (loading) return <Loader></Loader>;

  return (
    <Container maxWidth="md">
      <Stack direction={"row"} mt={4} mb={3}>
        <TextField
          size="small"
          sx={{
            marginRight: "auto",
          }}
          placeholder="filter by company name"
          onChange={(e)=>setSearchTerm(e.target.value)}
        />

        <Button
          variant="contained"
          size="small"
          sx={{
            textTransform: "none",
          }}
          onClick={() => navigate("/admin/companies/create")}
        >
          {" "}
          New Company{" "}
        </Button>
      </Stack>

      {/* ------------------ table----------------------- */}
      <Box>
        <TableComponent<TableRowsType>
          rows={tableRows!}
          columns={tableColumns}
          height="30rem"
          widgth="100%"
        />
      </Box>
      <Typography variant="body2" color={"GrayText"} textAlign={"center"} mt={1}>list of your recent registered comapnies</Typography>


    </Container>
  );
};

export default Companies;
