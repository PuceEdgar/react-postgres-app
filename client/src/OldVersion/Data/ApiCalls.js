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

export async function getIncomming(yearmonth) {
  const month = {
    yearmonth: yearmonth,
  };
  const response = await fetch("/getIncomming", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(month),
  });

  const result = await response.json();

  return typeof result[0] === "undefined" ? 0 : result[0].incomming;
}

export async function setIncomming(value) {
  const response = await fetch("/setIncomming", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });

  const result = await response.json();

  return result;
}

export async function updateIncomming(value) {
  const response = await fetch("/updateIncomming", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });

  const result = await response.json();

  return result;
}

export async function addData(data) {
  const response = await fetch("/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
}

export async function updateData(data) {
  const response = await fetch("/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
}

export async function deleteData(data) {
  const response = await fetch("/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
}
