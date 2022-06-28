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

  async search(query, strategyId) {
    const images = await ImageFinder.strategies[strategyId](query);
    return { images, query };
  }
}
