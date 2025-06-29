import _ from "lodash";

export const matchCondition = (value, condition) => {
  if (condition.equals !== undefined) return value === condition.equals;
  if (condition.not !== undefined) return value !== condition.not;
  if (condition.contains !== undefined) return value?.includes(condition.contains);
  if (condition.notEmpty) return !!value?.trim?.();
  if (condition.validation?.regex) {
    const re = new RegExp(condition.validation.regex);
    return re.test(value);
  }
  return false;
};

export const evaluateConditionNode = (node, formState) => {
  if (node.and) return node.and.every(n => evaluateConditionNode(n, formState));
  if (node.or) return node.or.some(n => evaluateConditionNode(n, formState));
  if (node.not) return !evaluateConditionNode(node.not, formState);

  const value = _.get(formState, node.path);
  return matchCondition(value, node);
};

export const checkConditions = (conditions = {}, formState) => {
  if (conditions.showIf && !evaluateConditionNode(conditions.showIf, formState)) return false;
  if (conditions.hideIf && evaluateConditionNode(conditions.hideIf, formState)) return false;
  return true;
};
