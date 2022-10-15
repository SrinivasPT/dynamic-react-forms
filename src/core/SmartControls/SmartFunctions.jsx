export const getStateKeyValueForSection = (sectionId, state) => {
    const parent = state["config"]["sectionConfig"]?.filter((section) => section.id === sectionId)[0]["parent"];
    const dataKey = parent ? parent + "." + sectionId : sectionId;
    return { key: dataKey, data: dataKey.split(".").reduce((a, c) => a[c], state.data) };
};

export const getStateKeyValueForControl = (sectionId, index, state, control) => {
    const sectionConfig = state["config"]["sectionConfig"]?.filter((section) => section.id === sectionId)[0];
    let dataKey = sectionConfig["parent"] ? sectionConfig["parent"] + "." + sectionConfig.id : sectionId;
    dataKey = index === undefined ? dataKey + "." + control.id : dataKey + "." + index + "." + control.id;
    return {
        key: dataKey,
        data: dataKey.split(".").reduce((a, c) => a[c], state.data),
    };
};
