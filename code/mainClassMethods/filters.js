import { requestTourismMountainAreaCodes } from "../api/mountainArea";

export async function getFilters() {
  this.listMountainAreaTopics = await requestTourismMountainAreaCodes();
}
