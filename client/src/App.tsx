import { Playground } from "./components/playground";
import Register from "./views/UserRegister";
import AdvoRegister from "./views/AdvoRegister";
import Login from "./views/UserLogin";
import AdvoLogin from "./views/AdvoLogin";
// import AdminDashboard from "./views/AdminDashboard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from "./main/landing";
import Lawyers from "./main/advoconnect";
import Rights from "./main/rights"
import Home from "./main/userhome";
import Features from "./main/features";
import Advocate_home from "./main/advocatehome";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/chatbot" element={<Playground />} />
        <Route path="/user-login" element={<Login />} />
        <Route path="/user-register" element={<Register />} />
        <Route path="/advo-register" element={<AdvoRegister />} />
        <Route path="/advo-login" element={<AdvoLogin />} />
        {/* <Route path="/admin-home" element={<AdminDashboard />} /> */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/advoconnect" element={<Lawyers />} />
        <Route path="/rights" element={<Rights />} />
        <Route path="/userhome" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/advohome" element={<Advocate_home />} />
      </Routes>
    </Router>
  );
}

export default App;
