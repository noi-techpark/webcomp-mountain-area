import "@babel/polyfill";
import leafletStyle from "leaflet/dist/leaflet.css";
import { css, html, LitElement, unsafeCSS } from "lit-element";
import { requestTourismMountainAreaPaginated } from "./api/mountainArea";
import { requestGetCoordinatesFromSearch } from "./api/hereMaps";
import { render_details } from "./components/details";
import { render_filters } from "./components/filters";
import { render__list } from "./components/list";

import { render__mapControls } from "./components/mapControls";
import { render_searchPlaces } from "./components/searchPlaces";
import { getFilters } from "./mainClassMethods/filters";
import {
  drawMountainAreaOnMap,
  drawUserOnMap,
  initializeMap,
} from "./mainClassMethods/map";
import { observedProperties } from "./observedProperties";
import "./shared_components/button/button";
import "./shared_components/checkBox/checkBox";
import "./shared_components/divider/divider";
import "./shared_components/dropdown/dropdown";
import "./shared_components/languagePicker/languagePicker";
// Shared components
import "./shared_components/searchBar/searchBar";
import "./shared_components/sideModalHeader/sideModalHeader";
import "./shared_components/sideModalRow/sideModalRow";
import "./shared_components/sideModalTabs/sideModalTabs";
import "./shared_components/tag/tag";
import {
  debounce,
  isMobile,
  LANGUAGES,
  STATE_DEFAULT_FILTERS,
  STATE_DEFAULT_FILTERS_ACCORDIONS_OPEN,
} from "./utils";
import ParkingStyle from "./webcomp-mountain-area.scss";

class MountainArea extends LitElement {
  constructor() {
    super();
    this.height = "500px";
    this.width = "100%";
    this.fontFamily = "";
    this.mapAttribution = "";
    this.language = LANGUAGES.EN;

    this.isLoading = true;

    this.map = undefined;
    this.currentLocation = { lat: 46.479, lng: 11.331 };

    this.hereMapsPlacesFound = [];
    this.hereMapsQuery = "";

    this.currentEvent = {};

    this.listMountainArea = [];
    this.listMountainAreaCurrentPage = 1;

    this.detailsOpen = false;
    this.filtersOpen = false;

    this.filters = STATE_DEFAULT_FILTERS;
    this.filtersAccordionOpen = STATE_DEFAULT_FILTERS_ACCORDIONS_OPEN;

    this.listMountainAreaTopics = [];
  }

  static get properties() {
    return observedProperties;
  }

  static get styles() {
    return css`
      /* Map */
      ${unsafeCSS(leafletStyle)}
      ${unsafeCSS(ParkingStyle)}
    `;
  }

  async drawMap() {
    drawUserOnMap.bind(this)();
  }

  async firstUpdated() {
    await getFilters.bind(this)();
    initializeMap.bind(this)();
    drawUserOnMap.bind(this)();
    await drawMountainAreaOnMap.bind(this)();

    this.isLoading = false;
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === "filters" || propName === "language") {
        if (this.map) {
          this.map.off();
          this.map.remove();
          this.isLoading = true;
          initializeMap
            .bind(this)()
            .then(() => {
              drawUserOnMap.bind(this)();
              drawMountainAreaOnMap
                .bind(this)()
                .then(() => {
                  this.isLoading = false;
                });
            });
        }
      }
    });
  }

  handleSearchBarFilterAction = () => {
    this.detailsOpen = false;
    this.filtersOpen = !this.filtersOpen;
  };

  debounced__request__get_coordinates_from_search = debounce(
    500,
    requestGetCoordinatesFromSearch.bind(this)
  );

  render() {
    return html`
      <style>
        * {
          --width: ${this.width};
          --height: ${this.height};
          --w-c-font-family: ${this.fontFamily};
        }
      </style>
      ${this.tiles_url
        ? ""
        : html`
            <p style="color:red">Required attribute \`tiles_url\` is missing</p>
          `}

      <div
        class="mountainArea ${
          /*this.mobile_open ? `MODE__mobile__open` : `MODE__mobile__closed`*/ ""
        }
          ${isMobile() ? `mobile` : ``}"
      >
        ${this.isLoading ? html`<div class="globalOverlay"></div>` : ""}
        ${(isMobile() && !this.detailsOpen && !this.filtersOpen) || !isMobile()
          ? html`<div class="mountainArea__language_picker">
              <wc-languagepicker
                .supportedLanguages="${LANGUAGES}"
                .language="${this.language}"
                .changeLanguageAction="${(language) => {
                  this.language = language;
                }}"
              ></wc-languagepicker>
            </div>`
          : null}
        ${/*this.isFullScreen ? this.render_closeFullscreenButton() : null*/ ""}

        <div class="mountainArea__sideBar">
          <div class="mountainArea__sideBar__searchBar mt-4px">
            ${render_searchPlaces.bind(this)()}
          </div>

          ${this.detailsOpen
            ? html`<div class="mountainArea__sideBar__details mt-4px">
                ${render_details.bind(this)()}
              </div>`
            : ""}
          ${this.filtersOpen
            ? html`<div class="mountainArea__sideBar__filters mt-4px">
                ${render_filters.bind(this)()}
              </div>`
            : ""}
        </div>

        <div id="map"></div>
        ${render__mapControls.bind(this)()}
      </div>
    `;
  }
}

customElements.get("webcomp-mountain-area") ||
  customElements.define("webcomp-mountain-area", MountainArea);
