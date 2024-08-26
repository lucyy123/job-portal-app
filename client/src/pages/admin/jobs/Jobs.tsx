import { Edit, People } from "@mui/icons-material";
import {
    Box,
    Button,
    Container,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import TableComponent from "../../../components/Table";
import useGetAllAdminJobs from "../../../hooks/useGetAllJobs";
import { useLazyGetJobByItsidQuery } from "../../../redux/api/jobsApi";
import { adminSingleJob } from "../../../redux/reducers/jobs";
import {
    JobReducerInitialState,
    TableAdminRowsType
} from "../../../vite-env";

const Jobs = () => {
  useGetAllAdminJobs();
  const { adminJobs, loading } = useSelector(
    (state: { jobs: JobReducerInitialState }) => state.jobs
  );
  const [filteredJobs, setFilteredJobs] = useState(adminJobs) || [];
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const [fetchData] = useLazyGetJobByItsidQuery();

  const handleEdit = async (id: string) => {
    try {
      const res = await fetchData(id).unwrap();
      if (res.success) {
        dispacth(adminSingleJob(res.job));
        navigate(`/admin/jobs/${id}`);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  //*---------------------------------- Table Columns---------------------------
  const tableColumns: GridColDef[] = [
    {
      field: "company",
      headerName: "Company",
      width: 100,

      // renderCell: (params) => (
      //   <Box>
      //     <img
      //       src={params.value}
      //       alt="company_name"
      //       style={{ width: 50, height: 50 }}
      //     />
      //   </Box>
      // ),
    },
    { field: "role", headerName: "Job Role", flex: 1 },
    { field: "date", headerName: "Created At", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
        icon={<Edit />}
        label="Edit"
        showInMenu
        onClick={() => handleEdit(params.id as string)}
        />,
        <GridActionsCellItem icon={<People />} label="Applicants" showInMenu  onClick={()=>navigate(`/admin/jobs/${params.id}/applicants`)}/>,
      ],
    },
  ];

  const tableRows =
    filteredJobs?.map((ele) => ({
      id: String(ele._id),
      company: ele.company?.name,
      role: ele.title,
      date: String(ele.createdAt.split("T")[0]),
        location:ele.location,
    })) ?? [];

  useEffect(() => {
    const res = adminJobs?.filter((ele) => {
      if (!searchTerm) {
        return ele;
      }

      return ele.title.toLowerCase().includes(searchTerm);
    });

    setFilteredJobs(res!);
  }, [dispacth, searchTerm, adminJobs, setFilteredJobs]);

  if (loading) return <Loader></Loader>;

  return (
    <Container maxWidth="md">
      <Stack direction={"row"} mt={4} mb={3}>
        {/* ------------------------- search box----------------------- */}
        <TextField
          size="small"
          sx={{
            marginRight: "auto",
          }}
          placeholder="filter by job title"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
{/* -------------------- new job  */}
        <Button
          variant="contained"
          size="small"
          sx={{
            textTransform: "none",
          }}
          onClick={() => navigate("/admin/job/create")}
        >
          {" "}
          New Job{" "}
        </Button>
      </Stack>

      {/* ------------------ table----------------------- */}
      <Box>
        <TableComponent<TableAdminRowsType>
          loading={loading}
          rows={tableRows!}
          columns={tableColumns}
          height="30rem"
          widgth="100%"
        />
      </Box>
      <Typography
        variant="body2"
        color={"GrayText"}
        textAlign={"center"}
        mt={1}
      >
        list of your recently posted jobs
      </Typography>
    </Container>
  );
};

export default Jobs;
