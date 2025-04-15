import React from "react";
import { useNavigate } from "react-router-dom";

const FormConfigure = ({ onSubmit, formVal, setFormVal }) => {
  const navigate = useNavigate();
  return (
    <form
      className="w-4/12 border border-gray-200 rounded-lg p-5 grid grid-cols-2 gap-x-4 gap-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          clientkey: e.target.elements["clientkey"].value,
          sharedkey: e.target.elements["sharedkey"].value,
        });
      }}
    >
      <input
        type="text"
        placeholder="clientkey"
        className={`input w-full ${
          formVal?.clientkey && formVal?.sharedkey && "blur-md"
        }`}
        name="clientkey"
        id="clientkey"
      />
      <input
        type="text"
        placeholder="sharedkey"
        className={`input w-full ${
          formVal?.clientkey && formVal?.sharedkey && "blur-md"
        }`}
        name="sharedkey"
        id="sharedkey"
      />
      {formVal?.clientkey && formVal?.sharedkey ? (
        <input
          type="reset"
          className="btn w-full col-span-2"
          value="Reset"
          onClick={(e) => {
            e.preventDefault();
            window.location.reload();
            navigate("/", { replace: true });
          }}
        />
      ) : (
        <input
          type="submit"
          className="btn w-full col-span-2"
          value="Submit Configuration"
        />
      )}
    </form>
  );
};

export default FormConfigure;
