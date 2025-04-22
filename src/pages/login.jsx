import React, { useMemo } from "react";
import { cpmLogo } from "../assets";
import { config } from "../config";
import { decryptContent, encryptContent } from "../helpers/crypto";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getIP } from "../helpers/getIp";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const ipData = await getIP()
      .then((res) => res)
      .then((res) => res)
      .catch(() => {});

    const { myKey, randomStr, validateUsr, indifidier } = config;

    const usrLog = decryptContent({
      clientKey: randomStr,
      sharedKey: indifidier,
      key: myKey,
      payload: validateUsr,
    });

    const usrExt = JSON.parse(usrLog);
    const usrInp = {
      username: e.target.elements["username"].value,
      password: e.target.elements["password"].value,
    };

    if (
      usrExt?.username === usrInp.username &&
      usrExt?.password === usrInp.password
    ) {
      //   navigate("/");

      const saveToSession = encryptContent({
        clientKey: randomStr,
        sharedKey: indifidier,
        key: myKey,
        payload: { ...usrInp, ipDat: ipData?.ip },
      });
      //   console.log({ saveToSession });

      sessionStorage.setItem("session", saveToSession);
      navigate("/");
    } else {
      Swal.fire({
        //   title: "The Internet?",
        text: "Username or Password Invalid!",
        icon: "error",
      });
    }
  };

  const sessionData = useMemo(() => {
    return sessionStorage?.session;
  }, []);

  return sessionData ? (
    <Navigate to={"/"} />
  ) : (
    <section className="w-screen h-screen overflow-hidden flex justify-center items-center">
      <div className="border-2 border-gray-200 rounded-lg p-5 flex flex-col w-5/12 h-[43vh] justify-center items-center">
        <div className="flex items-center space-x-4 mb-10">
          <img src={cpmLogo} className="h-16" />
          <div>
            <p className="font-semibold text-lg text-[#0e212d]">Login</p>
            <p className="font-medium text-[#0e212d] text-sm">
              CPM Api Testing
            </p>
          </div>
        </div>

        <form
          method="POST"
          className="space-y-4"
          onSubmit={(e) => handleLogin(e)}
          autoComplete="off"
        >
          <input
            type="text"
            placeholder="username"
            className={`input w-full `}
            name="username"
            id="username"
            required
          />
          <input
            type="password"
            placeholder="password"
            className={`input w-full `}
            name="password"
            id="password"
            required
          />
          <input
            type="submit"
            className="btn btn-primary w-full col-span-2 mt-5"
            value="Login"
          />
        </form>
      </div>
    </section>
  );
};

export default Login;
