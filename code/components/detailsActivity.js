// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { html } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { SIDE_MODAL_ROW_TYPES } from "../shared_components/sideModalRow/sideModalRow";
import { t } from "../translations";

export function render_details_activity() {
  const { Detail, Latitude, Longitude } = this.currentActivity;
  const { ContactInfos, Ratings } = this.currentActivity;
  const { SmgTags, DistanceLength, DistanceDuration } = this.currentActivity;
  const { IsOpen } = this.currentActivity;

  const { Title, BaseText, GetThereText, AdditionalText } = Detail[
    this.language
  ];

  // ContactInfos
  const { Address, City, CompanyName, CountryCode, CountryName } = ContactInfos[
    this.language
  ];
  const { Email, Faxnumber } = ContactInfos[this.language];
  const { Phonenumber, Url, ZipCode } = ContactInfos[this.language];

  return html`
    <div class="details">
      <div class="header">
        <wc-sidemodal-header
          .type="title"
          .tTitle="${Title}"
          .tLinkedTagText="${SmgTags[0]}"
          .tOptionalLink="${!this.disablePOIDirections
            ? {
                text: t["directions"][this.language],
                url: `http://www.google.com/maps/place/${Latitude},${Longitude}`,
              }
            : {
                text: "",
                url: "",
              }}"
          .closeModalAction="${() => {
            this.filtersOpen = false;
            this.detailsActivityOpen = false;
            this.weatherReportOpen = false;
            this.detailsSkiAreaOpen = false;
          }}"
        ></wc-sidemodal-header>
      </div>
      <div>
        <wc-divider></wc-divider>
      </div>
      <div>
        <div>
          <p class="caption space">
            ${t["information"][this.language].toUpperCase()}
          </p>
        </div>
        ${BaseText
          ? html`<wc-sidemodal-row
              .type="${SIDE_MODAL_ROW_TYPES.vertical}"
              .title="${t["description"][this.language]}"
              .text="${html`${unsafeHTML(BaseText)}`}"
            ></wc-sidemodal-row>`
          : null}
        ${GetThereText
          ? html`<wc-sidemodal-row
              .type="${SIDE_MODAL_ROW_TYPES.vertical}"
              .title="${t["directions"][this.language]}"
              .text="${html`${unsafeHTML(GetThereText)}`}"
            ></wc-sidemodal-row>`
          : null}
        ${AdditionalText
          ? html`<wc-sidemodal-row
              .type="${SIDE_MODAL_ROW_TYPES.vertical}"
              .title="${t["directions"][this.language]}"
              .text="${html`${unsafeHTML(AdditionalText)}`}"
            ></wc-sidemodal-row>`
          : null}
      </div>

      <div>
        <wc-divider></wc-divider>
      </div>

      <div>
        <div>
          <p class="caption space">
            ${t["details"][this.language].toUpperCase()}
          </p>
        </div>

        ${Ratings && Ratings.Difficulty
          ? html`<wc-sidemodal-row
              .type="${SIDE_MODAL_ROW_TYPES.horizontal}"
              .title="${t["difficulty"][this.language]}"
              .text="${Ratings.Difficulty}"
            ></wc-sidemodal-row>`
          : null}
        ${DistanceLength
          ? html`<wc-sidemodal-row
              .type="${SIDE_MODAL_ROW_TYPES.horizontal}"
              .title="${t["duration"][this.language]}"
              .text="${DistanceLength} m"
            ></wc-sidemodal-row>`
          : null}
        ${DistanceDuration
          ? html`<wc-sidemodal-row
              .type="${SIDE_MODAL_ROW_TYPES.horizontal}"
              .title="${t["duration"][this.language]}"
              .text="${DistanceDuration} (hh:mm)"
            ></wc-sidemodal-row>`
          : null}
        ${IsOpen !== undefined
          ? html`<wc-sidemodal-row
              .type="${SIDE_MODAL_ROW_TYPES.horizontal}"
              .title="${t["duration"][this.language]}"
              .text="${IsOpen
                ? t["yes"][this.language]
                : t["no"][this.language]}"
            ></wc-sidemodal-row>`
          : null}
      </div>

      <div>
        <wc-divider></wc-divider>
      </div>
      <div>
        <div>
          <p class="caption space">
            ${t["contactInfo"][this.language].toUpperCase()}
          </p>
        </div>
        ${CompanyName
          ? html`<wc-sidemodal-row
              .type="${SIDE_MODAL_ROW_TYPES.vertical}"
              .title="${t["organizer"][this.language]}"
              .text="${CompanyName}"
            ></wc-sidemodal-row>`
          : null}
        ${Address || City || CountryName || CountryCode
          ? html`<wc-sidemodal-row
              .type="${SIDE_MODAL_ROW_TYPES.vertical}"
              .title="${t["address"][this.language]}"
              .text="${Address} ${City} ${CountryName} ${CountryCode}"
            ></wc-sidemodal-row>`
          : null}
        ${ZipCode
          ? html`<wc-sidemodal-row
              .type="${SIDE_MODAL_ROW_TYPES.vertical}"
              .title="${t["place"][this.language]}"
              .text="${ZipCode}"
            ></wc-sidemodal-row>`
          : null}
        ${Phonenumber || Faxnumber
          ? html`<wc-sidemodal-row
              .type="${SIDE_MODAL_ROW_TYPES.vertical}"
              .title="${t["telFax"][this.language]}"
              .text="${Phonenumber || "---"} / ${Faxnumber || "---"}"
            ></wc-sidemodal-row>`
          : null}
        ${Email
          ? html`<wc-sidemodal-row
              .type="${SIDE_MODAL_ROW_TYPES.vertical}"
              .title="${t["eMail"][this.language]}"
              .text="${html`${unsafeHTML(
                `<a href="mailto:${Email}">${Email}</a>`
              )}`}"
            ></wc-sidemodal-row>`
          : null}
        ${Url
          ? html`<wc-sidemodal-row
              .type="${SIDE_MODAL_ROW_TYPES.vertical}"
              .title="${t["web"][this.language]}"
              .text="${html`${unsafeHTML(
                `<a target="_blank" href="${Url}">${Url}</a>`
              )}`}"
            ></wc-sidemodal-row>`
          : null}
      </div>
    </div>
  `;
}
