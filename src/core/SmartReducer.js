const smartReducer = (state, action) => {
    switch (action.type) {
        case "CONFIG_FETCH_INIT":
            return { ...state, flags: { ...state.flags, isConfigLoading: true } };
        case "FORM_DATA_FETCH_INIT":
            return { ...state, flags: { ...state.flags, isFormDataLoading: true } };
        case "DOMAIN_DATA_FETCH_INIT":
            return { ...state, flags: { ...state.flags, isDomainDataLoading: true } };
        case "CONFIG_FETCH_SUCCESS":
            return { ...state, flags: { ...state.flags, isConfigLoading: false }, config: action.payload };
        case "FORM_DATA_FETCH_SUCCESS":
            return { ...state, flags: { ...state.flags, isFormDataLoading: false }, data: action.payload };
        case "DOMAIN_DATA_FETCH_SUCCESS":
            return { ...state, flags: { ...state.flags, isDomainDataLoading: false }, domain: [...action.payload] };
        case "CONFIG_FETCH_ERROR":
            return { ...state, isError: true };
        case "FORM_DATA_FETCH_ERROR":
            return { ...state, isError: true };
        case "DOMAIN_DATA_FETCH_ERROR":
            return { ...state, isError: true };
        case "EDIT_SECTION_START":
            return { ...state, mode: { ...state.mode, isEdit: true, sectionInEditMode: action.payload } };
        case "CONTROL_VALUE_CHANGE":
            return {
                ...state,
                data: {
                    ...state["data"],
                    [action.payload.sectionId]: {
                        ...state.data[action.payload.sectionId],
                        [action.payload.name]: action.payload.value,
                    },
                },
            };
        default:
            throw new Error();
    }
};

export default smartReducer;
