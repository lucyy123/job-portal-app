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
} from "@mui/material";

import { Link } from "react-router-dom";

import { useState } from "react";
import userImage from "../assets/images/palestineFlag.jpg";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isUser = false;
  const userName = "Monis Khan";
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "white",
        padding: "0rem 9rem",
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
          <Link to="/">
            <Typography variant="h5" fontWeight={"bold"} color={"#000"}>
              Job
              <span
                style={{
                  color: "red",
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
          <Link to={"/home"}>
            <Typography
              variant="h6"
              fontWeight={"bold"}
              fontSize={"1.1rem"}
              color={"rgb(73, 73, 73)"}
            >
              Home
            </Typography>
          </Link>
          <Link to={"/jobs"}>
            <Typography
              variant="h6"
              fontWeight={"bold"}
              fontSize={"1.1rem"}
              color={"#rgb(73, 73, 73)"}
            >
              Jobs
            </Typography>
          </Link>
          <Link to={"/browse"}>
            <Typography
              variant="h6"
              fontWeight={"bold"}
              fontSize={"1.1rem"}
              color={"#rgb(73, 73, 73)"}
            >
              Browse
            </Typography>
          </Link>
          {isUser ? (
            <Box>
              <Avatar
                onClick={() => setIsOpen((pre) => !pre)}
                alt="user Image"
                src={userImage}
                sx={{ width: 35, height: 35 }}
              />
              <dialog
                open={isOpen}
                style={{
                  position: "absolute",
                  top: "90%",
                  left: "calc(100% - 15rem)",
                  border: "none",
                  outline: "none",
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
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>

                      <Avatar
                        alt="user Image"
                        src={userImage}
                        sx={{ width: 35, height: 35 }}
                        />
                        </Box>
                      <Stack>
                        <Typography fontSize={"1.1rem"}  variant="body1">
                          {userName}
                        </Typography>
                        <Typography
                          color={"grey"}
                          fontSize={"0.7rem"}
                          variant="body2"
                        >
                          Lorem ipsum dolor sit....
                        </Typography>
                      </Stack>
                    </Stack>
                    {/* user icon + user Profile*/}
                        <Link to={"/viewProfile"}>
                    <Stack direction={"row"} gap={"1.2rem"} display={"flex"} alignItems={"center"}>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                      <AccountCircleOutlinedIcon
                        style={{                           
                            width: 30,
                            height: 30,
                            color: "gray",
                        }}
                        />
                        </Box>
                   
                  

                        <Typography fontSize={"0.95rem"} variant="body1"  color={"#000"} >
                          View Profile
                        </Typography>
                     

                    
                    </Stack>
                    {/* logout icon + logout*/}
                    </Link>
                    <Stack direction={"row"} gap={"1.2rem"} display={"flex"} alignItems={"center"}>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>

                        
                      <LogoutOutlinedIcon
                        style={{
                            width: 30,
                            height: 30,
                            color: "gray",
                        }}
                        />
                        </Box>
                      <Stack>
                        <Typography fontSize={"0.95rem"} variant="body1" color={"#000"}>
                          Log Out
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Paper>
              </dialog>
            </Box>
          ):(
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "0.6rem",

              }}
            >
                <Link to="/signup">
              <Button variant="outlined" style={{
                    textTransform:"none",
                    fontWeight:"bold"
              }}>
                Signup
              </Button>
                </Link>
       
                <Button
                  variant="contained"
                  
                 
                  sx={{
                    color: "white",
                    textTransform:"none",
                    fontWeight:"bold"
                  }}
                >
                  Login
                </Button>
       
            </Box>
          ) }
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;