import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLazyGetJobsByQueryQuery } from "../redux/api/jobsApi"
import { JobReducerInitialState } from "../vite-env"
import { getAllJobs } from "../redux/reducers/jobs"

const useGetAllQueryJobs = () => {
    const dispatch = useDispatch()

    const [fetchdata] = useLazyGetJobsByQueryQuery()

    const { searchQuery } = useSelector((state: { jobs: JobReducerInitialState }) => state.jobs)
    useEffect(() => {

        const hanlde = async () => {
            try {
                const res = await fetchdata(searchQuery!).unwrap()
                if (res.success) {
                    dispatch(getAllJobs(res.Jobs))
                }
            } catch (error) {
                console.log('error:', error)

            }

        }

        hanlde()

    }, [dispatch, fetchdata, searchQuery])



}

export default useGetAllQueryJobs
