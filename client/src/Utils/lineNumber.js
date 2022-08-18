export default function lineNumber(string) {
  return string.length < 200
    ? string
    : string
        .split("")
        .filter((_, i) => i < 200)
        .join("") + "...";
}
