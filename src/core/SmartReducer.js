const smartReducer = (state, action) => {
    switch (action.type) {
        case "CONFIG_FETCH_INIT":
            return { ...state, isConfigLoading: true };
        case "FORM_DATA_FETCH_INIT":
            return { ...state, isFormDataLoading: true };
        case "CONFIG_FETCH_SUCCESS":
            return { ...state, isConfigLoading: false, config: action.payload };
        case "FORM_DATA_FETCH_SUCCESS":
            return { ...state, isFormDataLoading: false, data: action.payload };
        case "CONFIG_FETCH_ERROR":
            return { ...state, isError: true };
        case "FORM_DATA_FETCH_ERROR":
            return { ...state, isError: true };
        default:
            throw new Error();
    }
};

export default smartReducer;
