const smartReducer = (state, action) => {
    switch (action.type) {
        case "CONFIG_FETCH_INIT":
            state.isConfigLoading = true;
            break;
        case "FORM_DATA_FETCH_INIT":
            state.isFormDataLoading = true;
            break;
        case "DOMAIN_DATA_FETCH_INIT":
            state.isDomainDataLoading = true;
            break;
        case "CONFIG_FETCH_ERROR":
            state.isError = true;
            break;
        case "FORM_DATA_FETCH_ERROR":
            state.isError = true;
            break;
        case "DOMAIN_DATA_FETCH_ERROR":
            state.isError = true;
            break;
        case "API_RESPONSE":
            state.data = action.payload.data;
            state.config = action.payload.config;
            state.domain = action.payload.domain;
            break;
        case "EDIT_SECTION_START":
            state.mode.isEdit = true;
            state.mode.sectionInEditMode = action.payload;
            break;
        case "EDIT_SECTION_SAVE":
        case "EDIT_SECTION_CANCEL":
            state.mode.isEdit = false;
            state.mode.sectionInEditMode = "";
            break;
        case "CONTROL_VALUE_CHANGE":
            const nodes = action.payload.dataKey.split(".");
            let element = {};
            for (let i = 0; i < nodes.length; i++) {
                if (i === 0) {
                    element = state.data[nodes[i]];
                } else if (i < nodes.length - 1) {
                    element = element[nodes[i]];
                } else {
                    element[nodes[i]] = action.payload.value;
                }
            }
            break;
        case "SAMPLE_BUTTON_CLICK":
            state.data.basicInfo.firstName = state.data.basicInfo.firstName.toUpperCase();
            break;
        case "SHOW_CONTROL_ERRORS":
            state.flags.showControlErrors = true;
            break;
        case "HIDE_CONTROL_ERRORS":
            state.flags.showControlErrors = false;
            break;
        default:
            throw new Error();
    }
};

export default smartReducer;
