import { useContext } from "react";
import { evaluateExpression } from "./common/utility";
import { SmartComponentContext } from "./SmartComponent";
import CheckControl from "./SmartControls/CheckControl";
import GridBoxControl from "./SmartControls/GridBoxControl";
import RadioControl from "./SmartControls/RadioControl";
import SelectControl from "./SmartControls/SelectControl";
import TextControl from "./SmartControls/TextControl";

const SmartSubSectionComponent = ({ sectionId }) => {
    const { state } = useContext(SmartComponentContext);
    const sectionConfig = state["config"]["sectionConfig"]?.filter((section) => section.id === sectionId)[0];
    const controlGroup = sectionConfig["controlGroup"];

    const getControl = (control) => {
        const key = `section-${sectionConfig.id}-${control.id}`;

        const isHidden = evaluateExpression(control.props.hideExpression, state);
        if (isHidden) return;

        switch (control.type) {
            case "TEXT":
                return <TextControl key={key} sectionId={sectionConfig.id} control={control} />;
            case "RADIO":
                return <RadioControl key={key} sectionId={sectionConfig.id} control={control} />;
            case "CHECK":
                return <CheckControl key={key} sectionId={sectionConfig.id} control={control} />;
            case "SELECT":
                return <SelectControl key={key} sectionId={sectionConfig.id} control={control} />;
            case "GRID_BOX":
                return <GridBoxControl key={key} sectionId={control.id} control={control} />;
            case "CUSTOM":
                return <SmartSubSectionComponent key={key} sectionId={control.props.sectionId} />;
            default:
                return new Error();
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex flex-wrap">{controlGroup.map((control) => getControl(control))}</div>
        </div>
    );
};

export default SmartSubSectionComponent;
