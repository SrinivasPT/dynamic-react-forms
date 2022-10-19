import React from "react";
import { useContext } from "react";
import { Style } from "../Common/Settings";
import { SmartContext } from "../Context/SmartContext";

const CardControl = ({ sectionId, component }) => {
    const { state } = useContext(SmartContext);
    const sectionConfig = state["config"]["sectionConfig"]?.filter((section) => section.id === sectionId)[0];
    const width = sectionConfig.width ? sectionConfig.width : 12;

    return (
        <div className={`col-${width} ${Style.FORM_CONTROL_MARGIN_AND_PADDING}`}>
            <div className="card">
                {sectionConfig.title ? <div className="card-header">{sectionConfig.title}</div> : <></>}
                <div className="card-body">
                    <div className="d-flex flex-wrap">{[component]}</div>
                </div>
            </div>
        </div>
    );
};

export default CardControl;
