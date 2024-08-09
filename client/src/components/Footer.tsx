import { Copyright } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { IconButton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleEmail = () => {
    window.location.href = "mailto:your.email@example.com";
  };
  return (
    <footer
      style={{
        display: "flex",
        padding: "0rem 4rem",
        marginTop: "4rem",
        marginBottom: "2rem",
      }}
    >
      {/* copyright */}
      <Stack marginRight={"auto"}>
        <Typography variant="h6" fontWeight={600}>
          Job Connect
        </Typography>
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.3rem",
          }}
          fontSize={"0.8rem"}
          color={"grey"}
          fontWeight={600}
        >
          <Copyright></Copyright> 2024 Job Connect. All Rights Reserved
        </Typography>
      </Stack>
      {/* ------------------ Social Media Icons */}
      <Stack
        direction={"row"}
        gap={"1rem"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          "& *": {
            cursor: "pointer",
          },
        }}
      >
        <IconButton onClick={handleEmail}>

        <EmailIcon   sx={{
              color: "#000",
              width: "2rem",
              height: "2rem",
            }}></EmailIcon>
        </IconButton>

        <Link to={"https://www.linkedin.com/in/moniskhan1999/"} target="_blank">
          <LinkedInIcon
          
            sx={{
              color: "#000",
              width: "2rem",
              height: "2rem",
            }}
          ></LinkedInIcon>
        </Link>
      </Stack>
    </footer>
  );
};

export default Footer;
