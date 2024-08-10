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

const SearchJobCard = () => {
  const navigate = useNavigate()
  return (
    <Box maxWidth={400}>
      <Card elevation={2}>
        <CardContent>
          <Stack gap={"1rem"}>
            <Stack direction={"row"}>
              <Typography marginRight={"auto"}>2 days ago</Typography>
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
                  Company Name
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={"bold"}
                  fontSize={"1rem"}
                  color={"grey"}
                >
                  {" "}
                  India
                </Typography>
              </Stack>
            </Stack>

            {/* job title + job discription + job key */}
            <Stack gap={"1rem"}>
              <Typography fontWeight={"bold"} variant="h1" fontSize={"1.4rem"}>
               Title
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
                illum quos. Autem vitae sint culpa facere alias optio nostrum
                quidem incidunt molestias, labore dolores fugit est temporibus
                veniam quod. Voluptatum!*4
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
                  12 Positions
                </Button>
                <Button variant="outlined" color="error">
                  Full Time
                </Button>
                <Button variant="outlined" color="primary">
                  24LPA
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
            <Button variant="outlined" onClick={()=>navigate("/jobs/dfjlkdjsl")}>Details</Button>
            <Button variant="contained">Save for later</Button>
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
};

export default SearchJobCard;
