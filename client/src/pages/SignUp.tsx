import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../vite-env";

const initailUser = {
  fullName: "",
  email: "",
  phoneNumber: "",
  password: "",
  role: "",
  profile: {
    bio: "",
    skills: [],
    resume: "",
    resumeOriginalName: "",
    company: "",
    profilePhoto: "",
  },
};

const SignUp = () => {
  const [user, setUser] = useState<User>(initailUser);
  const navigate = useNavigate();

  const { email, profile, fullName, password, phoneNumber, role } = user;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/login");
    setUser(initailUser);
  };

  const handlechange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;

    setUser((pre) => ({
      ...pre,
      [name]: String(value),
    }));
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        padding: "1rem",
        mt: "2rem",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: "1rem",
          marginInline: "2.6rem",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={"bold"}
          fontSize={"1.48rem"}
          sx={{
            mb: "2rem",
          }}
        >
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack
            sx={{
              "&  .MuiTextField-root": {
                marginBottom: "1rem",
              },
            }}
          >
            <label> Full Name</label>
            <TextField
              placeholder="eg- Emily Blunt"
              type="text"
              size="small"
              sx={{}}
              name="fullName"
              onChange={handlechange}
              value={fullName}
            />
            <label> Email</label>
            <TextField
              placeholder="eg- example@gmail.coom"
              size="small"
              type="email"
              name="email"
              onChange={handlechange}
              value={email}
            />
            <label> Phone Number</label>
            <TextField
              placeholder="eg- 999999-0000"
              size="small"
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handlechange}
            />
            <label> Password</label>
            <TextField
              placeholder="eg- passcode"
              size="small"
              type="password"
              name="password"
              value={password}
              onChange={handlechange}
            />
            <Stack
              direction={"row"}
              display={"flex"}
              justifyContent={"space-between"}
              // paddingRight={"2rem"}
            >
              <FormControl style={{}}>
                <RadioGroup
                  onChange={handlechange}
                  value={role}
                  name="role"
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "2rem",
                    marginY: "auto",
                  }}
                >
                  <FormControlLabel
                    value="student"
                    control={<Radio />}
                    label="Student"
                  />
                  <FormControlLabel
                    value="recruiter"
                    control={<Radio />}
                    label="Recruiter"
                  />
                </RadioGroup>
              </FormControl>

              <Stack
                direction={"row"}
                display={"flex"}
                spacing={"0.56rem"}
                alignItems={"center"}
                justifyContent={"start"}
                padding={"0rem 0.5rem"}
              >
                <label>Profile</label>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid grey",
                    borderRadius: "5px",
                    paddingInline: "0.5rem",
                  }}
                >
                  <Button
                    variant="text"
                    role={undefined}
                    component="label"
                    sx={{
                      textTransform: "none",
                      paddingInline: "0.45rem",
                    }}
                  >
                    Choose File
                    <TextField
                      type="file"
                      size="small"
                      value={profile?.profilePhoto}
                      name="file"
                      onChange={handlechange}
                      sx={{
                        clip: "rect(0 0 0 0)",
                        clipPath: "inset(50%)",
                        height: 1,
                        overflow: "hidden",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        whiteSpace: "nowrap",
                        width: 1,
                      }}
                    />
                  </Button>
                  <span>
                    {" "}
                    {profile?.profilePhoto != ""
                      ? profile?.profilePhoto
                      : "No file choosen"}{" "}
                  </span>
                </Box>
              </Stack>
            </Stack>
            <Button
              disabled={
                fullName == "" ||
                email == "" ||
                role == "" ||
                phoneNumber == "" ||
                password == ""
              }
              type="submit"
              variant="contained"
              sx={{
                m: "2rem 0rem",
                textTransform: "none",
              }}
            >
              Signup
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
