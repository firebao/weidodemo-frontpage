//向下搜寻单一组件
export function findComponentDownward(context, componentName) {
  const children = context.$children;
  let result = null;
  if (children.length) {
    for (const child of children) {
      const name = child.$options.name;
      if (name === componentName) {
        result = child;
        break;
      } else {
        result = findComponentDownward(child, componentName);
        if (result) break;
      }
    }
  }
  return result;
}
//向上搜寻单一组件
export function findComponentUpward(context, componentName) {
  let componentNames = [];
  if (typeof componentName === "string") {
    componentNames = [componentName];
  } else {
    componentNames = componentName;
  }
  let parent = context.$parent;
  let name = parent.$options.name;
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}
//向下搜寻多个组件
export function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    const foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, []);
}
