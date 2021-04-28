import { BASE_PATH_TOURISM_ODHACTIVITYPOI } from "./config";

export async function requestGetCoordinatesFromSearch(query) {
  const r = 150 * 1000;
  try {
    if (query) {
      // ODH

      // Skiarea API doesn't have "searchfilter" parameter, so it is not filtrable

      // let formattedTourismSkiareaResponseData = [];
      // const tourismSkiareRequest = await fetch(
      //   `${BASE_PATH_TOURISM_SKIAREA}?elements=0&fields=Id,Latitude,Longitude,Detail`
      // );
      // const tourismSkiareResponse = await tourismSkiareRequest.json();
      // if (tourismSkiareResponse.Items) {
      //   formattedTourismSkiareaResponseData = tourismSkiareResponse.Items.map(
      //     (o) => {
      //       let title = "";
      //       if (o.Detail[this.language].Title) {
      //         title = o.Detail[this.language].Title;
      //       }
      //       return {
      //         position: [o.Latitude, o.Longitude],
      //         title: title || o.Detail.it.Title || o.Detail.de.Title,
      //       };
      //     }
      //   );
      // }

      let formattedTourismActivityPoiData = [];
      const tourismActivityPoiRequest = await fetch(
        `${BASE_PATH_TOURISM_ODHACTIVITYPOI}?type=2&fields=Id,GpsInfo,Detail&searchfilter=${query}`
      );
      const tourismActivityPoiResponse = await tourismActivityPoiRequest.json();

      if (tourismActivityPoiResponse.Items) {
        formattedTourismActivityPoiData = tourismActivityPoiResponse.Items.filter(
          (o) => {
            return o.GpsInfo.length > 0;
          }
        ).map((o) => {
          let title = "";
          if (o.Detail[this.language].Title) {
            title = o.Detail[this.language].Title;
          }

          return {
            position: o.GpsInfo.length
              ? [
                  o.GpsInfo[o.GpsInfo.length - 1].Latitude,
                  o.GpsInfo[o.GpsInfo.length - 1].Longitude,
                ]
              : [],
            title: title || o.Detail.it.Title || o.Detail.de.Title,
          };
        });
      }

      // Other data

      let formattedHereData = [];
      if (
        !formattedTourismActivityPoiData.length &&
        process.env.DOTENV.HEREMAPS_API_KEY
      ) {
        const hereResponse = await fetch(
          `https://places.ls.hereapi.com/places/v1/browse?apiKey=${process.env.DOTENV.HEREMAPS_API_KEY}&in=46.31,11.26;r=${r}&q=${query}`,
          {
            method: "GET",
            headers: new Headers({
              Accept: "application/json",
            }),
          }
        );
        const hereData = await hereResponse.json();
        if (hereData.results) {
          formattedHereData = hereData.results.items.map((item) => {
            return {
              position: item.position,
              title: item.title,
            };
          });
        }
      }

      //

      const tourismResponse = await fetch(
        `https://tourism.opendatahub.bz.it/api/Poi?pagenumber=1&pagesize=10000&poitype=511&searchfilter=${query}`,
        {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
          }),
        }
      );
      const tourismData = await tourismResponse.json();
      const formattedTourismData = tourismData.Items.map((item) => {
        return {
          position: [item.GpsInfo[0].Latitude, item.GpsInfo[0].Longitude],
          title: item.Detail[this.language].Title,
        };
      });

      this.searchPlacesFound = {
        "Open Data Hub": [
          // ...formattedTourismSkiareaResponseData,
          ...formattedTourismActivityPoiData,
        ],
        "Other results": [...formattedTourismData, ...formattedHereData],
      };
    }
  } catch (error) {
    console.error(error);
    this.searchPlacesFound = {};
  }
}
