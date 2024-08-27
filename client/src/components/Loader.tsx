import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center' }} height={'100vh'} width={'100%'} >
      <CircularProgress color="primary" />
    </Box>
  );
}

export default Loader
