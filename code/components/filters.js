import { html } from "lit-element";
import { t } from "../translations";
import { countFilters, STATE_DEFAULT_FILTERS } from "../utils";

export function render_filters() {
  let filtersNumber = countFilters(this.poiFilters);

  return html` <div class="filters">
    <div class="header">
      <wc-sidemodal-header
        type="filter"
        .fTitle="${filtersNumber ? filtersNumber : ""} ${t["filters"][
          this.language
        ]}"
        .fCancelFiltersText="${t["cancelFilters"][this.language]}"
        .fCancelFiltersAction="${() => {
          this.poiFilters = STATE_DEFAULT_FILTERS;
        }}"
        .closeModalAction="${() => {
          this.filtersOpen = false;
        }}"
      ></wc-sidemodal-header>
    </div>

    <div>
      <div>
        <p class="caption">${t["dates"][this.language].toUpperCase()}</p>
        <div class="filter__text_with_inputs">
          <span class="">${t["from"][this.language]}</span>
          <input
            type="date"
            .value="${this.poiFilters.dateFrom}"
            @change="${(e) => {
              this.poiFilters = { ...this.poiFilters, dateFrom: e.target.value };
            }}"
          />
          <span class="">${t["to"][this.language]}</span>
          <input
            type="date"
            .value="${this.poiFilters.dateTo}"
            @change="${(e) => {
              this.poiFilters = { ...this.poiFilters, dateTo: e.target.value };
            }}"
          />
        </div>
      </div>
    </div>

    <div>
      <div>
        <p class="caption">${t["searchRadius"][this.language].toUpperCase()}</p>
        <div style="margin: 16px;">
          <wc-dropdown
            .value="${{
              value: this.poiFilters.radius,
              label: `${this.poiFilters.radius} km`,
            }}"
            .options="${[
              { value: "0", label: "0 km" },
              { value: "5", label: "5 km" },
              { value: "10", label: "10 km" },
              { value: "15", label: "15 km" },
            ]}"
            .action="${({ value }) => {
              this.poiFilters = { ...this.poiFilters, radius: value };
            }}"
          ></wc-dropdown>
        </div>
      </div>
    </div>
    <div>
      <wc-divider></wc-divider>
    </div>
    <div>
      <p class="caption">${t["category"][this.language].toUpperCase()}</p>
      <div class="options_container">
        ${this.listMountainAreaTopics.map((o) => {
          return html`
            <wc-checkbox
              .value="${o.Bitmask === parseInt(this.poiFilters.topic)}"
              .action="${({ value, name }) => {
                if (value) {
                  this.poiFilters = { ...this.poiFilters, topic: o.Bitmask };
                } else {
                  this.poiFilters = { ...this.poiFilters, topic: "" };
                }
              }}"
              .label="${o.TypeDesc[this.language]}"
              .name="chx${o.TypeDesc[this.language]}"
            ></wc-checkbox>
          `;
        })}
      </div>
    </div>
  </div>`;
}
