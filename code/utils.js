// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const DEFAULT_GEOLOCATION_TIMEOUT = 10000;

export const LANGUAGES = {
  EN: "en",
  DE: "de",
  IT: "it",
};

export const STATE_DEFAULT_FILTERS = {
  radius: "0",
  activityType: [], // Array of strings
  skiArea: [], // Array of strings
  isOpen: "",
  locfilter: "",
};

export const STATE_DEFAULT_FILTERS_ACCORDIONS_OPEN = {
  skiArea: false,
  activityType: false,
};

export const isMobile = () => {
  return document.body.offsetWidth < 992;
};

export function getCurrentPosition(options = {}) {
  //                 milli * s * m   = 1h
  const maximumAge = 1000 * 60 * 60;
  return new Promise((resolve, reject) => {
    if (navigator.geolocation && navigator.geolocation.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        maximumAge,
        timeout: DEFAULT_GEOLOCATION_TIMEOUT,
        ...options,
      });
    } else {
      alert("Not supported");
      reject(); // geolocalization probably not supported
    }
  });
}

export function get_system_language() {
  const locale = navigator.languages
    ? navigator.languages[0]
    : navigator.language;
  const lang = locale.substr(0, 2);
  return Object.values(LANGUAGES).includes(lang) ? lang : LANGUAGES.EN;
}

export function getLatLongFromStationDetail(o) {
  return { lat: o.y, lng: o.x };
}

export function countFilters(filters) {
  let filtersNumber = 0;
  if (filters.radius !== "0") {
    filtersNumber = filtersNumber + 1;
  }
  if (filters.activityType.length) {
    filtersNumber = filtersNumber + 1;
  }
  if (filters.skiArea.length) {
    filtersNumber = filtersNumber + 1;
  }
  if (filters.isOpen && filters.isOpen !== "") {
    filtersNumber = filtersNumber + 1;
  }

  return filtersNumber;
}
