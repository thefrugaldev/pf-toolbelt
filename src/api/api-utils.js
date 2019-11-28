export async function handleResponse(response) {
  if (response.ok) return response.json();
  if (response.status == 400) {
    // Server-side validation error occurred
    // Returns a string error message (parse text instead of json)
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

// TODO: in production, call an error logging service
export function handleError(error) {
  //eslint-disable-next-line no-console
  console.error(`API call failed.`, error);
  throw error;
}
