import { Gallery } from "../../gallery/Gallery";

const { describe, it, beforeAll, expect } = window;
const taskDesc = `
<p>
    Add a giphy search strategy to the system using Giphy Web API.
    <br><br>
    Use the following API key:
    <code>'NXNp3Vhfmrv6xJTAP40VoofaPdHSZCj9'</code>
</p>
<p>
    <li>
        <strong>Bonus</strong> - Add a drop down menu in gallery to select a search strategy (static / giphy).
    </li>
</p>`;

describe("Task 3 - Async Giphy Strategy", () => {
  describe(taskDesc, () => {
    let gallery;
    let results;

    beforeAll(async () => {
      gallery = new Gallery(window.imageFinder);
      results = await gallery.doSearch("dog", "giphy");
    });

    it("results should have the right format", async () => {
      expect(results).toBeDefined();
      expect(results.query).toBe("dog");
      expect(
        results.images instanceof Array,
        "check that results.images is an Array"
      ).toBeTruthy();
      expect(
        (function () {
          const { id, url, title, ...rest } = results.images[0];
          return id && url && title && !Object.keys(rest).length;
        })()
      ).toBeTruthy();
    });

    it("URLs should have an image suffix", () => {
      expect(
        results.images.every((image) => {
          const chunks = image.url.split(".");
          const suffix = chunks[chunks.length - 1];
          return ["gif", "png", "jpg", "webp"].includes(suffix);
        })
      ).toBeTruthy();
    });
  });
});
