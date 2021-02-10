export const observedProperties = {
  height: { type: String },
  width: { type: String },
  fontFamily: { type: String },
  language: { type: String },
  filterRadius: { type: String },
  disablePOIDirections: { type: Boolean },
  disableMeteo: { type: Boolean },
  skiAreaFilter: { type: Array },
  activitiesFilter: { type: Array },

  mobileOpen: { type: Boolean },
  isMobile: { type: Boolean },

  tiles_url: { type: String, attribute: "tiles-url" },

  isLoading: { type: Boolean },

  hereMapsQuery: { type: String },
  searchPlacesFound: { type: Array },
  mapAttribution: { type: String },

  currentSkiArea: { type: Object },
  currentActivity: { type: Object },

  listWinterActivitiesTypes: { type: Array },
  listSkiAreas: { type: Array },

  weather: { type: Object },

  detailsSkiAreaOpen: { type: Boolean },
  detailsActivityOpen: { type: Boolean },
  weatherReportOpen: { type: Boolean },
  filtersOpen: { type: Boolean },

  // Filters
  poiFilters: { type: Object },

  filtersAccordionOpen: { type: Object },
};
