import { useEffect } from "react";
import { useGetJobsQuery } from "../redux/api/jobsApi";
import { getAllJobs} from "../redux/reducers/jobs";
import { useDispatch } from "react-redux";

const useGetAllJobs = () => {

    const { refetch: getJobs } = useGetJobsQuery("");

const dispatch = useDispatch()
    useEffect(() => {
      //*--------------------------------fETCHING THE ALL JOBS------------------------------------
  
      const handletoGetJobs = async () => {
        try {
          const res = await getJobs();
          if (res.data?.success) {
            dispatch(getAllJobs(res.data.Jobs));
          }  
          //*----------------------------------[first step after user logged in] if cookies and user is there store the token in token reducer ----------------------------
        } catch (error) {
          console.log("error:", error);
        }
      };
      handletoGetJobs();
  
    }, [dispatch,getJobs]);
}

export default useGetAllJobs
