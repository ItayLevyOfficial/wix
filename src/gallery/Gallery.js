export class Gallery {
  constructor(imageFinder) {
    this.imageFinder = imageFinder;
  }

  /**
   * start a new search
   * @param {String} query - search term to look for
   * @resolve {query:String{images:[{id:String, url:string, title:string}]}} searchResult - results object for gallery update
   */
  doSearch(query, strategyId = "static", limit) {
    return this.imageFinder.search(query, strategyId, limit);
  }

  loadMore() {
    //
  }
}
