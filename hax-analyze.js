/**
 * Copyright 2024 tas6466
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `hax-analyze`
 * 
 * @demo index.html
 * @element hax-analyze
 */
export class HaxAnalyze extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "hax-analyze";
  }

  constructor() {
    super();
    this.url = 'https://haxtheweb.org/site.json';
  }

  // Lit reactive properties
  static get properties() {
    return {
      url: { type: String }
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--hax-analyze-label-font-size, var(--ddd-font-size-s));
      }
      #link {
        width: 512px;
        height: 48px;
        background-color: var(--ddd-theme-default-skyBlue);
        border: var(--ddd-border-lg);
        border-radius: var(--ddd-radius-sm);
        border-color: var(--ddd-theme-default-beaverBlue);
        font-family: var(--ddd-font-navigation);
        font-size: var(--ddd-font-size-md);
        color: var(--ddd-theme-default-white);
        text-align: center;
      }
      #link::placeholder {
        color: var(--ddd-theme-default-limestoneLight);
      }
      #analyze {
        width: 160px;
        height: 48px;
        border: var(--ddd-border-lg);
        border-radius: var(--ddd-radius-sm);
        border-color: var(--ddd-theme-default-skyBlue);
        background-color: var(--ddd-theme-default-beaverBlue);
        font-family: var(--ddd-font-navigation);
        font-size: var(--ddd-font-size-sm);
        color: var(--ddd-theme-default-white);
        cursor: pointer;
      }
      #analyze:hover {
        box-shadow: var(--ddd-boxShadow-sm);
      }
      #analyze:active {
        background-color: var(--ddd-theme-default-white);
        color: var(--ddd-theme-default-beaverBlue);
      }
    `];
  }

  // Lit render the HTML
  render() {
    if (this.url == ''){this.url = 'https://haxtheweb.org/site.json';}
    else if (!this.url || !this.url.endsWith('/site.json')) {this.url+='/site.json'}
    
    return html`
      <div class="wrapper">
        <input id="link" type="text" placeholder="Enter JSON Link Here" @input="${this._updateUrl}"/>
        <button id="analyze" @click="${this._analyze}">Analyze</button>
      </div>
      <hax-search .jsonUrl="${this.url}"></hax-search>
    `;
  }

  _updateUrl(event) {
    this.url = event.target.value;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(HaxAnalyze.tag, HaxAnalyze);