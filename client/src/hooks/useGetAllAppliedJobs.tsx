import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyAppliedJobsQuery } from "../redux/api/applications";
import { getApplieadJob } from "../redux/reducers/application";

const useGetAllAppliedJobs = () => {
  const dispatch = useDispatch();

  const [fetchdata] = useLazyAppliedJobsQuery();
  useEffect(() => {
    const handle = async () => {
      try {
        const res = await fetchdata("").unwrap();
        if (res.success) {
          dispatch(getApplieadJob(res.appliedJobs));
        }
      } catch (error) {
       
        console.log("error:", error);
      }
    };

    handle();
  },[dispatch,fetchdata]);
};

export default useGetAllAppliedJobs;
