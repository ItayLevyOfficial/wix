import { Gallery } from "../../gallery/Gallery";

const { describe, it, beforeAll, expect } = window;

const taskDesc = `<p>Modify your implementation of <code>ImageFinder</code> to include a way of adding <strong>search strategies</strong>. Each strategy accepts a search query and returns the search results in the same format as task 1.</p>
<p>Move your search functionality of staticImagesData into its own strategy - name it 'static'.</p>
<p><code>ImageFinder</code> should throw an exception for a unknown strategy.</p>
<p>Add the static strategy to the global imageFinder instance.</p>
<p>Change <code>Gallery.doSearch()</code> to use your new <code>ImageFinder</code> implementation - it should now accept query and strategy id:<br/>
<code>gallery.doSearch(query, strategyId)</code>.</p>`;

describe("Task 2 - Search Strategies", () => {
  describe(taskDesc, () => {
    let gallery;
    beforeAll(async () => {
      gallery = new Gallery(window.imageFinder);
    });

    it("should throw if the strategy is unknown", async () => {
      let thrown = false;

      try {
        await Promise.resolve().then(() =>
          gallery.doSearch("dog", "notARealStrategyId")
        );
      } catch (e) {
        thrown = true;
      }

      expect(thrown).toBe(true);
    });
  });
});
