import { Gallery } from "../../gallery/Gallery";

const { describe, it, beforeAll, expect, jasmineEnv } = window;

const taskDesc = `<p>Now that <code>search()</code> returns results asynchronously,
the orders in which the responses are returning is not gurenteed.
This might cause unwanted old results to be returned <strong>after</strong> newer queries.
Change the <code>Gallery</code> so that responses for old requests are rejected (hint: it should work for all search strategies).</p>`;

describe("Task 9 - Nuts & Bolts", () => {
  describe(taskDesc, () => {
    it("async giphy result test", async () => {
      const gallery = new Gallery(window.imageFinder);
      const mySpy = new jasmineEnv.createSpy();
      const expiredRequest = gallery.doSearch("dogs", "giphy").then(mySpy);
      const successfulRequest = gallery.doSearch("dogs", "giphy").then(mySpy);

      try {
        await expiredRequest;
      } catch (e) {}
      await successfulRequest;

      const results = mySpy.calls.argsFor(0)[0];
      expect(mySpy.calls.count()).toBe(1);
      expect(results.query, "check result query").toBe("dogs");
    });
  });
});
