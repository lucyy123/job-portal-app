import Cookies from "js-cookie";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useGetJobsQuery } from "./redux/api/jobsApi";
import { getAllJobs, noJobs } from "./redux/reducers/jobs";
import {
  JobReducerInitialState,
  UserReducerInitialState,
} from "./vite-env";

//!------------------- NORMAL IMPORTS--------------------------
import Header from "./components/Header";
import Loader from "./components/Loader";
import { setAuthToken } from "./redux/reducers/token";

//*------------------------------ LAZY IMPORTS --------------------------

const SignUp = lazy(() => import("./pages/SignUp"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Jobs = lazy(() => import("./pages/Jobs"));
const Browse = lazy(() => import("./pages/Browse"));
const ViewProfile = lazy(() => import("./pages/Profile"));
const JobDiscription = lazy(() => import("./pages/JobDiscription"));

//*------------------------------admin components-------------------

const Companies = lazy(() => import("./pages/admin/companies/Companies"));
const CompanyCreate = lazy(()=>import("./pages/admin/companies/CreateNewCompany"))
const Company = lazy(()=>import ("./pages/admin/companies/Comapany"))
const AdminJobs= lazy(()=>import("./pages/admin/jobs/Jobs"))
const CreateJob = lazy(()=>import('./pages/admin/jobs/CreateJob'))
const Applicants = lazy(()=>import("./pages/admin/applicants/applicants"))



const App = () => {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector(
    (state: { jobs: JobReducerInitialState }) => state.jobs
  );
  const { user } = useSelector(
    (state: { user: UserReducerInitialState }) => state.user
  );


  const { refetch: getJobs } = useGetJobsQuery("");


  useEffect(() => {
    //*--------------------------------fETCHING THE ALL JOBS------------------------------------

    const handletoGetJobs = async () => {
      try {
        const res = await getJobs();
        if (res.data?.success) {
          dispatch(getAllJobs(res.data.Jobs));
        }

        const Cookie = Cookies.get("token");

        //*----------------------------------[first step after user logged in] if cookies and user is there store the token in token reducer -----------------------------
        if (Cookie && user) {
          dispatch(setAuthToken(Cookie));
          console.log("Cookies Stored ");
        }
      } catch (error) {
        dispatch(noJobs());
        console.log("error:", error);
      }
    };
    handletoGetJobs();

  }, [dispatch,user,getJobs]);

  return loading ? (
    <Loader></Loader>
  ) : (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          //*------------------ Protected routes --------------------
          <Route path="/jobs" element={<Jobs jobs={jobs} />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/viewProfile" element={<ViewProfile />} />
          <Route path="/job/:id" element={<JobDiscription />} />
          //!----------------------- Admin Routes------------------------------------
          <Route
            path="/admin/companies"
            element={<Companies/>}
          />

          <Route  path="/admin/companies/create" element ={<CompanyCreate/>}/>

          <Route
            path="/admin/companies/:id"
            element={<Company/>}
          />

          <Route path="admin/jobs"  element={<AdminJobs/>} />
          <Route path = "/admin/job/create" element ={<CreateJob/>}/>
<Route path="/admin/jobs/:id/applicants" element={<Applicants/>} />


        </Routes>
      </Suspense>
      <Toaster position="bottom-right"  />
    </Router>
  );
};

export default App;
