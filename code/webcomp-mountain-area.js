import "@babel/polyfill";
import leafletStyle from "leaflet/dist/leaflet.css";
import { css, html, LitElement, unsafeCSS } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { debounce as _debounce } from "lodash";
import { requestGetCoordinatesFromSearch } from "./api/hereMaps";
import { render_details_activity } from "./components/detailsActivity";
import { render_details_skiArea } from "./components/detailsSkiArea";
import { render_filters } from "./components/filters";
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
  isMobile,
  LANGUAGES,
  STATE_DEFAULT_FILTERS,
  STATE_DEFAULT_FILTERS_ACCORDIONS_OPEN,
} from "./utils";
import ParkingStyle from "./webcomp-mountain-area.scss";
import { t } from "./translations";

class MountainArea extends LitElement {
  constructor() {
    super();
    this.height = "500px";
    this.width = "100%";
    this.fontFamily = "";
    this.mapAttribution = "";
    this.language = LANGUAGES.EN;

    this.mobileOpen = false;
    this.isLoading = true;
    this.isMobile = isMobile();

    this.map = undefined;
    this.currentLocation = { lat: 46.479, lng: 11.331 };

    this.hereMapsPlacesFound = [];
    this.hereMapsQuery = "";

    this.currentSkiArea = {};

    this.detailsSkiAreaOpen = false;
    this.detailsActivityOpen = false;
    this.filtersOpen = false;

    this.poiFilters = STATE_DEFAULT_FILTERS;
    this.filtersAccordionOpen = STATE_DEFAULT_FILTERS_ACCORDIONS_OPEN;

    this.listWinterActivitiesTypes = [];
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

  handleWindowResize() {
    if (isMobile() !== this.isMobile) {
      if (!this.isMobile) {
        this.mobileOpen = false;
      }
      this.isMobile = isMobile();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(
      "resize",
      _debounce(this.handleWindowResize.bind(this), 150)
    );
  }
  disconnectedCallback() {
    window.removeEventListener("resize", this.handleWindowResize.bind(this));
    super.disconnectedCallback();
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
      if (propName === "mobileOpen") {
        this.map.invalidateSize();
      }
      if (propName === "poiFilters" || propName === "language") {
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
    this.detailsSkiAreaOpen = false;
    this.detailsActivityOpen = false;
    this.filtersOpen = !this.filtersOpen;
  };

  debounced__request__get_coordinates_from_search = _debounce(
    requestGetCoordinatesFromSearch.bind(this),
    500
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
        class=${classMap({
          mountainArea: true,
          mobile: this.isMobile,
          MODE__mobile__open: this.isMobile && this.mobileOpen,
          MODE__mobile__closed: this.isMobile && !this.mobileOpen,
        })}
      >
        ${this.isMobile && !this.mobileOpen
          ? html`<div class="MODE__mobile__closed__overlay">
              <wc-button
                @click="${() => {
                  this.mobileOpen = true;
                }}"
                type="primary"
                .content="${t["openTheMap"][this.language]}"
              ></wc-button>
            </div>`
          : ""}
        ${this.isLoading ? html`<div class="globalOverlay"></div>` : ""}
        ${(this.isMobile && this.mobileOpen) || !this.isMobile
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
        ${(this.isMobile && this.mobileOpen) || !this.isMobile
          ? html`<div class="mountainArea__sideBar">
              <div class="mountainArea__sideBar__searchBar mt-4px">
                ${render_searchPlaces.bind(this)()}
              </div>

              ${this.detailsSkiAreaOpen
                ? html`<div class="mountainArea__sideBar__details mt-4px">
                    ${render_details_skiArea.bind(this)()}
                  </div>`
                : ""}
              ${this.detailsActivityOpen
                ? html`<div class="mountainArea__sideBar__details mt-4px">
                    ${render_details_activity.bind(this)()}
                  </div>`
                : ""}
              ${this.filtersOpen
                ? html`<div class="mountainArea__sideBar__filters mt-4px">
                    ${render_filters.bind(this)()}
                  </div>`
                : ""}
            </div>`
          : null}

        <div id="map"></div>
        ${!this.isMobile || (this.isMobile && this.mobileOpen)
          ? render__mapControls.bind(this)()
          : null}
      </div>
    `;
  }
}

customElements.get("webcomp-mountain-area") ||
  customElements.define("webcomp-mountain-area", MountainArea);
