import React, { useEffect, useState } from "react";
import { encryptContent } from "../helpers/crypto";
import { useLocation, useNavigate } from "react-router-dom";
import JsonView from "@uiw/react-json-view";

const EcnryptorTest = () => {
  const [text, setText] = useState("");
  const [encryptText, setEncryptText] = useState("");
  const [copied, setCopied] = useState(false);

  const { state } = useLocation();

  const copyText = () => {
    navigator.clipboard.writeText(encryptText);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const returnJsonView = () => {
    try {
      const textData = JSON.parse(text);
      return (
        <div className="w-11/12 p-3 bg-white rounded-lg h-full">
          <JsonView value={textData} />
        </div>
      );
    } catch (err) {
      return (
        <input
          type="text"
          className="input w-11/12"
          onChange={(e) => setText(e.target.value)}
        />
      );
    }
  };

  useEffect(() => {
    if (text.length > 0) {
      try {
        setEncryptText(
          encryptContent({
            sharedKey: state?.sharedkey,
            clientKey: state?.clientkey,
            payload: JSON.parse(text),
            key: state?.project,
          })
        );
      } catch (error) {
        setEncryptText("invalid json");
      }
    }
  }, [text]);

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
                project: state?.project,
              },
            })
          }
        >
          ◀ Kembali
        </button>
        <p className="font-semibold text-center w-full flex-1">
          Encryptor Test
        </p>
      </div>

      <div className="w-full h-full p-5 lg:h-screen border border-gray-100 border-r flex flex-col  items-center space-y-4">
        <p className="font-semibold">Copy Object Here</p>

        {text.length > 0 ? (
          returnJsonView()
        ) : (
          <textarea
            className="textarea w-11/12"
            onChange={(e) => setText(e.target.value)}
          />
        )}
      </div>
      <div className="w-full h-full p-5 lg:h-screen border border-gray-100 border-l flex items-center flex-col space-y-4">
        <p className="font-semibold">Result</p>
        <div className="w-full border border-gray-200 rounded-lg p-2">
          <p className="break-words">{encryptText}</p>
        </div>
        <button className="w-full btn" onClick={copyText} disabled={copied}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </section>
  );
};

export default EcnryptorTest;
