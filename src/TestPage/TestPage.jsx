import React, { useRef } from "react";
import { useImmerReducer } from "use-immer";
import { SmartContext } from "../core/Context/SmartContext";
import SmartPageControl from "../core/SmartControls/SmartPageControl";
import smartReducer from "../core/Context/SmartReducer";

const TestPage = () => {
    const [state, dispatch] = useImmerReducer(smartReducer, {
        config: {},
        data: {},
        domain: [],
        flags: { isFormDataLoading: false, isDomainDataLoading: false, isConfigLoading: false },
        mode: { isReadOnly: false, isEdit: true, sectionInEditMode: "" },
        isError: false,
    });

    const handleClick = () => console.log(state.data);

    return (
        <SmartContext.Provider value={{ state, dispatch }}>
            <SmartPageControl name="Student" id="1001" />
            <button type="button" className="btn btn-primary" onClick={handleClick}>
                Submit
            </button>
        </SmartContext.Provider>
    );
};

export default TestPage;
