import React, { useContext } from "react";
import SmartControl from "./SmartControl";
import { getStateKeyValueForControl } from "../Context/SmartFunctions";
import { SmartContext } from "../Context/SmartContext";

const SmartArrayControl = ({ sectionId, dataKey }) => {
    const { state } = useContext(SmartContext);
    const data = getStateKeyValueForControl(dataKey, state);

    return (
        <>
            {data.map((row, index) => (
                <SmartControl key={`section-${sectionId}-${index}`} sectionId={sectionId} index={index} dataKey={dataKey + "." + index} />
            ))}
        </>
    );
};

export default SmartArrayControl;
