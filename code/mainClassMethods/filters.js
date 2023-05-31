// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { requestODHActivityPoiTypes } from "../api/mountainArea";

export async function getFilters() {
  this.listWinterActivitiesTypes = await requestODHActivityPoiTypes();
}
