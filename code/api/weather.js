import { BASE_PATH_TOURISM, ORIGIN } from "./config";

export const requestWeather = async (language) => {
  try {
    const request = await fetch(
      `${BASE_PATH_TOURISM}/Weather?language=${language}&` + ORIGIN
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
