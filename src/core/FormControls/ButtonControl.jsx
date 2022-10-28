import React, { useContext, useState } from "react";
import { SmartContext } from "../Context/SmartContext";

const ButtonControl = ({ control }) => {
    const { state, dispatch } = useContext(SmartContext);
    const handleClick = (event) => {
        event.preventDefault();
        console.log("Clicked Button!");
        state["eventHandlers"][control.id]();
        // dispatch({ type: control.props.action });
    };
    return <button onClick={handleClick}>{control.props.label}</button>;
};

export default ButtonControl;
