import React from "react";
import { useContext } from "react";
import { SmartContext } from "../Context/SmartContext";
import { getStateKeyValueForControl, isEmpty } from "../Context/SmartFunctions";
import LabelControl from "./LabelControl";

function GridRowControl({ sectionId, control, dataKey }) {
    const { state } = useContext(SmartContext);

    if (isEmpty(state["data"])) return;

    return (
        <div className="container text-start">
            {state["data"][sectionId].map((row, rowIndex) => (
                <div key={dataKey + sectionId + rowIndex + "upperRow"}>
                    <label className="text-primary">{row[control["props"]["gridOptions"]["rowTitle"]]}</label>
                    <div className="row">
                        {control["props"]["gridOptions"]["columnDefs"].map((column, colIndex) => (
                            <div key={dataKey + sectionId + rowIndex + "dataRow" + colIndex + "col"} className="col">
                                <LabelControl controlId={column.id} label={column.label} data={row[column.id]} css="col" />
                            </div>
                        ))}
                    </div>
                    <div className="h4 pb-2 mb-4 text-danger border-bottom border-black-50"></div>
                </div>
            ))}
        </div>
    );
}

export default GridRowControl;
