export const Tags = {
  1: "SUITABLE",
  2: "NO SUITABLE",
};

export function getValueFromTag(tag) {
  for (const key in Tags) {
    if (Tags.hasOwnProperty(key)) {
      if (Tags[key] === tag) {
        return key;
      }
    }
  }
  return null; // return null if tag is not found
}
