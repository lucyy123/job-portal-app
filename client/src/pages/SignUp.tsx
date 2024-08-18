import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../redux/api/userApi";

const SignUp = () => {
  const [register, { isError, isLoading }] = useRegisterMutation();
  const [showPassword,setShowPassword]=useState<boolean>(false)

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [profilePhoto, setProfilePhoto] = useState<File>();

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append("fullName", fullName);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("phoneNumber", phoneNumber);
      formdata.append("role", role);
      formdata.append("profilePhoto", profilePhoto as Blob);
      const res = await register({ formdata }).unwrap();
      toast.success(res.message!);
      navigate("/login");
    } catch (error) {
      console.log("error:", error);
      console.log("isError:", isError);
      toast.error("SignUp Failed");
    }
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("file ", e.target.value);
    const file: File | undefined = e.target.files?.[0];

    if (file) {
      setProfilePhoto(file);
    }
  };

  if (isLoading) return <Loader />;

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
            {/* ----------------------------------- FULL NAME ------------------------------- */}
            <label> Full Name</label>
            <TextField
              placeholder="eg- Emily Blunt"
              type="text"
              size="small"
              sx={{}}
              name="fullName"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
            {/* ----------------------------------- EMAIL ------------------------------- */}

            <label> Email</label>
            <TextField
              placeholder="eg- example@gmail.coom"
              size="small"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {/* ----------------------------------- PHONE NUMBER ------------------------------- */}

            <label> Phone Number</label>
            <TextField
              placeholder="eg- 999999-0000"
              size="small"
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {/* ----------------------------------- PASSWORD------------------------------- */}

            <label> Password</label>
            <TextField
              placeholder="eg- passcode"
              size="small"
              type={showPassword?"text":"password"}
              name="password"
              value={password}
              InputProps={{
                endAdornment:<InputAdornment  position= "end"> <IconButton  onMouseLeave={()=>setShowPassword(false)} onClick={()=>setShowPassword((pre)=>!pre)}>  { showPassword ? <VisibilityOff/>: <Visibility /> } </IconButton></InputAdornment>
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* ----------------------------------- FULL NAME ------------------------------- */}

            <Stack
              direction={"row"}
              display={"flex"}
              justifyContent={"space-between"}
              // paddingRight={"2rem"}
            >
              {/* ----------------------------------- ROLE [STUDENT + RECRUITER ]------------------------------- */}

              <FormControl style={{}}>
                <RadioGroup
                  onChange={(e) => setRole(e.target.value)}
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

                {/* ----------------------------------- ProfilePhoto  ------------------------------- */}
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
                      name="profilePhoto"
                      onChange={handleFile}
                      InputProps={{
                        inputProps: {
                          accept: "image/*",
                        },
                      }}
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
                    {profilePhoto && profilePhoto.name != ""
                      ? profilePhoto.name
                      : "No file choosen"}{" "}
                  </span>
                </Box>
              </Stack>
            </Stack>
            {/* ----------------------------------- BUTTON------------------------------- */}

            {isLoading && isLoading ? (
              <LoadingButton
                loading
                loadingPosition="center"
                variant="contained"
                fullWidth={false}
                sx={{ bgcolor: "primary.main" }}
              >
                <span>loading...</span>
              </LoadingButton>
            ) : (
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
            )}
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
