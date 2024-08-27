import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import TableComponent from "../../../components/Table";
import useGetAllApplicants from "../../../hooks/useGetAllApplicants";
import {
  AdminApplicantsRow,
  ApplicationsReducerInitialState,
  UpdateApplicationResponse,
} from "../../../vite-env";
import {
  useLazyApplicantsOfJobQuery,
  useUpdateApplicationMutation,
} from "../../../redux/api/applications";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { getApplicationsOfJobId } from "../../../redux/reducers/application";

const Applicants = () => {
  const { id } = useParams();
  //*-------- use all applicants--------------
  useGetAllApplicants(id!);
  const dispacth = useDispatch();
  const { applications, loading } = useSelector(
    (state: { applicationsReducer: ApplicationsReducerInitialState }) =>
      state.applicationsReducer
  );

  const [fetchData] = useUpdateApplicationMutation();


//*---------------------------------- hanlde to update the status-------------------------------
  const hanldeUpdate = async (status: string, id: string) => {
    try {
      const res = await fetchData({ data: { status }, id }).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.log("error:", error);
      const err = error as FetchBaseQueryError;
      const data = err.data as UpdateApplicationResponse;
      toast.error(data.message);
    }
  };

  const [fethData] = useLazyApplicantsOfJobQuery();
  //*--------------------------- update the status of table --------------------------------
  useEffect(() => {
    const handle = async () => {
      try {
        const res = await fethData(id!).unwrap();
        if (res.success) {
          dispacth(getApplicationsOfJobId(res.applications));
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    handle();
  }, [hanldeUpdate,dispacth]);

  //*---------------------------------- Table Columns---------------------------
  const tableColumns: GridColDef[] = [
    {
      field: "full_name",
      headerName: "Full Name",
      flex: 1,
    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contact", headerName: "Contanct", flex: 1 },
    {
      field: "resume",
      headerName: "Resume",
      flex: 1,

      renderCell: (params) => (
        <Link to={params.value} target="_blank">
          {params.value}
        </Link>
      ),
    },
    { field: "date", headerName: "Date", flex: 1 },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            borderRadius:"25px",
            textTransform:"none"
          }}
          color={params.value == "accepted" ? "success" : "error"}
        >
          {" "}
          {params.value}{" "}
        </Button>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          label="Accepted"
          showInMenu
          onClick={() => hanldeUpdate("accepted", String(params.id))}
        />,
        <GridActionsCellItem
          label="Rejected"
          showInMenu
          onClick={() => hanldeUpdate("rejected", String(params.id))}
        />,
      ],
    },
  ];

 //*---------------------------------------- table rows-------------------------------
  const tableRows =
    applications?.applications.map((ele) => ({
      id: String(ele._id),
      full_name: ele.applicants.fullName,
      email: ele.applicants.email,
      contact: String(ele.applicants.phoneNumber),
      resume: ele.applicants.resume,
      date: String(ele.createdAt.split("T")[0]),
      status: String(ele.status),
    })) ?? [];

 

  if (loading) return <Loader></Loader>;

  return (
    <Container maxWidth="md">
      <Stack mt={4} mb={3}>
        <Typography variant="h4" fontSize={"1.5rem"} fontWeight={"bold"}>
          Applicants {applications?.applications.length}
        </Typography>
      </Stack>

      {/* ------------------ table----------------------- */}
      <Box>
        <TableComponent<AdminApplicantsRow>
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

export default Applicants;
