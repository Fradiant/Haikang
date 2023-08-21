
export default item => {
  const rules = [];
  const trigger = typeof item.trigger === "undefined" ? ["blur", "change"] : item.trigger;
  if (item.required) {
    rules.push({ required: true, message: "不能为空", trigger });
  }
  return rules;
};