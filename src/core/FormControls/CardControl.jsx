import React from "react";
import { useContext } from "react";
import { Style } from "../common/Settings";
import { SmartContext } from "../Context/SmartContext";

const CardControl = ({ sectionId, component, layout }) => {
    const { state } = useContext(SmartContext);
    const sectionConfig = state["config"]["sectionConfig"]?.filter((section) => section.id === sectionId)[0];

    const paintCardLayout = () => {
        return (
            <div className="card mb-3">
                {sectionConfig.title ? <div className="card-header">{sectionConfig.title}</div> : <></>}
                <div className="card-body">
                    <div className="d-flex flex-wrap">{[component]}</div>
                </div>
            </div>
        );
    };

    const paintCardWithOutHeader = () => {
        return (
            <>
                <h6>{sectionConfig.title}:</h6>
                <div className="card-body">
                    <div className="d-flex flex-wrap">{[component]}</div>
                </div>
            </>
        );
    };

    const paint = () => {
        switch (layout) {
            case "CARD":
                return paintCardLayout();
            case "CARD_NO_HEADER":
                return paintCardWithOutHeader();
            default:
                return paintCardLayout();
        }
    };

    return paint();
};

export default CardControl;
