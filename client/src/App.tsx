import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// lazy imporst

const Header = lazy(()=>import("./components/Header"));
const Loader = lazy(()=>import("./components/Loader"))
const SignUp =lazy(()=>import("./pages/SignUp"))
const Home =lazy(()=>import("./pages/Home"))


const App = () => {
  return (


    <Router>
      <Header/>
      <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
