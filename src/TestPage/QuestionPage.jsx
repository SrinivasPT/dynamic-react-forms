import React from "react";
import { useImmerReducer } from "use-immer";
import { SmartContext } from "../core/Context/SmartContext";
import SmartPageControl from "../core/SmartControls/SmartPageControl";
import smartReducer from "../core/Context/SmartReducer";
import { getSectionTitle } from "../core/Context/SmartFunctions";

const QuestionPage = () => {
    const customFunction = () => {
        console.log("From the custom button function");
    };

    const [state, dispatch] = useImmerReducer(smartReducer, {
        config: {},
        data: {},
        domain: {},
        flags: { isFormDataLoading: false, isDomainDataLoading: false, isConfigLoading: false, showControlErrors: false },
        mode: { isReadOnly: false, isEdit: false, sectionInEditMode: "" },
        isError: false,
        eventHandlers: { changeCaseButton: customFunction },
    });

    return (
        <SmartContext.Provider value={{ state, dispatch }}>
            <SmartPageControl name="QUESTION" id="1001" />
        </SmartContext.Provider>
    );
};

export default QuestionPage;
