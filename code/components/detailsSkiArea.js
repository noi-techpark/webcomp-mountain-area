// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import dayjs from "dayjs";
import { html } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { SIDE_MODAL_ROW_TYPES } from "../shared_components/sideModalRow/sideModalRow";
import { t } from "../translations";

export function render_details_skiArea() {
  const { Detail, Latitude, Longitude } = this.currentSkiArea;
  const { OperationSchedule, ContactInfos, TotalSlopeKm } = this.currentSkiArea;
  const { SlopeKmBlack, SlopeKmBlue, SlopeKmRed } = this.currentSkiArea;

  const { Title, BaseText } = Detail[this.language];

  let openings = "";
  for (let i = 0; i < OperationSchedule.length; i++) {
    const element = OperationSchedule[i];
    openings = `${openings}\ 
${dayjs(element.Start).format("DD/MM/YYYY")} - ${dayjs(element.Stop).format(
      "DD/MM/YYYY"
    )}`;
  }

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
          tLinkedTagText="Ski area"
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
        ${BaseText
          ? html`<wc-sidemodal-row
              .type="${SIDE_MODAL_ROW_TYPES.vertical}"
              .title="${t["description"][this.language]}"
              .text="${BaseText}"
            ></wc-sidemodal-row>`
          : null}
      </div>
      <div>
        ${openings.length
          ? html`<wc-sidemodal-row
              .type="${SIDE_MODAL_ROW_TYPES.vertical}"
              .title="${t["opening"][this.language]}"
              .text="${openings}"
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
              .text="${Address}, ${City}, ${CountryName}, ${CountryCode}"
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
        <div>
          <p class="caption">${t["slopeInfo"][this.language]}</p>
        </div>
        ${TotalSlopeKm
          ? html`<p style="margin-top: 0;">
              ${t["totalKilometers"][this.language]}: ${TotalSlopeKm}km
              <br />
              <br />
              ${t["kilometersBlue"][this.language]}: ${SlopeKmBlue}km <br />
              ${t["kilometersRed"][this.language]}: ${SlopeKmRed}km <br />
              ${t["kilometersBlack"][this.language]}: ${SlopeKmBlack}km
            </p>`
          : null}
      </div>
    </div>
  `;
}
