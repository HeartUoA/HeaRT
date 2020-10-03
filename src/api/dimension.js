import { API_DOMAIN } from "../config";
import { useCookies } from "react-cookie";

const [cookies] = useCookies(["accessToken"]);

/**
 * Returns dimensions for a chart
 *
 * @param chartID the id of the chart
 * @returns the dimensions for the chart
 */
export async function getDimensions(chartID) {
  const response = await fetch(`${API_DOMAIN}dimensions/forchart/${chartID}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "",
    },
  });
  const dimensions = await response.json();
  return dimensions;
}

/**
 * Returns a specific dimension by specifying the ID
 *
 * @param dimensionID the id of the dimension
 * @returns the dimension
 */
export async function getDimension(dimensionID) {
  const response = await fetch(`${API_DOMAIN}dimensions/${dimensionID}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "",
    },
  });
  const dimension = await response.json();
  return dimension;
}

/**
 * Updates the dimension with the given dimension ID
 *
 * @param dimension the item to update
 * @returns the dimension that was updated on the server, which should be the same
 */
export async function updateDimension(dimension) {
  const response = await fetch(`/api/dimensions/${dimension._id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${cookies["accessToken"]}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(dimension),
  });
  const updatedDimension = await response.json();
  return updatedDimension;
}
