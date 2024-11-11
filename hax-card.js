/**
 * Copyright 2024 tas6466
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `hax-card`
 * 
 * @demo index.html
 * @element hax-card
 */
export class HaxCard extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "hax-card";
  }

  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.logo = '';
    this.created = '';
    this.lastUpdated = '';
    this.slug = 'google.com';
    this.baseUrl = 'google.com';
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      logo: { type: String},
      created: { type: String },
      lastUpdated: { type: String},
      slug: { type: String},
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
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
    `];
  }

  render() {
    const createdDate = new Date(parseInt(this.created) * 1000).toLocaleDateString();
    const updatedDate = new Date(parseInt(this.lastUpdated) * 1000).toLocaleDateString();
    
    if (this.logo == '') {
      this.logo = "/files/HAX.psu%20World%20changer-circle1.png";//This changes the default image for empty strings
  }
  

    return html`
      <div
        class="card"
        tabindex="0"
        @click="${this.openSlug}"
        @keyup="${this.onKeyup}"
      >
        <div class="image-container">
          <img src="${this.baseURL}/${this.logo}" alt="${this.title}" />
        </div>
        <div class="info">${this.title}</div>
        <div class="secondary">${this.description}</div>
        <div class="metadata">Created: ${createdDate}</div>
        <div class="metadata">Updated: ${updatedDate}</div>
      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(HaxCard.tag, HaxCard);