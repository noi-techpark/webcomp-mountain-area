// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { LitElement } from "lit-element";
import {
  get_system_language,
  isMobile,
  STATE_DEFAULT_FILTERS,
  STATE_DEFAULT_FILTERS_ACCORDIONS_OPEN,
} from "./utils";

export class BaseMountainArea extends LitElement {
  constructor() {
    super();
    this.height = "500px";
    this.width = "100%";
    this.fontFamily = "";
    this.mapAttribution = "";
    this.language = get_system_language();
    this.disablePOIDirections = false;
    this.disableMeteo = false;
    this.activitiesFilter = [];

    this.mobileOpen = false;
    this.isLoading = true;
    this.isMobile = isMobile();

    this.map = undefined;
    this.currentLocation = { lat: 46.479, lng: 11.331 };

    this.searchPlacesFound = {};
    this.hereMapsQuery = "";

    this.currentSkiArea = {};

    this.weather = {};

    this.detailsSkiAreaOpen = false;
    this.detailsActivityOpen = false;
    this.filtersOpen = false;
    this.weatherReportOpen = false;

    this.poiFilters = STATE_DEFAULT_FILTERS;
    this.filtersAccordionOpen = STATE_DEFAULT_FILTERS_ACCORDIONS_OPEN;

    this.listWinterActivitiesTypes = [];
  }
}
