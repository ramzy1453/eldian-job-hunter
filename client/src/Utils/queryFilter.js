import moment from "moment";

export default function queryFilter(_array, values) {
  const { search, sort, status: _status, type: _type } = values;

  const filterSearch = (array) =>
    array.filter(({ position }) =>
      position.toLowerCase().trim().includes(search.toLowerCase().trim())
    );

  const filterType = (array) => array.filter(({ type }) => type === _type);
  const filterStatus = (array) =>
    array.filter(({ status }) => status === _status);

  const SortedByDate = (array, t) => {
    return array.sort(
      (a, b) => t * (moment(a.createdAt).unix() - moment(b.createdAt).unix())
    );
  };
  const SortedByAZ = (array) =>
    array.sort((a, b) => a.position.localeCompare(b.position));
  const SortedByZA = (array) =>
    array.sort((a, b) => b.position.localeCompare(a.position));

  let final = filterType(filterStatus(filterSearch(_array)));

  switch (sort) {
    case "az":
      final = SortedByAZ(final);
      break;
    case "za":
      final = SortedByZA(final);
      break;
    case "oldest":
      final = SortedByDate(final, 1);
      break;
    case "latest":
      final = SortedByDate(final, -1);
      break;
    default:
      break;
  }

  return final;
}
