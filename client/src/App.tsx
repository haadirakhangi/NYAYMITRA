import { Playground } from "./components/playground";
import Register from "./views/UserRegister";
import AdvoRegister from "./views/AdvoRegister";
import Login from "./views/UserLogin";
import AdvoLogin from "./views/AdvoLogin";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from "./main/landing";
import Lawyers from "./main/advoconnect";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/chatbot" element={<Playground />} />
        <Route path="/user-login" element={<Login />} />
        <Route path="/user-register" element={<Register />} />
        <Route path="/advo-register" element={<AdvoRegister />} />
        <Route path="/advo-login" element={<AdvoLogin />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/advoconnect" element={<Lawyers />} />
      </Routes>
    </Router>
  );
}

export default App;
