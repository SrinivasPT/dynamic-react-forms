export const getStateKeyValueForControl = (dataKey, state) => dataKey.split(".").reduce((a, c) => a[c], state.data);

export function evaluateExpression(expression, model) {
    const dynamicFunc = (expression, model) => new Function("model", "return " + expression + ";");
    return dynamicFunc(expression, model)(model);
}