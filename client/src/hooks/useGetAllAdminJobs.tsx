import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetAdminJobsQuery } from "../redux/api/jobsApi";
import { adminJobs } from "../redux/reducers/jobs";

const useGetAllAdminJobs = () => {
  const dispacth = useDispatch();

  const [fetchData] = useLazyGetAdminJobsQuery();

  useEffect(() => {
    const handleJobs = async () => {
      try {
        const res = await fetchData("").unwrap();
        if (res.success) {
            console.log("admin jobs",res.jobs)
          dispacth(adminJobs(res.jobs));
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
    handleJobs();
  }, [dispacth, fetchData]);
};

export default useGetAllAdminJobs;
