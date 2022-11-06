import React from "react";
import { useImmerReducer } from "use-immer";
import { SmartContext } from "../../core/Context/SmartContext";
import SmartPageControl from "../../core/SmartControls/SmartPageControl";
import smartReducer from "../../core/Context/SmartReducer";
import { getSectionTitle } from "../../core/Context/SmartFunctions";

const Demo = () => {
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
            <div className="row">
                <div className="col-1"></div>
                <div className="nav flex-column nav-pills col-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    {state?.config?.sections?.map((section) => (
                        <button
                            key={`v-nav-link-${section}`}
                            className="nav-link text-bg-warning  mt-3"
                            id={`v-pills-${section}-tab`}
                            data-bs-toggle="pill"
                            data-bs-target={`#collapse-${section}`}
                            type="button"
                            role="tab"
                            aria-controls={`v-pills-${section}`}
                        >
                            {getSectionTitle(section, state["config"])}
                        </button>
                    ))}
                </div>
                <div className="col-8">
                    <SmartPageControl name="STUDENT" id="1001" />
                </div>

                <div className="col-1"></div>
            </div>
        </SmartContext.Provider>
    );
};

export default Demo;
