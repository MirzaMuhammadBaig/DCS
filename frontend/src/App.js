import Navbar from "./components/navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import BecomeProvider from "./components/provider/BecomeProvider";
import Footer from "./components/Footer/Footer";
import SendCert from "./components/certificate/SendCert";
import Notification from "./components/notification/Notification"
import "./App.css"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/provider" element={<BecomeProvider />} />
        <Route path="/certificate" element={<SendCert />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/" element={<Footer />} />
      </Routes>
    </div>
  );
}

export default App;
