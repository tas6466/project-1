/**
 * Copyright 2024 tas6466
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `hax-search`
 * 
 * @demo index.html
 * @element hax-search
 */
export class HaxSearch extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "hax-search";
  }

  constructor() {
    super();
    this.title = '';
    this.value = '';
    this.loading = false;
    this.items = [];
    this.cachedData = null;
    this.jsonUrl = 'https://haxtheweb.org/site.json';
    this.jsonBaseUrl = this.extractBaseUrl(jsonUrl);
  }

  static get properties() {
    return {
      title: { type: String },
      value: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array },
      cachedData: { type: Array },
      jsonUrl: { type: String },
      baseUrl: { type: String }
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .search-container {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-radius: 24px;
        border: 1px solid #dfe1e5;
        padding: 5px 10px;
        box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        transition: box-shadow 0.3s ease;
      }

    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <h2>${this.title}</h2>
        <div class="search-container">
          <input 
            id="input" 
            class="search-input" 
            placeholder="Search HaxWeb content" 
            @input="${this.inputChanged}" 
          />
        </div>
        <div class="results">
        ${this.items.map((item) => {
          const created = item.metadata ? new Date(parseInt(item.metadata.created) * 1000).toLocaleDateString() : '';
          const updated = item.metadata ? new Date(parseInt(item.metadata.updated) * 1000).toLocaleDateString() : '';
          const logo = item.metadata && item.metadata.files && item.metadata.files[0] ? item.metadata.files[0].url : '';

          return html`
            <hax-card
              created="${created}"
              lastUpdated="${updated}"
              title="${item.title}"
              description="${item.description}"
              logo="${logo}"
              slug="${item.slug}"
              baseUrl="${this.jsonBaseUrl}"
            ></hax-card>
          `;
        })}
      </div>
    `;
  }

  extractBaseUrl(url) {
    return url.replace(/\/?[^\/]*\.json$/, '');
  }

  updateResults(value) {
    this.loading = true;
    this.jsonBaseUrl = this.extractBaseUrl(this.jsonUrl);
    fetch(this.jsonUrl) // Use the jsonUrl property
      .then(response => response.ok ? response.json() : {})
      .then(data => {
        if (data && Array.isArray(data.items)) {
          this.items = data.items.filter(item => 
            item.title.toLowerCase().includes(value.toLowerCase()) ||
            item.description.toLowerCase().includes(value.toLowerCase())
          );
        }

        this.updateGlobalHexColor(data);
        this.loading = false;
      });
  }

  updateGlobalHexColor(data) {
    if (data.metadata && data.metadata.theme && data.metadata.theme.variables) {
      const hexCode = data.metadata.theme.variables.hexCode;
      console.log('Hex Code:', hexCode);
      document.documentElement.style.setProperty('--global-hex-color', hexCode);
    } else {
      console.log('Hex Code not found');
    }
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(HaxSearch.tag, HaxSearch);