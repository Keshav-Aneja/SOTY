import React from "react";
interface Props {
  children: string;
  onClickHandler?: any;
}
const PrimaryButton = ({ children, onClickHandler }: Props) => {
  return (
    <div
      className="w-fit px-12 py-4 rounded-full text-3xl font-semibold shadow-md"
      style={{ background: "linear-gradient(to right,#AA00FF ,#3D00A6)" }}
      onClick={() => {
        onClickHandler && onClickHandler();
      }}
    >
      {children}
    </div>
  );
};

export default PrimaryButton;