import { BASE_PATH_TOURISM } from "./config";

export const requestWeather = async (language) => {
  console.log(`${BASE_PATH_TOURISM}/Weather?language=${language}`);

  try {
    const request = await fetch(
      `${BASE_PATH_TOURISM}/Weather?language=${language}`
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
