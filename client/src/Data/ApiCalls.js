import {
  GET_INCOMMING,
  SET_INCOMMING,
  UPDATE_INCOMMING,
  GET_REMAINING,
  UPDATE_REMAINING,
  GET_PREVIOUS_REMAINING,
  GET_DATA,
  ADD_DATA,
  UPDATE_DATA,
  DELETE_DATA,
  POST,
  DELETE,
} from "../Constants/ApiUri";

async function makeApiCall(callType, value, uri) {
  const response = await fetch(uri, {
    method: callType,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });

  const result = await response.json();
  return result;
}

export async function getData() {
  const response = await fetch(GET_DATA);
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

  const result = await makeApiCall(POST, month, GET_INCOMMING);

  return typeof result[0] === "undefined" ? -1 : result[0].incomming;
}

export async function setIncomming(value) {
  return await makeApiCall(POST, value, SET_INCOMMING);
}

export async function updateIncomming(value) {
  return await makeApiCall(POST, value, UPDATE_INCOMMING);
}

export async function getRemaining(yearmonth) {
  const month = {
    yearmonth: yearmonth,
  };

  const result = await makeApiCall(POST, month, GET_REMAINING);

  return typeof result[0] === "undefined" ? 0 : result[0].remaining_amount;
}
export async function getPreviousRemaining(yearmonth) {
  const month = {
    yearmonth: yearmonth,
  };

  const result = await makeApiCall(POST, month, GET_REMAINING);

  return typeof result[0] === "undefined" ? 0 : result[0].remaining_amount;
}

export async function updateRemaining(value) {
  return await makeApiCall(POST, value, UPDATE_REMAINING);
}

export async function addData(data) {
  return await makeApiCall(POST, data, ADD_DATA);
}

export async function updateData(data) {
  return await makeApiCall(POST, data, UPDATE_DATA);
}

export async function deleteData(data) {
  return await makeApiCall(DELETE, data, DELETE_DATA);
}
