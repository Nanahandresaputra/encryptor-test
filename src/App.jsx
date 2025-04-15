import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import EcnryptorTest from "./pages/ecnryptor-test";
import DecryptorTest from "./pages/decryptor-test";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/encryptor-test" element={<EcnryptorTest />} />
        <Route path="/decryptor-test" element={<DecryptorTest />} />
      </Routes>
    </Router>
  );
}

export default App;
