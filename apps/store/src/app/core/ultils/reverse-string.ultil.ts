export function reverseString(str: string): string {
  return str === '' ? '' : reverseString(str.substr(1)) + str.charAt(0);
}