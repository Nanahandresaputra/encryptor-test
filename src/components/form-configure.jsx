import React from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../config";

const FormConfigure = ({ onSubmit, formVal }) => {
  const navigate = useNavigate();

  const disableField =
    formVal?.clientkey && formVal?.sharedkey && formVal?.project;

  return (
    <form
      autoComplete="off"
      method="POST"
      className="w-4/12 border border-gray-200 rounded-lg p-5 grid grid-cols-2 gap-x-4 gap-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          project: e.target.elements["project"].value,
          clientkey: e.target.elements["clientkey"].value,
          sharedkey: e.target.elements["sharedkey"].value,
        });
      }}
    >
      <select
        defaultValue="Pilih Project"
        className="select col-span-2 w-full "
        name="project"
        id="project"
        disabled={disableField}
      >
        <option disabled={true}>Pilih Project</option>
        <option value={config.valKeyKjr}>CPM Lite V4</option>
        <option value={config.valKeyFe}>CPM Peer Review</option>
        <option value={config.valKeyKjr}>CPM Ticketing</option>
        <option value={config.valKeyFe}>SharpXvend</option>
        <option value={config.valKeyBpdSumut}>BPD Sumut</option>
        <option value={config.myKey}>Other</option>
      </select>

      <input
        type="text"
        placeholder="clientkey"
        className={`input w-full ${
          formVal?.clientkey && formVal?.sharedkey && "blur-md"
        }`}
        name="clientkey"
        id="clientkey"
        disabled={disableField}
      />
      <input
        type="text"
        placeholder="sharedkey"
        className={`input w-full ${
          formVal?.clientkey && formVal?.sharedkey && "blur-md"
        }`}
        name="sharedkey"
        id="sharedkey"
        disabled={disableField}
      />
      {formVal?.clientkey && formVal?.sharedkey && formVal?.project ? (
        <input
          type="reset"
          className="btn btn-warning text-white w-full col-span-2"
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
          className="btn btn-primary w-full col-span-2"
          value="Submit Configuration"
        />
      )}
    </form>
  );
};

export default FormConfigure;
