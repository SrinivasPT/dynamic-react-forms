import React from "react";
import { useContext } from "react";
import { SmartContext } from "../Context/SmartContext";

const GridBoxControl = ({ sectionId, control, dataKey }) => {
    const { state, dispatch } = useContext(SmartContext);

    return (
        <div className="d-flex flex-wrap">
            {state["data"][sectionId].map((row) => (
                <div className="col-4 border">
                    {control["props"]["gridOptions"]["columnDefs"].map((column) => (
                        <>
                            <label>{column.label}</label>:<label>{row[column.id]}</label>
                            <br></br>
                        </>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GridBoxControl;
