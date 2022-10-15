import React, { useContext } from "react";
import SmartControl from "./SmartControl";
import { getStateKeyValueForSection } from "./SmartFunctions";
import { SmartContext } from "./SmartPageControl";

const SmartArrayControl = ({ sectionId }) => {
    const { state } = useContext(SmartContext);
    const { data } = getStateKeyValueForSection(sectionId, state);

    return (
        <>
            {data.map((row, index) => (
                <SmartControl key={`section-${sectionId}-${index}`} sectionId={sectionId} index={index} />
            ))}
        </>
    );
};

export default SmartArrayControl;
