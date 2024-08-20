import { Box, Container, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import SearchJobCard from '../components/SearchJobCard'
import { JobReducerInitialState } from '../vite-env'

const Browse = () => {
 const {jobs,loading} = useSelector((state:{jobs:JobReducerInitialState})=>state.jobs)



if(loading) return <Loader></Loader>

  return (
    <Container maxWidth={"lg"} sx={{
        mt:"3rem"
    }}>

<Typography variant='h4' fontSize={"1.4rem"} fontWeight={"bold"} mb={"1rem"}> Search Results (15) </Typography>

<Box>

<Grid container rowSpacing={3}columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  { jobs && jobs.length>0?   jobs
    .map((ele, idx) => (
        <Grid item key={idx} xs={12} sm={6} md={4} >
        <SearchJobCard singlejob={ele} />
      </Grid>
    )):(<Typography variant='h5'>No jobs Available </Typography>) }
</Grid>
    </Box>



    </Container>
  )
}

export default Browse
