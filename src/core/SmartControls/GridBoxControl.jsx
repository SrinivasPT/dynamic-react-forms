import React from "react";
import { useContext } from "react";
import { SmartComponentContext } from "../SmartComponent";

const GridBoxControl = ({ sectionId, control }) => {
    const { state, dispatch } = useContext(SmartComponentContext);

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
