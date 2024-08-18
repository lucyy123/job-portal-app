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
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  SyntheticEvent,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../redux/api/userApi";
import { userExist, userNotExist } from "../redux/reducers/user";
import { allskills } from "../utils/constants";
import {
  User,
  UserReducerInitialState,
  UserResponseMessage,
} from "../vite-env";

type Propstype = {
  isOpen: boolean;
  handleOpen: Dispatch<React.SetStateAction<boolean>>;
};

const JobEditDialog = ({ isOpen, handleOpen }: Propstype) => {
  const { user, loading } = useSelector(
    (state: { user: UserReducerInitialState }) => state.user
  );
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState<string | Blob | undefined>(
    user?.fullName || ""
  );
  const [email, setEmail] = useState<string | Blob | undefined>(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState<string | Blob | undefined>(user?.phoneNumber || "");
  const [bio, setBio] = useState<string | Blob | undefined>(user?.bio || "");
  const [resume, setResume] = useState<File>();
  const [selectedSkill, setSelectedSkill] = useState<string[]>(user?.skills || []);

  const memoizedSelectedSkills = useMemo(() => {
    return selectedSkill.filter((skill) => skill !== ""); // Example of processing skills
  }, [selectedSkill]);

  //*---------------------------HANDLE FOR SUBMIT FORM --------------------------//
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append("fullName", String(fullName));
      formdata.append("email", String(email));
      formdata.append("phoneNumber", String(phoneNumber));
      formdata.append("bio", String(bio));
      formdata.append("resume", resume as Blob);
      formdata.append("skills",String (memoizedSelectedSkills) );
      console.log('memoizedSelectedSkills:', memoizedSelectedSkills)

      const res = await updateUser({ formdata }).unwrap();
      dispatch(userNotExist());
      dispatch(userExist(res.updatedUser!));
      console.log("updated user", res.updatedUser);
      toast.success("Updated Successfully");
      handleOpen(false);
    } catch (error) {
      console.log("error:", error);
      const err = error as FetchBaseQueryError;
      const message = err.data as UserResponseMessage<User>;
      toast.error(message.message! || "something went wrong");
      handleOpen(false);
    }
  };

  //*------------------------------- HANDLE FOR FILE UPLOAD (RESUME)---------------------------------//

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files![0];
    setResume(file);
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
                value={fullName}
                name="fullName"
                onChange={(e) => setFullName(e.target.value)}
                size="small"
                fullWidth
                label="Full Name"
              />
            </Stack>
            {/* -----------------------email------------------ */}
            <Stack>
              <Typography>Email</Typography>
              <TextField
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                fullWidth
                label="Email"
              />
            </Stack>
            {/* -----------------------number------------------ */}
            <Stack>
              <Typography>Number</Typography>
              <TextField
                value={phoneNumber}
                name="phoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
                size="small"
                fullWidth
                label="Phone Number"
              />
            </Stack>
            {/* -----------------------bio------------------ */}
            <Stack>
              <Typography>Bio</Typography>

              <TextField
                value={bio}
                name="bio"
                onChange={(e) => setBio(e.target.value)}
                size="small"
                fullWidth
                label="Bio"
              />
            </Stack>
            {/* -----------------------Skills------------------ */}
            <Stack>
              <Typography>Skills</Typography>

              <Autocomplete
                disablePortal
                multiple={true}
                limitTags={2}
                defaultValue={user?.skills}
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
                          accept: "file/*",
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
                    {resume && resume.name != ""
                      ? resume.name
                      : "No file choosen"}{" "}
                  </span>
                </Box>
            </Stack>
          </Stack>

          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            mb={"1rem"}
            mt={"2rem"}
          >
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
                disabled={fullName == "" || email == "" || phoneNumber == ""}
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
