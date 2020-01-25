const allowLibs = {
  Object,
  String,
  Number,
  Boolean,
  Array,
  Date,
  Math,
  RegExp,
  JSON,
  NaN,
  Infinity,
  undefined,
  parseInt,
  parseFloat,
  isNaN,
  isFinite,
  console: console
};

const argValues = Object.keys(allowLibs).map(key => (allowLibs as any)[key]);

const construct = (constructor: any, args: string[]) => {
  function fun(this: any) {
    return constructor.apply(this, args);
  }
  fun.prototype = constructor.prototype;

  return new (fun as any)();
};

export const load = (script: string) => {
  let argNames: string[] = [];
  argNames = argNames.concat(argNames);
  const strictText = '"use strict";\n';
  argNames.push(strictText + script);

  const bot = construct(Function, argNames).apply(undefined, argValues);

  if (!bot) {
    alert("Function has not been returned.");
  }
  if (typeof bot !== "function") {
    alert("Returned is not a Function.");
  }

  return bot;
};
