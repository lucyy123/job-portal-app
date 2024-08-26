import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLazyApplicantsOfJobQuery } from '../redux/api/applications'
import { getApplicationsOfJobId } from '../redux/reducers/application'

const useGetAllApplicants = (jobId: string) => {

    const dispatch = useDispatch()

    const [fethData] = useLazyApplicantsOfJobQuery()
    useEffect(() => {

        const handle = async () => {

            try {
                const res = await fethData(jobId).unwrap()
                if (res.success) {
                    dispatch(getApplicationsOfJobId(res.applications))
                }
            } catch (error) {
                console.log('error:', error)
            }

        }

        handle()
    }, [dispatch,jobId,fethData])

}

export default useGetAllApplicants
