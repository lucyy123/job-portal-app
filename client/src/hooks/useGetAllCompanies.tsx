import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyAllCompaniesQuery } from "../redux/api/companiesApi";
import { getAllCompanies, } from "../redux/reducers/companies";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  const [fetchData] = useLazyAllCompaniesQuery();

  useEffect(() => {
    const handleCompanies = async () => {
      try {
        const res = await fetchData("").unwrap();
        if (res.success) {
          dispatch(getAllCompanies(res.companies));
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    handleCompanies();
  }, [dispatch, fetchData]);
};

export default useGetAllCompanies;
