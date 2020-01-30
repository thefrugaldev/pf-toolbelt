export async function handleResponse(response) {
  // Response body is empty on deletes
  if (response.ok) return response.status === 204 ? {} : response.json();
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

export function buildQueryString(filters) {
  if (!filters) return "";

  let queryString = "?";
  const filtersArray = Object.keys(filters);
  const firstItem = filtersArray[0];
  const lastItem = filtersArray.length - 1;

  filtersArray.forEach(key => {
    queryString =
      key === firstItem || key === lastItem
        ? queryString.concat(`${key}=${filters[key]}`)
        : queryString.concat(`&${key}=${filters[key]}`);
  });

  return queryString;
}
