import { requestODHActivityPoiTypes } from "../api/mountainArea";

export async function getFilters() {
  this.listWinterActivitiesTypes = await requestODHActivityPoiTypes();
}
