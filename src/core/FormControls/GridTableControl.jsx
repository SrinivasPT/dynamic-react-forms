import React, { useContext, useState } from "react";
import { getStateKeyValueForControl, isEmpty } from "../Context/SmartFunctions";
import { SmartContext } from "../Context/SmartContext";

function GridTableControl({ sectionId, control, dataKey }) {
    const { state } = useContext(SmartContext);
    let gridData = getStateKeyValueForControl(dataKey, state);
    gridData = isEmpty(gridData) ? [] : gridData;

    const getHeader = () => {
        return (
            <thead className="table-secondary">
                <tr>
                    {control["props"]["gridOptions"]["columnDefs"].map((column, index) => (
                        <th key={dataKey + column.id} scope="col">
                            {column.label}
                        </th>
                    ))}
                </tr>
            </thead>
        );
    };

    const getBody = () => {
        return (
            <tbody>
                {gridData.map((row, rowIndex) => (
                    <tr key={dataKey + rowIndex}>
                        {control["props"]["gridOptions"]["columnDefs"].map((column, colIndex) => (
                            <td key={dataKey + rowIndex + colIndex}>{row[column.id]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    };

    return (
        <div className="col-12 table-responsive">
            <table className="table">
                {getHeader()}
                {getBody()}
            </table>
        </div>
    );
}

export default GridTableControl;
