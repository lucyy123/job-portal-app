import { Call, EmailOutlined } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import JobEditDialog from "../components/JobEditDialog";
import Loader from "../components/Loader";
import TableComponent from "../components/Table";
import useGetAllAppliedJobs from "../hooks/useGetAllAppliedJobs";
import {
  ApplicationsReducerInitialState,
  AppliedJobTableRow,
  UserReducerInitialState,
} from "../vite-env";
const Profile = () => {
  useGetAllAppliedJobs();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user, loading } = useSelector(
    (state: { user: UserReducerInitialState }) => state.user
  );

  const { applieadJobs } = useSelector(
    (state: { applicationsReducer: ApplicationsReducerInitialState }) =>
      state.applicationsReducer
  );

  //*------------------------------------ ROWS------------------------------------------
  const rows = applieadJobs?.map((ele) => ({
    id: ele.job?._id,
    jobRole: ele.job?.title,
    date: String(ele.createdAt.split("T")[0]),
    company: ele.job?.company.name,
    status: ele.status,
  }));

  //*-------------------------------------- COLUMNS--------------------------------
  const columns: GridColDef[] = [
    { field: "date", headerName: "Apply On", width: 100, flex: 1 },
    { field: "jobRole", headerName: "Job Role", width: 70, flex: 1 },
    { field: "company", headerName: "Company", width: 70, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      // width: 70,
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color={params.value == "accepted" ? "success" : "error"}
            sx={{
              textTransform: "none",
              fontSize: "0.7rem",
              borderRadius: "25px",
            }}
          >
            {params.value}
          </Button>
        );
      },
    },
  ];

  loading && <Loader></Loader>;

  return (
    <Container
      maxWidth="md"
      sx={{
        padding: "1rem 1.5rem",
      }}
    >
      {/*---------------user Info section -----------------------  */}

      <Paper
        elevation={4}
        sx={{
          padding: "1rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <Stack direction={"row"} gap={"1rem"}>
          {/* ---------------user avatar ---------------------*/}
          <Box
            width={"10%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              border: "1px solid grey",
              padding: "0.5rem",
              borderRadius: "10px",
            }}
          >
            <Avatar
              src={user?.profilePhoto?.toString()}
              alt="user_avatar"
              sx={{
                width: "3rem",
                height: "3rem",
              }}
            />
          </Box>

          {/*  --------------user name + about ------------------ */}

          <Box flex={1}>
            <Stack justifyContent={"center"}>
              <Typography variant="h4" fontSize={"1.4rem"} fontWeight={"bold"}>
                {user?.fullName?.toString()}
              </Typography>
              <Typography
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: "2",
                  fontSize: "0.85rem",
                  color: "GrayText",
                }}
              >
                {" "}
                {user?.bio}
              </Typography>
            </Stack>
          </Box>
          {/* ------------  edit icon -----------------------------*/}
          <Box
            width={"10%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"start"}
          >
            <IconButton onClick={() => setIsOpen((pre) => !pre)}>
              <EditOutlinedIcon
                sx={{
                  width: "2.3rem",
                  height: "2.3rem",
                }}
              ></EditOutlinedIcon>
            </IconButton>
          </Box>
        </Stack>

        {/* -------------contacts and social links ==> EMAIL + MOBILE NUMBER---------------- */}
        <Box marginTop={"1rem"}>
          <Stack direction={"row"} alignItems={"center"} gap={"0.6rem"}>
            {" "}
            <EmailOutlined></EmailOutlined>
            {user?.email}
          </Stack>
          <Stack direction={"row"} alignItems={"center"} gap={"0.6rem"} mt={1}>
            {" "}
            <Call></Call>
            {user?.phoneNumber}
          </Stack>
        </Box>

        {/* ---------------------- Skills----------------------- */}

        <Box>
          <Typography variant="subtitle2" fontWeight={"bold"}>
            {" "}
            Skills{" "}
          </Typography>
          <Stack direction={"row"} gap={"0.3rem"} marginTop={"0.6rem"}>
            {user?.skills?.map((ele, idx) => (
              <Button
                key={idx}
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: "25px",
                  fontSize: "0.7rem",
                }}
              >
                {ele}
              </Button>
            ))}
          </Stack>
        </Box>

        {/* ------------------------ Resume + Original name------------- */}

        <Box>
          <Typography variant="subtitle2" fontWeight={"bold"}>
            {" "}
            Resume{" "}
          </Typography>
          <Link to={`${user?.resume}`} target="_blank">
            <Typography color={"blue"}>{user?.resumeOriginalName}</Typography>
          </Link>
        </Box>
      </Paper>
      {/* ----------------- user appliead jobs ------------------------ */}

      <Box>
        <Typography
          variant="h4"
          fontSize={"1.4rem"}
          padding={"1rem 0.7rem"}
          fontWeight={"bold"}
        >
          {" "}
          Applied Jobs{" "}
        </Typography>
        {applieadJobs && applieadJobs.length > 0 ? (
          <Box>
            <TableComponent<AppliedJobTableRow>
              rows={rows!}
              columns={columns}
              height="15rem"
              widgth="100%"
            />
          </Box>
        ) : (
          <Typography variant="subtitle2">
            {" "}
            You have not applied to any job{" "}
          </Typography>
        )}
      </Box>
      <JobEditDialog isOpen={isOpen} handleOpen={setIsOpen} />
    </Container>
  );
};

export default Profile;
