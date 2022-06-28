import { staticImagesData } from "./static-images-db";

export class ImageFinder {
  static strategies = {
    static: (query) =>
      staticImagesData
        .filter((image) => image.title.indexOf(query) !== -1)
        .map(({ id, url, title }) => ({ id, url, title }))
  };

  search(query, strategyId) {
    const images = ImageFinder.strategies[strategyId](query);
    return { images, query };
  }
}
