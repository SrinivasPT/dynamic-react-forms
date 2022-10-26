export const isEmpty = (obj) => {
    if (obj === null || obj === undefined) return true;
    return Object.entries(obj).length === 0 ? true : false;
};

export const getStateKeyValueForControl = (dataKey, state) => {
    if (isEmpty(state.data)) return;
    return dataKey.split(".").reduce((a, c) => a[c], state.data);
};

export function evaluateExpression(expression, model) {
    if (isEmpty(model)) return;
    const dynamicFunc = (expression, model) => new Function("model", "return " + expression + ";");
    return dynamicFunc(expression, model)(model);
}

export function evaluateExpressionForLabelConcat(expression, fields) {
    const dynamicFunc = (expression, model) => new Function("fields", "return " + expression + ";");
    return dynamicFunc(expression, fields)(fields);
}
