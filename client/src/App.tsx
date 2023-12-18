import {Lawbot } from "./components/lawbot";
import Register from "./views/UserRegister";
import AdvoRegister from "./views/AdvoRegister";
import Login from "./views/UserLogin";
import AdvoLogin from "./views/AdvoLogin";
import AdminDashboard from "./views/AdminDashboard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from "./main/landing";
import Lawyers from "./main/advoconnect";
import { NarrativeLegalism } from "./views/NarrativeLegal";
import { DocumentSummarization } from "./views/DocumentSummarization";
import Rights from "./main/rights"
import Home from "./main/userhome";
import Features from "./main/features";
import Advocate_home from "./main/advocatehome";
import VideoCall from "./views/VideoCall"
import RoomPage from "./views/RoomPage";
// import Document from "./main/documentdraft";
import Connect from "./main/connect";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chatbot-lawbot" element={<Lawbot />} />
        <Route path="/chatbot-narrative-legalism" element={<NarrativeLegalism />} />
        <Route path="/chatbot-document-summarization" element={<DocumentSummarization />} />
        <Route path="/user-login" element={<Login />} />
        <Route path="/user-register" element={<Register />} />
        <Route path="/advo-register" element={<AdvoRegister />} />
        <Route path="/advo-login" element={<AdvoLogin />} />
        <Route path="/admin-home" element={<AdminDashboard />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/advoconnect" element={<Lawyers />} />
        <Route path="/rights" element={<Rights />} />
        <Route path="/userhome" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/advohome" element={<Advocate_home />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/video-call" element={<VideoCall />} />
        <Route path="/room-page" element={<RoomPage />} />

        {/* <Route path="/documentdraft" element={<Document />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
