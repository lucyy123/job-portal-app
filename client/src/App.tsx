import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// lazy imporst

const Header = lazy(() => import("./components/Header"));
const Loader = lazy(() => import("./components/Loader"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Jobs = lazy(()=>import(
  "./pages/Jobs"
));
const Browse = lazy(()=>import("./components/Browse"));
const ViewProfile = lazy(()=>import(
  "./pages/Profile"
))

const JobDiscription = lazy (()=>import("./pages/JobDiscription"))

const App = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/viewProfile" element={<ViewProfile/>}/>

<Route path="/jobs/:id" element={<JobDiscription/>}/>

        </Routes>
      </Suspense>
      <Toaster position="bottom-right" />
    </Router>
  );
};

export default App;
