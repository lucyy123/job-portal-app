import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetCompanyByIdQuery } from "../redux/api/companiesApi";
import { noSingleCompany, SingleCompany } from "../redux/reducers/companies";

const useGetSingleCompany = (companyId: string) => {
  const [fetchData ] = useLazyGetCompanyByIdQuery();
  const dispacth = useDispatch();
  useEffect(() => {
    const handleGetCompanyById = async () => {
      try {
        const res = await fetchData(companyId).unwrap();
        if (res.success) {
          dispacth(SingleCompany(res.company));
        }else{

            dispacth(noSingleCompany());
        }
      } catch (error) {
        console.log("error:", error);

      }
    };
    handleGetCompanyById();
  }, [dispacth,fetchData,companyId]);
};

export default useGetSingleCompany;
