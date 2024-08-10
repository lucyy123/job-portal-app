import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import SearchJobCard from './SearchJobCard'

const Browse = () => {
  return (
    <Container maxWidth={"lg"} sx={{
        mt:"3rem"
    }}>

<Typography variant='h4' fontSize={"1.4rem"} fontWeight={"bold"} mb={"1rem"}> Search Results (15) </Typography>

<Box>

<Grid container rowSpacing={3}columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  {Array(15)
    .fill(0)
    .map((ele, idx) => (
        <Grid item key={idx} xs={12} sm={6} md={4} >
        <SearchJobCard />
      </Grid>
    ))}
</Grid>
    </Box>



    </Container>
  )
}

export default Browse
