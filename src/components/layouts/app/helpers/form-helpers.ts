/**
 *
 * @param text
 * @returns string formatted as a phone number like: (123)-456-7890
 */
export function phoneParser(text: string) {
  // if no text return empty string
  if (!text) return "";
  const originLength = text?.length === 6 || text.length === 4;
  const testEdgeCase1 = new RegExp(/(\(\d{3}\))/).test(text); // test if the area code is complete
  return text
    .split(/[^0-9]/g) // split all but numbers
    .join("") // joins all numbers together
    .replace(/(\d{0,3})(\d{0,3})(\d{0,4})/g, (a, b, c, d) => {
      // a,b,c,d are the groups in the regex, a: full match, b: area code (444), c: phone prefix 555, d: phone line number 6666.
      if (b && c && d) return `(${b}) ${c}-${d}`; // all groups are present
      if (b && c) return `(${b}) ${c}`; // area code and phone prefix are present
      if (b && (b.length === 1 || b.length === 2)) return `(${b}`; // part of the area code is present
      if (b && b.length === 3 && !testEdgeCase1 && !originLength) return `(${b})`; // area code is complete
      if (b && b.length === 3) return `(${b}`; // area code is almost complete
      return a;
    });
}
