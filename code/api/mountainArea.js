import {
  BASE_PATH_TOURISM_ODHACTIVITYPOI,
  BASE_PATH_TOURISM_ODHACTIVITYPOI_REDUCED,
  BASE_PATH_TOURISM_SKIAREA,
} from "./config";

const createUrlFilters = (filters, currentLocation) => {
  // let dateFromFilter = "";
  // if (filters.dateFrom.length) {
  //   dateFromFilter = `&begindate=${filters.dateFrom}`;
  // }
  return ``;
};

export const requestTourismSkiArea = async (filters, currentLocation) => {
  try {
    const request = await fetch(
      `${BASE_PATH_TOURISM_SKIAREA}${createUrlFilters(
        filters,
        currentLocation
      )}?elements=0&fields=Id,Latitude,Longitude`
    );
    if (request.status !== 200) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get all the activity of type 2: skilifts, cross-country skiing, snowparks, ...
 *
 * @param {*} filters
 * @param {*} currentLocation
 * @returns
 */
export const requestTourismODHActivityPoiType2 = async (
  filters,
  currentLocation
) => {
  try {
    const request = await fetch(
      `${BASE_PATH_TOURISM_ODHACTIVITYPOI_REDUCED}?type=2&fields=Id,GpsInfo${createUrlFilters(
        filters,
        currentLocation
      )}`
    );
    if (request.status !== 200) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const requestSkiAreaDetails = async ({ Id }) => {
  try {
    const request = await fetch(
      `${BASE_PATH_TOURISM_SKIAREA}/${Id}?elements=0`
    );
    if (request.status !== 200) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const requestActivityDetails = async ({ Id }) => {
  try {
    const request = await fetch(
      `${BASE_PATH_TOURISM_ODHACTIVITYPOI}/${Id}?elements=0`
    );
    if (request.status !== 200) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};
