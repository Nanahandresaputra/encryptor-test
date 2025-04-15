import React from "react";

const CardOption = ({ srcImg, title, onClick }) => {
  return (
    <section
      className="p-5 border w-full flex flex-col items-center border-gray-200 rounded-lg shadow-sm hover:shadow-xl space-y-5 hover:cursor-pointer"
      onClick={onClick}
    >
      <img src={srcImg} alt={srcImg} className="w-40" />
      <p className="font-medium text-lg">{title}</p>
    </section>
  );
};

export default CardOption;
