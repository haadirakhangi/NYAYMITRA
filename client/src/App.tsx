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
function App() {

  return (
    <Router>
      <Routes>
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
      </Routes>
    </Router>
  );
}

export default App;
