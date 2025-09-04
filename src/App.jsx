import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Homepage from "./pages/homepage";
import EcnryptorTest from "./pages/ecnryptor-test";
import DecryptorTest from "./pages/decryptor-test";
import Login from "./pages/login";
import { config } from "./config";
import { getIP } from "./helpers/getIp";
import { decryptContent } from "./helpers/crypto";
import { useCallback, useEffect, useState } from "react";

const PrivateRouter = ({ children }) => {
  const [isNextUrl, setIsNextUrl] = useState(null);

  const validateData = useCallback(async () => {
    const { myKey, randomStr, username, pw, indifidier } = config;
    const sessionData = sessionStorage?.session;
    try {
      const ipData = await getIP()
        .then((res) => res)
        .then((res) => res)
        .catch(() => {});

      const decrAuth = decryptContent({
        clientKey: randomStr,
        sharedKey: indifidier,
        key: myKey,
        payload: sessionData,
      });

      const parseData = await JSON.parse(decrAuth);

      const validateData =
        (await parseData?.username) === username &&
        parseData?.password === pw &&
        parseData?.ipDat === ipData?.ip;

      // return validateData;
      setIsNextUrl(validateData);
    } catch (error) {
      // return false;
      sessionStorage.clear();
      setIsNextUrl(false);
    }
  }, []);

  useEffect(() => {
    validateData();
  }, []);

  if (isNextUrl === null) {
    return;
  } else {
    return isNextUrl ? children : <Navigate to="/login" />;
  }
};

function App() {
  // console.log(config);

  console.log = () => {};

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRouter>
              <Homepage />
            </PrivateRouter>
          }
        />
        <Route
          path="/encryptor-test"
          element={
            <PrivateRouter>
              <EcnryptorTest />
            </PrivateRouter>
          }
        />
        <Route
          path="/decryptor-test"
          element={
            <PrivateRouter>
              <DecryptorTest />
            </PrivateRouter>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
