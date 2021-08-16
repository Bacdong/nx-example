export function getID(code: any) {
  let arrCode = code.split('');
  let type = '';
  let id = '';

  for (let i = 0; i < arrCode.length; ++i) {
    let value = arrCode[i] * 1;
    if (!Number.isInteger(value)) {
      type += arrCode[i];
    } else {
      id += arrCode[i];
    }
  }

  if (type.length === 0 || id.length === 0) {
    return null;
  }

  return id;
}