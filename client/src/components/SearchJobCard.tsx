import { BookmarkAddOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import companyIcon from "../assets/images/palestineFlag.jpg";
import { calculateDays, rupessConverter } from "../utils/constants";
import { Jobs } from "../vite-env";
type Props ={
  singlejob:Jobs
}

const SearchJobCard = ({singlejob}:Props) => {
  const navigate = useNavigate()
  return (
    <Box maxWidth={350} display={'flex'} justifyContent={"center"} alignItems={'center'}>
      <Card elevation={2} sx={{
       width:"100%"
      }} >
        <CardContent>
          <Stack gap={"1rem"}>
            <Stack direction={"row"}>
              <Typography marginRight={"auto"}>{calculateDays(singlejob?.createdAt)} days ago</Typography>
              <BookmarkAddOutlined></BookmarkAddOutlined>
            </Stack>
            {/* ------------------ company Icon + company Mame  */}
            <Stack direction={"row"} gap={"1rem"}>
              <Box
                width={"20%"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
              >
                <Avatar
                  src={companyIcon}
                  alt="company_icon"
                  sx={{
                    width: "2.3rem",
                    height: "2.3rem",
                  }}
                />
              </Box>
              <Stack flex={1}>
                <Typography variant="h6" fontWeight={"500"}>
                {singlejob?.company?.name}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={"bold"}
                  fontSize={"1rem"}
                  color={"grey"}
                >
                  {" "}
                        {/* job location */}
               {singlejob?.location}
                </Typography>
              </Stack>
            </Stack>

            {/* job title + job discription + job key */}
            <Stack gap={"1rem"}>
              <Typography fontWeight={"bold"} variant="h1" fontSize={"1.4rem"}>
              {singlejob?.title}
              </Typography>
              <Typography
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  fontSize: "0.85rem",
                  color: "GrayText",
                }}
              >
              {singlejob?.discription}
              </Typography>

              <Stack
                direction={"row"}
                sx={{
                  "& .MuiButton-root": {
                    textTransform: "none",
                    borderRadius: "25px",
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                  },
                }}
                justifyContent={"space-between"}
              >
                <Button variant="outlined" color="info">
                  {singlejob?.position} Positions
                </Button>
                <Button variant="outlined" color="error">
                 {singlejob?.jobType}
                </Button>
                <Button variant="outlined" color="primary">
                 {rupessConverter(singlejob?.salary)}/Yr
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
        {/* ---------Details button + save for later button */}
        <CardActions>
          <Stack
            direction={"row"}
            gap={"1rem"}
            sx={{
              "& .MuiButton-root": {
                textTransform: "none",
              },
              marginBottom: "1rem",
            }}
          >
            <Button variant="outlined" onClick={()=>navigate(`/job/${singlejob?._id}`)}>Details</Button>
            <Button variant="contained">Save for later</Button>
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
};

export default SearchJobCard;
