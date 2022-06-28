import { staticImagesData } from "./static-images-db";
const axios = require("axios");
const giphyApiKey = "NXNp3Vhfmrv6xJTAP40VoofaPdHSZCj9";

export class ImageFinder {
  static formatResults = (images) =>
    images.map(({ id, url, title }) => ({ id, url, title }));

  static strategies = {
    static: (query) =>
      ImageFinder.formatResults(
        staticImagesData.filter((image) => image.title.indexOf(query) !== -1)
      ),
    giphy: async (query) =>
      (
        await axios.get(
          `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${giphyApiKey}`
        )
      ).data.data.map(({ id, images, title }) => ({
        id,
        url: images.original.url,
        title
      }))
  };

  async search(query, strategyId, limit) {
    let images = await ImageFinder.strategies[strategyId](query);
    images = uniqBy(images, JSON.stringify);
    if (limit && images.length > limit) {
      images = images.slice(0, limit);
    }
    return { images, query };
  }
}

function uniqBy(a, key) {
  var seen = {};
  return a.filter(function (item) {
    var k = key(item);
    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  });
}
