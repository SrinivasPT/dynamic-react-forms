import React from "react";
import { useContext } from "react";
import { SmartContext } from "../Context/SmartContext";
import { isEmpty } from "../Context/SmartFunctions";
import LabelControl from "./LabelControl";

function GridRowControl({ sectionId, control, dataKey }) {
    const { state } = useContext(SmartContext);

    if (isEmpty(state["data"])) return;

    return (
        <div className="text-start col-12">
            {state["data"][sectionId].map((row, rowIndex) => (
                <div key={dataKey + sectionId + rowIndex + "upperRow"}>
                    <label className="text-primary">{row[control["props"]["gridOptions"]["rowTitle"]]}</label>
                    <div className="row">
                        {control["props"]["gridOptions"]["columnDefs"].map((column, colIndex) => (
                            <div key={dataKey + sectionId + rowIndex + "dataRow" + colIndex + "col"} className="col">
                                <LabelControl controlId={column.id} label={column.label} data={row[column.id]} width={column.width} />
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
