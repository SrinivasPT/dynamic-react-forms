import React from "react";
import { useContext } from "react";
import { SmartContext } from "../Context/SmartContext";
import LabelControl from "./LabelControl";

function GridRowControl({ sectionId, control }) {
    const { state } = useContext(SmartContext);
    return (
        <div className="container text-start">
            {state["data"][sectionId].map((row) => (
                <div>
                    <div className="row">
                        {control["props"]["gridOptions"]["columnDefs"].map((column) => (
                            <div className="col">
                                <LabelControl controlId={column.id} label={column.label} data={row[column.id]} css="col" />
                            </div>
                        ))}
                    </div>
                    <div class="h4 pb-2 mb-4 text-danger border-bottom border-black-50"></div>
                </div>
            ))}
        </div>
    );
}

export default GridRowControl;
