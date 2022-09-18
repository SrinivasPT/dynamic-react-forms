import RadioControl from "./SmartControls/RadioControl";
import SelectControl from "./SmartControls/SelectControl";
import TextControl from "./SmartControls/TextControl";

const SmartSubSectionComponent = ({ sectionConfig }) => {
    const controlGroup = sectionConfig["controlGroup"];

    const getControl = (control) => {
        const key = `section-${sectionConfig.id}-${control.id}`;
        switch (control.type) {
            case "TEXT":
                return <TextControl key={key} sectionId={sectionConfig.id} control={control} />;
            case "RADIO":
                return <RadioControl key={key} sectionId={sectionConfig.id} control={control} />;
            case "SELECT":
                return <SelectControl key={key} sectionId={sectionConfig.id} control={control} />;
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
