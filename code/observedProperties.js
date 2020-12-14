export const observedProperties = {
  height: { type: String },
  width: { type: String },
  fontFamily: { type: String },
  language: { type: String },
  tiles_url: { type: String, attribute: "tiles-url" },

  isLoading: { type: Boolean },

  hereMapsQuery: { type: String },
  hereMapsPlacesFound: { type: Array },
  mapAttribution: { type: String },

  listMountainArea: { type: Array },
  listMountainAreaCurrentPage: { type: Number },
  currentEvent: { type: Object },

  listMountainAreaTopics: { type: Array },

  detailsOpen: { type: Boolean },
  filtersOpen: { type: Boolean },

  // Filters
  filters: { type: Object },

  filtersAccordionOpen: { type: Object },
};
