import { html } from "lit-element";
import findPositionBlueIcon from "../assets/find-position-blue.svg";
// import { debounce, request__get_coordinates_from_search } from "../utils";
import { t } from "../translations";
import { countFilters } from "../utils";

export function render_searchPlaces() {
  const handle_onchange = (value) => {
    if (value) {
      this.hereMapsQuery = value;
      this.debounced__request__get_coordinates_from_search(value);
      this.detailsSkiAreaOpen = false;
      this.detailsActivityOpen = false;
      this.filtersOpen = false;
    } else {
      this.searchPlacesFound = {};
    }
  };

  const manage_map = (lat, lng) => {
    this.currentLocation = { lat: parseFloat(lat), lng: parseFloat(lng) };
    this.currentSkiArea = {};
    this.searchPlacesFound = {};
    this.filtersOpen = false;
    this.map.flyTo([lat, lng], 15);
    this.map.removeLayer(this.layer_user);
    this.drawMap();
    this.isLoading = false;
  };

  const handle__move_to_current_position = () => {
    try {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          this.isLoading = true;
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const { latitude, longitude } = pos.coords;
              manage_map(latitude, longitude);
            },
            () => {}
          );
        } else {
          this.isLoading = false;
        }
      });
    } catch (error) {
      this.isLoading = false;
    }
  };

  const handleMoveToPlace = (lat, lng) => {
    this.isLoading = true;
    this.searchPlacesFound = {};
    this.hereMapsQuery = "";
    manage_map(lat, lng);
  };

  const handle_focus_input = () => {
    this.debounced__request__get_coordinates_from_search(this.hereMapsQuery);
    if (this.hereMapsQuery.length) {
      this.filtersOpen = false;
    }
  };

  // <li @click="${() => handleMoveToPlace(o.lat, o.lon)}" class="">

  // const render__places_list = () => {
  //   return html`
  //     <div class="searchBox__resoult_list">
  //       <ul>
  //         <li @click="${handle__move_to_current_position}" class="">
  //           <img class="" src="${findPositionBlueIcon}" alt="" />
  //           ${t.my_location[this.language]}
  //         </li>
  //         ${this.searchPlacesFound.map((o) => {
  //           return html`
  //             <li
  //               @click="${() =>
  //                 handleMoveToPlace(o.position[0], o.position[1])}"
  //               class=""
  //             >
  //               ${o.title}
  //             </li>
  //           `;
  //         })}
  //       </ul>
  //     </div>
  //   `;
  // };

  const render__places_list = () => {
    const keys = Object.keys(this.searchPlacesFound);
    return html`
      <div class="searchBox__resoult_list">
        <ul>
          <li @click="${handle__move_to_current_position}" class="">
            <img class="" src="${findPositionBlueIcon}" alt="" />
            ${t.my_location[this.language]}
          </li>
          ${keys.map((key) => {
            if (this.searchPlacesFound[key].length) {
              return html`
                <span class="caption uppercase bold block mt-16px">${key}</span>
                ${this.searchPlacesFound[key].map((o) => {
                  return html`
                    <li
                      @click="${async () => {
                        this.detailsSkiAreaOpen = false;
                        this.detailsActivityOpen = false;
                        handleMoveToPlace(o.position[0], o.position[1]);
                      }}"
                      class=""
                    >
                      ${o.title}
                    </li>
                  `;
                })}
              `;
            }
            return html``;
          })}
        </ul>
      </div>
    `;
  };

  let filtersNumber = countFilters(this.poiFilters);

  const checkIfPlacesFound = (results) => {
    const keys = Object.keys(results);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (results[k].length) {
        return true;
      }
    }
    return false;
  };

  return html`
    <div class="searchBox">
      <wc-searchbar
        .searchValue="${this.hereMapsQuery}"
        placeHolder="${t.search[this.language]}..."
        .filtersNumber="${filtersNumber}"
        .filtersAction="${this.handleSearchBarFilterAction}"
        .action="${handle_onchange}"
        @focus=${handle_focus_input}
      ></wc-searchbar>

      ${checkIfPlacesFound(this.searchPlacesFound) && this.hereMapsQuery.length
        ? render__places_list()
        : ""}
    </div>
  `;
}
