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

export const getDomainValueForCode = (value, domain, categoryCode) => {
    if (isEmpty(value) || isEmpty(domain)) return;
    return domain.get(categoryCode).find((element) => element.code === value)["value"];
};

export const convertDomainArrayToMap = (domain) => {
    const domainMap = new Map();

    domain.map((element) => {
        if (domainMap.has(element.categoryCode)) {
            domainMap.get(element.categoryCode).push(element);
        } else {
            domainMap.set(element.categoryCode, [element]);
        }
    });

    return domainMap;
};
