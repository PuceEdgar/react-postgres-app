export async function getData() {
  const response = await fetch("/items");
  // const response = await fetch(
  //   "https://example-node-api-my-test.herokuapp.com/items"
  // );
  const result = await response.json();

  const sortedActivities = result.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return sortedActivities;
}
