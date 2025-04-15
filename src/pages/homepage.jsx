import React, { useEffect, useState } from "react";
import { cpmLogo, decryptIco, encryptIco } from "../assets";
import FormConfigure from "../components/form-configure";
import CardOption from "../components/card-option";
import { useLocation, useNavigate } from "react-router-dom";

const Homepage = () => {
  const [formVal, setFormVal] = useState({});

  const { state } = useLocation();

  const handleSubmit = (e) => {
    setFormVal(e);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (state?.sharedkey && state?.clientkey) {
      setFormVal(state);
    }
  }, []);

  return (
    <section className="py-8 flex space-y-4 flex-col items-center justify-center">
      <div className="flex items-center space-x-4">
        <img src={cpmLogo} className="h-28" />
        <div>
          <p className="font-semibold text-2xl text-[#0e212d]">
            CPM Api Testing
          </p>
          <p className="font-medium text-[#0e212d]">Encryptor & Decryptor</p>
        </div>
      </div>

      <FormConfigure
        onSubmit={handleSubmit}
        formVal={formVal}
        setFormVal={setFormVal}
      />

      {formVal?.clientkey && formVal?.sharedkey && (
        <div className="w-4/12 flex items-center space-x-6">
          <CardOption
            srcImg={encryptIco}
            title={"Encryptor Test"}
            onClick={() => navigate("/encryptor-test", { state: formVal })}
          />
          <CardOption
            srcImg={decryptIco}
            title={"Decryptor Test"}
            onClick={() => navigate("/decryptor-test", { state: formVal })}
          />
        </div>
      )}
    </section>
  );
};

export default Homepage;
