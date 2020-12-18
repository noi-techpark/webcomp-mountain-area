import dayjs from "dayjs";
import { html } from "lit-element";
import { SIDE_MODAL_ROW_TYPES } from "../shared_components/sideModalRow/sideModalRow";
// import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
// import { SIDE_MODAL_ROW_TYPES } from "../shared_components/sideModalRow/sideModalRow";
import { t } from "../translations";

export function render_weatherReport() {
  const { Conditions, evolutiontitle } = this.weather;
  const { evolution, date, Forecast } = this.weather;
  const { Mountain } = this.weather;
  const { Title, Temperatures, Weatherdesc } = Conditions[0];
  console.log(date, Title, Temperatures, Weatherdesc);

  return html`
    <div class="details">
      <div class="header">
        <wc-sidemodal-header
          .type="title"
          .tTitle="${t["forecasts"][this.language]}"
          tLinkedTagText="${t["weatherReport"][this.language]}"
          .tOptionalLink="${{
            text: t["downloadTheBulletin"][this.language],
            url: `http://meteo.provincia.bz.it/alto-adige.asp?meteo_bdoc=1`,
          }}"
          .closeModalAction="${() => {
            this.detailsSkiAreaOpen = false;
            this.detailsActivityOpen = false;
            this.weatherReportOpen = false;
          }}"
        ></wc-sidemodal-header>
      </div>
      <div>
        <wc-divider></wc-divider>
      </div>
      <!-- Conditions -->

      <div>
        <div class="weatherDetails__section">
          <p class="caption">
            ${dayjs(Conditions[0].date).format("DD/MM/YYYY")}
          </p>
          <div class="weatherDetails__section__img_container">
            <img src="${Conditions[0].WeatherImgurl}" alt="" />
          </div>
          <p class="weatherDetails__section__title">${Title}</p>
          <p class="weatherDetails__section__text">
            ${Weatherdesc} ${Temperatures}
          </p>
        </div>
      </div>
      <div>
        <wc-divider></wc-divider>
      </div>
      <!-- Evolution -->
      <div>
        <div class="weatherDetails__section">
          <p class="caption">${t["evolution"][this.language].toUpperCase()}</p>
          <p class="weatherDetails__section__title">${evolutiontitle}</p>
          <p class="weatherDetails__section__text">${evolution}</p>
        </div>
      </div>
      <!-- Forecast -->
      ${[0, 1].map((index) => {
        return Forecast[index]
          ? html`<div>
                <wc-divider></wc-divider>
              </div>
              <div>
                <div class="weatherDetails__section_forecast">
                  <p class="caption">
                    ${dayjs(Forecast[index].date).format("DD/MM/YYYY")}
                  </p>
                  <div class="weatherDetails__section_forecast__img_container">
                    <img src="${Forecast[index].WeatherImgurl}" alt="" />
                  </div>
                  <wc-sidemodal-row
                    .type="${SIDE_MODAL_ROW_TYPES.horizontal}"
                    .title="${t["maximum"][this.language]}"
                    .text="${Forecast[index].TempMaxmin}° / ${Forecast[index]
                      .TempMaxmax}°"
                  ></wc-sidemodal-row>
                  <wc-sidemodal-row
                    .type="${SIDE_MODAL_ROW_TYPES.horizontal}"
                    .title="${t["minimum"][this.language]}"
                    .text="${Forecast[index].TempMinmin}° / ${Forecast[index]
                      .TempMinmax}°"
                  ></wc-sidemodal-row>
                  <wc-sidemodal-row
                    .type="${SIDE_MODAL_ROW_TYPES.horizontal}"
                    .title="${t["weather"][this.language]}"
                    .text="${Forecast[index].Weatherdesc}°"
                  ></wc-sidemodal-row>
                </div>
              </div>`
          : null;
      })}

      <div>
        <wc-divider></wc-divider>
      </div>
      <!-- Mountain -->
      <div>
        <div class="weatherDetails__section">
          <p class="caption">
            ${t["mountain"][this.language].toUpperCase()}:
            ${dayjs(Mountain[0].date).format("DD/MM/YYYY")}
          </p>
          <div class="weatherDetails__section__img_container">
            <img src="${Mountain[0].Northimgurl}" alt="" />
          </div>
          <p class="weatherDetails__section__title">${Mountain[0].Title}</p>
          <p class="weatherDetails__section__text">
            ${Mountain[0].Weatherdesc} ${Mountain[0].Conditions}
          </p>

          <wc-sidemodal-row
            .type="${SIDE_MODAL_ROW_TYPES.horizontal}"
            .title="${t["zerolimit"][this.language]}"
            .text="${Mountain[0].Zerolimit}m"
          ></wc-sidemodal-row>
          <wc-sidemodal-row
            .type="${SIDE_MODAL_ROW_TYPES.horizontal}"
            .title="${t["sunrise"][this.language]}"
            .text="${Mountain[0].Sunrise}"
          ></wc-sidemodal-row>
          <wc-sidemodal-row
            .type="${SIDE_MODAL_ROW_TYPES.horizontal}"
            .title="${t["sunset"][this.language]}"
            .text="${Mountain[0].Sunset}"
          ></wc-sidemodal-row>
          <wc-sidemodal-row
            .type="${SIDE_MODAL_ROW_TYPES.vertical}"
            .title="${t["temperatures"][this.language]}"
            .text="1000m - ${Mountain[0].Temp1000}° / 2000m - ${Mountain[0]
              .Temp2000}° / 3000m - ${Mountain[0]
              .Temp3000}° / 4000m - ${Mountain[0].Temp4000}°"
          ></wc-sidemodal-row>
        </div>
      </div>
    </div>
  `;
}
