import { Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  SyntheticEvent,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { allskills, } from "../utils/constants";
import {
  User,
  UserReducerInitialState,
  UserResponseMessage,
} from "../vite-env";
import { useUpdateUserMutation } from "../redux/api/userApi";
import { userExist, userNotExist } from "../redux/reducers/user";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type Propstype = {
  isOpen: boolean;
  handleOpen: Dispatch<React.SetStateAction<boolean>>;
};

const JobEditDialog = ({ isOpen, handleOpen }: Propstype) => {
  const { user, loading } = useSelector(
    (state: { user: UserReducerInitialState }) => state.user
  );
  const [selectedSkill, setSelectedSkill] = useState<string[]>([]);
  const [updateUser, { isLoading, isError }] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    profile:{
      bio: user?.profile?.bio,
      resume: user?.profile?.resume,
      skills: user?.profile?.skills || [""],
    }
  
  });

  const memoizedSelectedSkills = useMemo(() => {
    return selectedSkill.filter((skill) => skill !== ""); // Example of processing skills
  }, [selectedSkill]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedDetails = { ...userDetails, profile:{...userDetails.profile,skills:memoizedSelectedSkills} }
    setUserDetails(updatedDetails);
    try {
      console.log('updatedDetails:', updatedDetails)
      const res = await updateUser(updatedDetails).unwrap();
      dispatch(userNotExist());
      dispatch(userExist(res.updatedUser!));
      console.log(
      "updated user",res.updatedUser

      )
      toast.success("Updated Successfully");
      handleOpen(false)
    } catch (error) {
      console.log("error:", error);
      const err = error as FetchBaseQueryError;
      const message = err.data as UserResponseMessage<User>;
      toast.error(message.message! || "something went wrong");
      handleOpen(false)

    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;

if(name == "bio" || name =="skills" || name ==="resume"){
  setUserDetails((prevDetails) => ({
    ...prevDetails,
    profile:{
      ...prevDetails.profile,
      [name]:value
    } 
  }));
}else{
  setUserDetails((prevDetails) => ({
    ...prevDetails,
    [name]: value, 
  }));
}
    
  
  
  };

  return (
    <Box>
      <Dialog
        open={isOpen}
        onClose={() => handleOpen(false)}
        sx={{
          borderRadius: "15px",
        }}
      >
        <DialogTitle>
          <Stack direction={"row"}>
            <Typography variant="h6" fontWeight={"bold"} marginRight={"auto"}>
              Update Profile
            </Typography>
            <IconButton onClick={() => handleOpen(false)}>
              <Close></Close>
            </IconButton>
          </Stack>
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          style={{ width: "500px", padding: "1rem 1.3rem" }}
        >
          <Stack
            spacing={"1.5rem"}
            sx={{
              "&>.MuiStack-root": {
                flexDirection: "row",
                gap: "1rem",
                alignItems: "center",
              },
              "&>.MuiStack-root>.MuiTypography-root": {
                fontWeight: "bold",
              },
            }}
          >
            {/* -----------------------name------------------ */}
            <Stack>
              <Typography>Name</Typography>
              <TextField
                value={userDetails.fullName}
                name="fullName"
                onChange={handleChange}
                size="small"
                fullWidth
                placeholder=""
              />
            </Stack>
            {/* -----------------------email------------------ */}
            <Stack>
              <Typography>Email</Typography>
              <TextField
                value={userDetails.email}
                name="email"
                onChange={handleChange}
                size="small"
                fullWidth
                placeholder=""
              />
            </Stack>
            {/* -----------------------number------------------ */}
            <Stack>
              <Typography>Number</Typography>
              <TextField
                value={userDetails.phoneNumber}
                name="phoneNumber"
                onChange={handleChange}
                size="small"
                fullWidth
                placeholder=""
              />
            </Stack>
            {/* -----------------------bio------------------ */}
            <Stack>
              <Typography>Bio</Typography>

              <TextField
                value={userDetails.profile?.bio}
                name="bio"
                onChange={handleChange}
                size="small"
                fullWidth
                placeholder=""
              />
            </Stack>
            {/* -----------------------Skills------------------ */}
            <Stack>
              <Typography>Skills</Typography>

              <Autocomplete
                disablePortal
                multiple={true}
                limitTags={2}
                defaultValue={userDetails.profile?.skills}
                id="combo-box-demo"
                fullWidth
                size="small"
                onChange={(
                  _event: SyntheticEvent,
                  value: SetStateAction<string[]> | string[]
                ) => {
                  setSelectedSkill(value);
                }}
                isOptionEqualToValue={(option, value) =>
                  option?.toLowerCase() === value?.toLowerCase()
                }
                options={allskills}
                // sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="add skills" />
                )}
              />
            </Stack>
            {/* -----------------------Resume------------------ */}
            <Stack>
              <Typography>Resume</Typography>
              <TextField size="small" fullWidth name="" placeholder="" />
            </Stack>
          </Stack>

          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            mb={"1rem"}
            mt={"2rem"}
          >
            {loading && loading ? (
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
                  userDetails.fullName == "" ||
                  userDetails.email == "" ||
                  userDetails.phoneNumber == ""
                }
                type="submit"
                variant="contained"
                sx={{
                  m: "2rem 0rem",
                  textTransform: "none",
                }}
              >
                Update
              </Button>
            )}
          </Box>
        </form>
      </Dialog>
    </Box>
  );
};

export default JobEditDialog;
