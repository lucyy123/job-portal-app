import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
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
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/userApi";
import { userExist } from "../redux/reducers/user";
import { User, UserLogin, UserResponseMessage } from "../vite-env";

const initailUser: UserLogin = {
  email: "",
  password: "",
  role: "",
};
const Login = () => {
  const [user, setUser] = useState<UserLogin>(initailUser);

  const [showPassword,setShowPassword]=useState<boolean>(false)

  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password, role } = user;

  const handlechange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;

    setUser((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login(user).unwrap();
      dispatch(userExist(res.user!));
      toast.success(res.message!);
      navigate("/");
    } catch (error) {
      const err = error as FetchBaseQueryError;
      const message=err.data as UserResponseMessage<User>
      toast.error(message.message!);
    }
  };
  // if(isLoading) return <Loader/>
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
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack
            sx={{
              "&  .MuiTextField-root": {
                marginBottom: "1rem",
              },
            }}
          >
            {/*----------------------- E M A I L ---------------------------- */}
            <label> Email</label>
            <TextField
              placeholder="eg- example@gmail.coom"
              size="small"
              type="email"
              name="email"
              onChange={handlechange}
              value={email}
            />
            {/*----------------------- P A S S W O R D---------------------------- */}
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
              onChange={handlechange}
            />
            {/*----------------------- R O L E---------------------------- */}
            <Stack
              direction={"row"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <FormControl >
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
            </Stack>
           { isLoading && isLoading ?(
            <LoadingButton
              loading
              loadingPosition="center"
              variant="contained"
              fullWidth={false}
              
              sx={{ bgcolor:'primary.main'}}
            >
             
        <span>loading...</span>
            </LoadingButton>
            ):(
            <Button
           
              disabled={email == "" || role == "" || password == ""}
              type="submit"
              variant="contained"
              sx={{
                m: "2rem 0rem",
                textTransform: "none",
              }}
            >
              Login
            </Button>
            )}
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
