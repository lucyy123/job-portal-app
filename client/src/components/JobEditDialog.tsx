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
  useState
} from "react";
import { useSelector } from "react-redux";
import { allskills } from "../utils/constants";
import { UserReducerInitialState } from "../vite-env";

type Propstype = {
  isOpen: boolean;
  handleOpen: Dispatch<React.SetStateAction<boolean>>;
};

const JobEditDialog = ({ isOpen, handleOpen }: Propstype) => {
  const { user, loading } = useSelector(
    (state: { user: UserReducerInitialState }) => state.user
  );
  const [userDetails, setUserDetails] = useState({
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    resume: user?.profile?.resume,
    skills: user?.profile?.skills || [""],
  });
  // const [newSkill, setNewSkill] = useState<string[] | null>();

  const [selectedSkill, setSelectedSkill] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserDetails((pre) => ({ ...pre, skills: selectedSkill }));
    console.log("selectedSkill", selectedSkill);
  };
  
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;

    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value, // Update other fields
    }));
  };
    console.log("userdetails",userDetails)

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
                value={userDetails.bio}
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
                defaultValue={userDetails.skills}
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
