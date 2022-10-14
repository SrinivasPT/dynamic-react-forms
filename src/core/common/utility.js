export function evaluateExpression(expression, model) {
    const dynamicFunc = (expression, model) => new Function("model", "return " + expression + ";");
    return dynamicFunc(expression, model)(model);
}
