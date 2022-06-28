import "./Gallery.css";
import React from "react";
import { Gallery as GalleryLogic } from "./Gallery";
import debounce from "./debounce";

const GalleryItems = ({ items }) => (
  <div className="galleryItems">
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <img src={item.url} alt={item.title} />
        </li>
      ))}
    </ul>
  </div>
);

export class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: []
    };
    this.debouncedSearch = debounce(this.doSearch.bind(this));
    this.gallery = new GalleryLogic(props.imageFinder);
  }

  async doSearch() {
    const { query } = this.state;
    const searchResult = await this.gallery.doSearch(query);
    this.setState({ results: searchResult.images });
  }

  async loadMore() {
    const searchResult = await this.gallery.loadMore(this.state.query);
    searchResult && this.setState({ results: searchResult.images });
  }

  onChange(evt) {
    this.setState({ query: evt.target.value });
  }

  onKeyDown(evt) {
    if (evt.key === "Enter") {
      this.doSearch(evt);
    }
  }

  render() {
    const { results } = this.state;

    return (
      <div className="gallery">
        <div className="galleryControls">
          <input
            value={this.state.query}
            placeholder="Search images"
            onChange={(evt) => this.onChange(evt)}
            onKeyDown={(evt) => this.onKeyDown(evt)}
          />
          <button onClick={(e) => this.debouncedSearch(e)}>Search</button>
          <button onClick={(e) => this.loadMore(e)}>Load More</button>
        </div>
        <GalleryItems items={results} />
      </div>
    );
  }
}
