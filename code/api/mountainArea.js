import {
  BASE_PATH_TOURISM,
  BASE_PATH_TOURISM_ODHACTIVITYPOI,
  BASE_PATH_TOURISM_ODHACTIVITYPOI_REDUCED,
  BASE_PATH_TOURISM_SKIAREA,
  ORIGIN
} from "./config";

const createUrlFilters = (filters, currentLocation) => {
  let radius = "";
  if (filters.radius && filters.radius !== "0") {
    radius = `&latitude=${currentLocation.lat}&longitude=${currentLocation.lng
      }&radius=${parseInt(filters.radius) * 1000}`;
  }

  let activityType = "";
  if (filters.activityType.length) {
    const bitmaskSum = filters.activityType.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    activityType = `&subtype=${bitmaskSum}`;
  }

  let skiArea = "";
  if (filters.skiArea !== "") {
    skiArea = `&areafilter=${filters.skiArea
      .map((sa) => `ska${sa}`)
      .join(",")}`;
  }

  return `${radius}${activityType}${skiArea}`;
};

export const requestTourismSkiArea = async (filters, currentLocation) => {
  let radius = "";
  if (filters.radius && filters.radius !== "0") {
    radius = `&latitude=${currentLocation.lat}&longitude=${currentLocation.lng
      }&radius=${parseInt(filters.radius) * 1000}`;
  }
  try {
    const request = await fetch(
      `${BASE_PATH_TOURISM_SKIAREA}?elements=0&fields=Id,Latitude,Longitude,Detail${radius}&` + ORIGIN
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
      `${BASE_PATH_TOURISM_ODHACTIVITYPOI_REDUCED}?type=2&` + ORIGIN + `&fields=Id,GpsInfo,IsOpen${createUrlFilters(
        filters,
        currentLocation
      )}`
    );
    if (request.status !== 200) {
      throw new Error(request.statusText);
    }
    let response = await request.json();
    if (filters.isOpen) {
      response = response.filter((element) => {
        return element.IsOpen === true;
      });
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const requestODHActivityPoiTypes = async () => {
  try {
    const request = await fetch(`${BASE_PATH_TOURISM}/ODHActivityPoiTypes?` + ORIGIN);
    if (request.status !== 200) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    return response.filter((o) => {
      return o.Parent === "Winter" && o.Type === "SubType";
    });
  } catch (error) {
    console.log(error);
  }
};

export const requestSkiAreaDetails = async ({ Id }) => {
  try {
    const request = await fetch(
      `${BASE_PATH_TOURISM_SKIAREA}/${Id}?elements=0&` + ORIGIN
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
      `${BASE_PATH_TOURISM_ODHACTIVITYPOI}/${Id}?elements=0&` + ORIGIN
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

export const requestGPX = async ({ code }) => {
  try {
    const request = await fetch(
      `${BASE_PATH_TOURISM}/Activity/Gpx/${code}&` + ORIGIN
    );
    if (request.status !== 200) {
      throw new Error(request.statusText);
    }
    const response = await request.text();
    return response;
  } catch (error) {
    console.log(error);
  }
};
