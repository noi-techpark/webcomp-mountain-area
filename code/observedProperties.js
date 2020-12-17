export const observedProperties = {
  height: { type: String },
  width: { type: String },
  fontFamily: { type: String },
  language: { type: String },

  mobileOpen: { type: Boolean },
  isMobile: { type: Boolean },

  tiles_url: { type: String, attribute: "tiles-url" },

  isLoading: { type: Boolean },

  hereMapsQuery: { type: String },
  hereMapsPlacesFound: { type: Array },
  mapAttribution: { type: String },

  currentSkiArea: { type: Object },
  currentActivity: { type: Object },

  listWinterActivitiesTypes: { type: Array },
  listSkiAreas: { type: Array },

  detailsSkiAreaOpen: { type: Boolean },
  detailsActivityOpen: { type: Boolean },
  weatherReportOpen: { type: Boolean },
  filtersOpen: { type: Boolean },

  // Filters
  poiFilters: { type: Object },

  filtersAccordionOpen: { type: Object },
};
