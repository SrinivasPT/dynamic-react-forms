import { useContext } from "react";

import CheckControl from "../FormControls/CheckControl";
import GridBoxControl from "../FormControls/GridBoxControl";
import RadioControl from "../FormControls/RadioControl";
import SelectControl from "../FormControls/SelectControl";
import SmartArrayControl from "./SmartArrayControl";
import { SmartContext } from "../Context/SmartContext";
import TextControl from "../FormControls/TextControl";
import { evaluateExpression, getStateKeyValueForControl } from "../Context/SmartFunctions";
import CardControl from "../FormControls/CardControl";
import LabelControl from "../FormControls/LabelControl";
import LabelConcatControl from "../FormControls/LabelConcatControl";
import GridRowControl from "../FormControls/GridRowControl";
import GridTableControl from "../FormControls/GridTableControl";
import TabControl from "../FormControls/TabControl";
import StateButtonControl from "../FormControls/StateButtonControl";
import EventButtonControl from "../FormControls/EventButtonControl";

const SmartControl = ({ sectionId, dataKey }) => {
    const { state } = useContext(SmartContext);
    const sectionConfig = state["config"]["sectionConfig"]?.filter(
        (section) =>
            section.id === sectionId &&
            ((state.mode.isEdit ? section?.template === sectionId + "Edit" : true) || section?.template === "BUTTONS")
    )[0];
    const controlGroup = sectionConfig["controlGroup"];

    const getControl = (control) => {
        const key = `section-${sectionConfig.id}-${control.id}`;
        const childDataKey = ["TAB"].includes(control.type) ? dataKey : dataKey + "." + control.id;

        if (control?.props?.hideExpression !== undefined) {
            const isHidden = evaluateExpression(control.props.hideExpression, state);
            if (isHidden) return;
        }

        switch (control.type) {
            case "TEXT":
                return <TextControl key={key} control={control} dataKey={childDataKey} />;
            case "LABEL":
                return (
                    <LabelControl
                        key={key}
                        controlId={control.id}
                        label={control.props.label}
                        categoryCode={control.props.domainCategoryCode}
                        data={getStateKeyValueForControl(dataKey + "." + control.id, state)}
                        width={control.width}
                    />
                );
            case "CONCAT_FIELDS_LABEL":
                return <LabelConcatControl key={key} control={control} dataKey={childDataKey} />;
            case "RADIO":
                return <RadioControl key={key} sectionId={sectionConfig.id} control={control} dataKey={childDataKey} />;
            case "CHECK":
                return <CheckControl key={key} sectionId={sectionConfig.id} control={control} dataKey={childDataKey} />;
            case "SELECT":
                return (
                    <SelectControl
                        key={key}
                        sectionId={sectionConfig.id}
                        control={control}
                        dataKey={childDataKey}
                        parentDataKey={dataKey}
                    />
                );
            case "GRID_BOX":
                return <GridBoxControl key={key} sectionId={control.id} control={control} dataKey={childDataKey} />;
            case "GRID_ROW":
                return <GridRowControl key={key} sectionId={control.id} control={control} dataKey={childDataKey} />;
            case "GRID_TABLE":
                return <GridTableControl key={key} sectionId={control.id} control={control} dataKey={childDataKey} />;
            case "TAB":
                return <TabControl key={key} sectionId={control.id} control={control} dataKey={childDataKey} />;
            case "STATE_BUTTON":
                return <StateButtonControl key={key} control={control} />;
            case "EVENT_BUTTON":
                return <EventButtonControl key={key} control={control} />;
            case "SMART":
                return (
                    <div className={`col-${control["width"]} mb-3`}>
                        <div key={key} className="d-flex flex-row flex-wrap ">
                            <SmartControl sectionId={control.id} dataKey={childDataKey} />
                        </div>
                    </div>
                );
            case "SMART_ARRAY":
                return (
                    <div key={key} className={`col-${control["width"]} mb-3`}>
                        <div className="d-flex flex-row flex-wrap">
                            <SmartArrayControl key={key} sectionId={control.id} dataKey={childDataKey} />
                        </div>
                    </div>
                );
            default:
                return new Error();
        }
    };

    const paintLayout = () => {
        switch (sectionConfig.layout) {
            case "CARD":
                return <CardControl sectionId={sectionId} component={controlGroup.map((control) => getControl(control))} layout="CARD" />;
            case "CARD_NO_HEADER":
                return (
                    <CardControl
                        sectionId={sectionId}
                        component={controlGroup.map((control) => getControl(control))}
                        layout="CARD_NO_HEADER"
                    />
                );
            default:
                return controlGroup.map((control) => getControl(control));
        }
    };

    return paintLayout();
};

export default SmartControl;
