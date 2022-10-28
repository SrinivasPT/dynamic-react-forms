import React, { useContext, useState } from "react";
import { SmartContext } from "../Context/SmartContext";

const StateButtonControl = ({ control }) => {
    const { dispatch } = useContext(SmartContext);
    const handleClick = (event) => {
        event.preventDefault();
        console.log("Clicked Button!");
        dispatch({ type: control.props.action });
    };
    return (
        <button type="button" className={`btn btn-${control.props.style}  m-2`} onClick={handleClick}>
            {control.props.label}
        </button>
    );
};

export default StateButtonControl;
