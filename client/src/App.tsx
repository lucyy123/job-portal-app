import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { JobReducerInitialState } from "./vite-env";
import { useGetJobsQuery } from "./redux/api/jobsApi";
import { getAllJobs, noJobs } from "./redux/reducers/jobs";

//!------------------- NORMAL IMPORTS--------------------------
import Loader from "./components/Loader";
import Header from "./components/Header";

//*------------------------------ LAZY IMPORTS --------------------------

const SignUp = lazy(() => import("./pages/SignUp"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Jobs = lazy(() => import("./pages/Jobs"));
const Browse = lazy(() => import("./components/Browse"));
const ViewProfile = lazy(() => import("./pages/Profile"));

const JobDiscription = lazy(() => import("./pages/JobDiscription"));

const App = () => {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector(
    (state: { jobs: JobReducerInitialState }) => state.jobs
  );

  const { refetch: getJobs } = useGetJobsQuery("");

  useEffect(() => {
    const handletoGetJobs = async () => {
      try {
        const res = await getJobs();
        if (res.data?.success) {
          dispatch(getAllJobs(res.data.Jobs));
        }
      } catch (error) {
        dispatch(noJobs());
        console.log("error:", error);
      }
    };

    handletoGetJobs();
  }, []);

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
          <Route path="/jobs" element={<Jobs jobs={jobs} />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/viewProfile" element={<ViewProfile />} />
          <Route path="/jobs/:id" element={<JobDiscription />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-right" />
    </Router>
  );
};

export default App;
