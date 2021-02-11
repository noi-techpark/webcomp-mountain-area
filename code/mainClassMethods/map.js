import Leaflet from "leaflet";
import leaflet_mrkcls from "leaflet.markercluster";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import {
  requestActivityDetails,
  requestGPX,
  requestSkiAreaDetails,
  requestTourismODHActivityPoiType2,
  requestTourismSkiArea,
} from "../api/mountainArea";
import pinSki from "../assets/pin-ski.svg";
import pinSnow from "../assets/pin-snow.svg";
import pinRed from "../assets/pin.svg";
import user__marker from "../assets/user.svg";
import { getLatLongFromStationDetail, get_system_language } from "../utils";

let STORE_zoomLevel = 10;
let STORE_position = [];

export async function initializeMap() {
  const DefaultIcon = Leaflet.icon({
    iconUrl: icon,
    iconAnchor: [12.5, 41],
    shadowUrl: iconShadow,
  });
  Leaflet.Marker.prototype.options.icon = DefaultIcon;

  this.map = Leaflet.map(this.shadowRoot.getElementById("map"), {
    zoomControl: false,
  });

  const tileUrl = `${this.tiles_url}${process.env.TILES_API_KEY || ""}`;

  Leaflet.tileLayer(tileUrl, {
    attribution: this.mapAttribution,
  }).addTo(this.map);

  if (STORE_position.length) {
    this.map.setView(STORE_position, STORE_zoomLevel);
  } else {
    const { lat, lng } = this.currentLocation;
    this.map.setView({ lat, lon: lng }, STORE_zoomLevel);
  }
}

export function drawUserOnMap() {
  /**
   * User Icon
   */
  const user_icon = Leaflet.icon({
    iconUrl: user__marker,
    iconSize: [25, 25],
  });
  const user = Leaflet.marker(
    [this.currentLocation.lat, this.currentLocation.lng],
    {
      icon: user_icon,
    }
  );
  /**
   * Circle around the user
   */
  const circle = Leaflet.circle(
    [this.currentLocation.lat, this.currentLocation.lng],
    {
      radius: parseInt(this.poiFilters.radius) * 1000,
      color: "rgba(66, 133, 244, 0.6)",
      fillColor: "rgba(66, 133, 244, 0.5)",
      weight: 1,
    }
  );
  /**
   * Add to map
   */
  this.layer_user = Leaflet.layerGroup([user, circle], {});
  this.layer_user.addTo(this.map);
}

function drawTrack(track, arrivalPoint) {
  if (this.map) {
    this.trackPolyline = Leaflet.polyline(track, {
      weight: 3,
      color: "#e6040e",
    }).addTo(this.map);

    const icon_pinRed = Leaflet.icon({
      iconUrl: pinRed,
      iconSize: [36, 36],
    });

    if (arrivalPoint && arrivalPoint.Latitude && arrivalPoint.Longitude) {
      const { Latitude, Longitude } = arrivalPoint;
      this.marker_arrivalPoint = Leaflet.marker([Latitude, Longitude], {
        icon: icon_pinRed,
      }).addTo(this.map);
    }

    this.map.fitBounds(this.trackPolyline.getBounds());
  }
}

export async function drawMountainAreaOnMap() {
  const skiArea_layer_array = [];
  const activities_layer_array = [];

  const skiAreas = await requestTourismSkiArea(
    this.poiFilters,
    this.currentLocation
  );

  this.listSkiAreas = skiAreas;

  const activities = await requestTourismODHActivityPoiType2(
    this.poiFilters,
    this.currentLocation
  );

  // Ski Areas
  skiAreas
    .filter((skiArea) => {
      if (this.poiFilters.skiArea.length) {
        return this.poiFilters.skiArea.includes(skiArea.Id);
      }
      return true;
    })
    .map((skiArea) => {
      const marker_position = getLatLongFromStationDetail({
        x: skiArea.Longitude,
        y: skiArea.Latitude,
      });
      const mountainArea_icon = Leaflet.icon({
        iconUrl: pinSki,
        iconSize: [36, 36],
      });
      const marker = Leaflet.marker(
        [marker_position.lat, marker_position.lng],
        {
          icon: mountainArea_icon,
        }
      );

      const action = async () => {
        const details = await requestSkiAreaDetails({
          Id: skiArea.Id,
        });
        if (details) {
          this.currentSkiArea = {
            ...details,
          };
        }

        this.filtersOpen = false;
        this.detailsActivityOpen = false;
        this.weatherReportOpen = false;
        this.detailsSkiAreaOpen = true;
      };

      marker.on("mousedown", action);
      skiArea_layer_array.push(marker);
    });

  if (!this.language) {
    this.language = get_system_language();
  }

  const mountainArea_layer = Leaflet.layerGroup(skiArea_layer_array, {});

  /** Add the layer to map */
  this.map.addLayer(mountainArea_layer);

  // Activities
  activities.map((activity) => {
    const { GpsInfo } = activity;
    const position = GpsInfo.filter((o) => {
      return o.Gpstype === "position";
    })[0];

    if (position) {
      const marker_position = getLatLongFromStationDetail({
        x: position.Longitude,
        y: position.Latitude,
      });
      const activity_icon = Leaflet.icon({
        iconUrl: pinSnow,
        iconSize: [36, 36],
      });

      const marker = Leaflet.marker(
        [marker_position.lat, marker_position.lng],
        {
          icon: activity_icon,
        }
      );

      const action = async () => {
        const details = await requestActivityDetails({
          Id: activity.Id,
        });
        if (details && details.GpsTrack) {
          // If the activity has a GpsTrack show it
          if (details.GpsTrack.length) {
            const gpx = await requestGPX({
              code: details.GpsTrack[0].GpxTrackUrl.split("/gpx/").pop(),
            });
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(gpx, "text/xml");
            const latlngs = Array.from(
              xmlDoc.getElementsByTagName("trkpt")
            ).map((t) => {
              const lat = t.attributes.getNamedItem("lat").value;
              const lon = t.attributes.getNamedItem("lon").value;
              return [lat, lon];
            });
            if (this.trackPolyline) {
              this.trackPolyline.remove(this.map);
            }
            if (this.marker_arrivalPoint) {
              this.marker_arrivalPoint.remove(this.map);
            }
            drawTrack.bind(this)(latlngs, details.GpsPoints.arrivalpoint);
          } else {
            // Else show the normal POI
            if (STORE_zoomLevel < 16) {
              STORE_zoomLevel = this.map._zoom + 2;
            }
            STORE_position = [marker_position.lat, marker_position.lng];

            this.map.setView(
              [marker_position.lat, marker_position.lng],
              STORE_zoomLevel
            );
          }

          this.currentActivity = {
            ...details,
          };

          this.filtersOpen = false;
          this.weatherReportOpen = false;
          this.detailsSkiAreaOpen = false;
          this.detailsActivityOpen = true;
        }
      };

      marker.on("mousedown", action);
      activities_layer_array.push(marker);
    }
  });

  const activities_layer = Leaflet.layerGroup(activities_layer_array, {});

  this.layer_activities = new leaflet_mrkcls.MarkerClusterGroup({
    showCoverageOnHover: false,
    chunkedLoading: true,
    iconCreateFunction(cluster) {
      return Leaflet.divIcon({
        html: `<div class="marker_cluster__marker">${cluster.getChildCount()}</div>`,
        iconSize: Leaflet.point(36, 36),
      });
    },
  });

  /** Add marker layer in the cluster group */
  this.layer_activities.addLayer(activities_layer);

  /** Add the cluster group to the map */
  this.map.addLayer(this.layer_activities);
}
