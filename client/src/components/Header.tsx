import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutQuery } from "../redux/api/userApi";
import { userNotExist } from "../redux/reducers/user";
import { AdminHeaderMenu, headerMenu } from "../utils/constants";
import { UserReducerInitialState } from "../vite-env";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: { user: UserReducerInitialState }) => state.user
  );
  const {refetch:logout } = useLogoutQuery('');


  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogOut = async () => {
    try {
      const res =await logout();

      if (res.data?.success) {
        dispatch(userNotExist());
      }
      toast.success(res.data?.message || "Logout Successfully");
      setIsOpen((pre) => !pre);
    } catch (error) {
      console.log("error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "white",
        padding: "0rem 7rem",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Link
            to="/"
            style={{
              cursor: "pointer",
            }}
          >
            <Typography variant="h5" fontWeight={"bold"} color={"#000"}>
              Job
              <span
                style={{
                  color: theme.palette.secondary.main,
                }}
              >
                Connect
              </span>
            </Typography>
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          {/* ----------------- H E A D E R   M E N U   I T E M S --------------------- */}
          { user && user.role ==="recruiter"? AdminHeaderMenu.map((ele) => (
            <Link key={`${ele.name}+1.1`} to={ele.link}>
              <Typography
                variant="h6"
                fontWeight={"bold"}
                fontSize={"1.1rem"}
                color={theme.palette.text.secondary}
              >
                {ele.name}
              </Typography>
            </Link>
          )) : headerMenu.map((ele) => (
            <Link key={`${ele.name}+1.1`} to={ele.link}>
              <Typography
                variant="h6"
                fontWeight={"bold"}
                fontSize={"1.1rem"}
                color={theme.palette.text.secondary}
              >
                {ele.name}
              </Typography>
            </Link>
          ))      }

          {user ? (
            <Box>
              <Avatar
                onClick={() => setIsOpen((pre) => !pre)}
                alt="user Image"
                src={user.profilePhoto?.toString()}
                sx={{ width: 35, height: 35 }}
              />
              {/* ------------------------------------------- DIALOUGE------------------------------------------------ */}
              <dialog
                open={isOpen}
                style={{
                  position: "absolute",
                  top: "90%",
                  left: "calc(100% - 15rem)",
                  border: "none",
                  outline: "none",
                  zIndex:2
                }}
              >
                <Paper elevation={4}>
                  <Stack
                    spacing={"0.5rem"}
                    style={{
                      width: "360px",
                      padding: "1rem",
                    }}
                  >
                    {/* Avatar + user name + user bio */}
                    <Stack direction={"row"} gap={"0.6rem"}>
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Avatar
                          alt="user Image"
                          src={user.profilePhoto?.toString()}
                          sx={{ width: 35, height: 35 }}
                        />
                      </Box>
                      <Stack>
                        <Typography fontSize={"1.1rem"} variant="body1">
                          {user.fullName?.toString()}
                        </Typography>
                        <Typography
                          color={"grey"}
                          fontSize={"0.7rem"}
                          variant="body2"
                        >
                          {user.bio}
                        </Typography>
                      </Stack>
                    </Stack>
                    {/* user icon + user Profile*/}
                  { user && user.role ==="student" && <Link
                    to={"/viewProfile"}
                    onClick={() => setIsOpen((pre) => !pre)}
                  >
                    <Stack
                      direction={"row"}
                      gap={"1.2rem"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <AccountCircleOutlinedIcon
                          style={{
                            width: 30,
                            height: 30,
                            color: "gray",
                          }}
                        />
                      </Box>

                      <Typography
                        fontSize={"0.95rem"}
                        variant="body1"
                        color={"#000"}
                      >
                        View Profile
                      </Typography>
                    </Stack>
                  </Link>}




                      
                      {/* logout icon + logout*/}
                    <Stack
                      onClick={handleLogOut}
                      direction={"row"}
                      gap={"1.2rem"}
                      display={"flex"}
                      alignItems={"center"}
                      sx={{
                        cursor:"pointer"
                      }}
                    >
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <LogoutOutlinedIcon
                          style={{
                            width: 30,
                            height: 30,
                            color: "gray",
                          }}
                        />
                      </Box>
                      <Stack>
                        <Typography
                          fontSize={"0.95rem"}
                          variant="body1"
                          color={"#000"}
                        >
                          Log Out
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Paper>
              </dialog>
            </Box>
          ) : (
            // ------------------------------------------- SIGN UP ---------------------------------
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              <Link to="/signup">
                <Button
                  variant="outlined"
                  style={{
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  Signup
                </Button>
              </Link>
{/* -------------------------------------------- LOGIN---------------------------------- */}
              <Button
                onClick={handleLogin}
                variant="contained"
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Login
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
