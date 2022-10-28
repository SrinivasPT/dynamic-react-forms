import React, { useContext, useState } from "react";
import { SmartContext } from "../Context/SmartContext";

const EventButtonControl = ({ control }) => {
    const { state } = useContext(SmartContext);
    const handleClick = (event) => {
        event.preventDefault();
        console.log("Clicked Button!");
        state["eventHandlers"][control.id]();
    };
    return (
        <button type="button" className={`btn btn-${control.props.style} m-2`} onClick={handleClick}>
            {control.props.label}
        </button>
    );
};

export default EventButtonControl;
