import React from "react";
import Switch from "react-switch";

const ToggleSwitch = ({ isChecked, onChange }) => {
  return (
    <div className="flex-col">
      <div className="ml-4">
        <Switch
          checked={isChecked}
          onChange={onChange}
          onColor="#035AC5"
          height={34}
          checkedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textWrap: "no-wrap",
                width: "100%",
                fontSize: 15,
                alignItems: "center",
              }}
            >
              QR
            </div>
         }
          uncheckedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 15,
              }}
            >
              Web3
            </div>
          }
          onHandleColor="#ffffff"
          handleDiameter={28}
          width={100}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        />
      </div>
    </div>
  );
};

export default ToggleSwitch;
