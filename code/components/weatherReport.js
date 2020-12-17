// import dayjs from "dayjs";
import { html } from "lit-element";
// import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
// import { SIDE_MODAL_ROW_TYPES } from "../shared_components/sideModalRow/sideModalRow";
import { t } from "../translations";

export function render_weatherReport() {
  const { Conditions } = this.weather;
  console.log(Conditions);

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
    </div>
  `;
}
