// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { html } from "lit-element";
import { t } from "../translations";
import { countFilters, STATE_DEFAULT_FILTERS } from "../utils";
import iconChevronUp from "../assets/chevron-up.svg";
import iconChevronDown from "../assets/chevron-down.svg";

const renderChevron = (show) =>
  show
    ? html`<img src="${iconChevronUp}" alt="" />`
    : html`<img src="${iconChevronDown}" alt="" />`;

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
      <p
        class="caption pointer"
        @click="${() => {
          this.filtersAccordionOpen = {
            ...this.filtersAccordionOpen,
            activityType: !this.filtersAccordionOpen["activityType"],
          };
        }}"
      >
        ${t["category"][this.language].toUpperCase()}
        <span>${renderChevron(this.filtersAccordionOpen["activityType"])}</span>
      </p>
      ${this.filtersAccordionOpen["activityType"]
        ? html` <div class="options_container">
            ${this.listWinterActivitiesTypes.map((o) => {
              return html`
                <wc-checkbox
                  .value="${this.poiFilters.activityType.includes(o.Bitmask)}"
                  .action="${({ value }) => {
                    if (this.poiFilters.activityType.includes(o.Bitmask)) {
                      this.poiFilters = {
                        ...this.poiFilters,
                        activityType: this.poiFilters.activityType.filter(
                          (c) => c !== o.Bitmask
                        ),
                      };
                    } else {
                      this.poiFilters = {
                        ...this.poiFilters,
                        activityType: [
                          ...this.poiFilters.activityType,
                          o.Bitmask,
                        ],
                      };
                    }
                    // if (value) {
                    //   this.poiFilters = {
                    //     ...this.poiFilters,
                    //     activityType: o.Bitmask,
                    //   };
                    // } else {
                    //   this.poiFilters = {
                    //     ...this.poiFilters,
                    //     activityType: "",
                    //   };
                    // }
                  }}"
                  .label="${o.TypeDesc[this.language]}"
                  .name="chx${o.TypeDesc[this.language]}"
                ></wc-checkbox>
              `;
            })}
          </div>`
        : null}
    </div>

    <div class="filters__divider">
      <wc-divider></wc-divider>
    </div>

    <div>
      <p
        class="caption pointer"
        @click="${() => {
          this.filtersAccordionOpen = {
            ...this.filtersAccordionOpen,
            skiArea: !this.filtersAccordionOpen["skiArea"],
          };
        }}"
      >
        SKI AREA
        <span>${renderChevron(this.filtersAccordionOpen["skiArea"])}</span>
      </p>
      ${this.filtersAccordionOpen["skiArea"]
        ? html` <div class="options_container">
            ${this.listSkiAreas.map((o) => {
              return html`
                <wc-checkbox
                  .value="${this.poiFilters.skiArea.includes(o.Id)}"
                  .action="${({ value }) => {
                    if (value) {
                      this.poiFilters = {
                        ...this.poiFilters,
                        skiArea: [...this.poiFilters.skiArea, o.Id],
                      };
                    } else {
                      this.poiFilters = {
                        ...this.poiFilters,
                        skiArea: this.poiFilters.skiArea.filter((sa) => {
                          return sa !== o.Id;
                        }),
                      };
                    }
                  }}"
                  .label="${o.Detail[this.language].Title}"
                  .name="chx${o.Detail[this.language].Title}"
                ></wc-checkbox>
              `;
            })}
          </div>`
        : null}
    </div>

    <div class="filters__divider">
      <wc-divider></wc-divider>
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
      <div>
        <p class="caption">${t["opening"][this.language].toUpperCase()}</p>

        <div class="options_container">
          <wc-checkbox
            .value="${this.poiFilters.isOpen}"
            .action="${({ value }) => {
              this.poiFilters = {
                ...this.poiFilters,
                isOpen: value,
              };
            }}"
            .label="${t["showOnlyOpenAndAvailableActivities"][this.language]}"
            .name="chxShowOnlyOpenAndAvailableActivities"
          ></wc-checkbox>
        </div>
      </div>
    </div>
  </div>`;
}
