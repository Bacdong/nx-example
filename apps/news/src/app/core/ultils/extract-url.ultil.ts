import { getID } from "./get-id.ultil";
import { reverseString } from "./reverse-string.ultil";

export function extractUrl(url: string) {
  if (reverseString(url).indexOf('?') > 0) {
    let index = reverseString(url).indexOf('?');
    url = reverseString(reverseString(url).slice(index + 1));
  }

  let arr = url.split('-');
  let code = arr[arr.length - 1];
  return getID(code);
}