import React, { useState } from "react";
import { decryptContent } from "../helpers/crypto";
import { useLocation, useNavigate } from "react-router-dom";
import JsonView from "@uiw/react-json-view";

const DecryptorTest = () => {
  const [text, setText] = useState("");

  const { state } = useLocation();

  const jsonView = () => {
    try {
      if (text.length > 0) {
        const decryptText = decryptContent({
          clientKey: state?.clientkey,
          sharedKey: state?.sharedkey,
          payload: text,
        });

        return (
          decryptText != null && (
            <JsonView className="w-full" value={JSON.parse(decryptText)} />
          )
        );
      }
      return;
    } catch (error) {
      return <div />;
    }
  };

  const navigate = useNavigate();

  return (
    <section className="grid grid-cols-2">
      <div className="p-5 border-b border-gray-200 col-span-2 flex items-center">
        <button
          className="font-medium"
          onClick={() =>
            navigate("/", {
              state: {
                sharedkey: state?.sharedkey,
                clientkey: state?.clientkey,
              },
            })
          }
        >
          ◀ Kembali
        </button>
        <p className="font-semibold text-center w-full flex-1">
          Decryptor Test
        </p>
      </div>

      <div className="w-full h-full p-5 lg:h-screen border border-gray-100 border-r flex flex-col  items-center space-y-4">
        <p className="font-semibold">Copy Text Here</p>
        <textarea
          className="textarea w-11/12"
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="w-full h-full p-5 lg:h-screen border border-gray-100 border-l flex items-center flex-col space-y-4">
        <p className="font-semibold">Result</p>
        {jsonView()}
      </div>
    </section>
  );
};

export default DecryptorTest;
