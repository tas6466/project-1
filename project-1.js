import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/simple-icon/simple-icon.js';

export class Project1 extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "project-1";
  }

  constructor() {
    super();
    this.name = "";
    this.alt = "";
    this.description = "";
    this.logo = "";
    this.theme = "";
    this.created = "";
    this.lastUpdated = "";
    this.hexCode = "";
    this.icon = "";
    this.items = [];
    this.showOverview = false;
    this.baseUrl = "";
  }

  static get properties() {
    return {
      ...super.properties,
      name: { type: String },
      alt: { type: String },
      description: { type: String },
      logo: { type: String },
      theme: { type: String },
      created: { type: String },
      lastUpdated: { type: String },
      hexCode: { type: String },
      icon: { type: String },
      items: { type: Array },
      showOverview: { type: Boolean },
      baseUrl: { type: String }
    };
  }

  static get styles() {
    return [super.styles,
      css`
        :host {
          display: block;
          margin: var(--ddd-spacing-4);
          padding: var(--ddd-spacing-4);
          border-radius: var(--ddd-radius-md); 
        }
        .input-container {
          display: block;
          justify-content: center;
          margin-bottom: var(--ddd-spacing-5);
        }
        input {
          width: 512px;
          height: 48px;
          background-color: var(--ddd-theme-default-white);
          border: var(--ddd-border-lg);
          border-radius: var(--ddd-radius-lg);
          border-color: var(--ddd-theme-default-beaverBlue);
          font-family: var(--ddd-font-navigation);
          font-size: var(--ddd-font-size-md);
          color: var(--ddd-theme-default-beaverBlue);
          text-align: center;
        }
        #inputBox::placeholder {
          color: var(--ddd-theme-default-limestoneGray);
        }
        button {
          width: 160px;
          height: 48px;
          border: var(--ddd-border-lg);
          border-radius: var(--ddd-radius-lg);
          border-color: var(--ddd-theme-default-beaverBlue);
          background-color: var(--ddd-theme-default-skyBlue);
          font-family: var(--ddd-font-navigation);
          font-size: var(--ddd-font-size-sm);
          color: var(--ddd-theme-default-white);
          cursor: pointer;
        }
        button:hover {
          box-shadow: var(--ddd-boxShadow-md);
        }
        button:active {
          background-color: var(--ddd-theme-default-white);
          color: var(--ddd-theme-default-beaverBlue);
        }
        .overview {
          width: 900px;
          height: 550px;
          margin: 0 auto;
          text-align: center;
          margin-bottom: var(--ddd-spacing-10);
          background-color: var(--ddd-theme-default-beaverBlue); 
          padding: var(--ddd-spacing-5);
          border-radius: var(--ddd-radius-lg);
          border: 8px solid var(--ddd-theme-default-skyBlue);
          box-shadow: var(--ddd-shadow-sm);
          color: var(--ddd-theme-default-white);
          font-family: var(--ddd-font-navigation);
        }
        .overview img {
          max-width: 100px;
          margin-bottom: var(--ddd-spacing-4);
        }
        .cards-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);;
          gap: 20px; 
          width: 100%; 
          box-sizing: border-box; 
          font-family: var(--ddd-font-navigation);
        }
        .card {
          background-color: var(--ddd-theme-default-creekLight);
          border: 4px solid var(--ddd-theme-default-beaverBlue);
          padding: var(--ddd-spacing-5);
          text-align: center;
          border-radius: var(--ddd-radius-lg);
        }
        .card:hover {
          box-shadow: var(--ddd-boxShadow-lg);
          background-color: var(--ddd-theme-default-skyBlue);
        }
        @media (max-width: 1024px) {
          .cards-container {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
        }
        @media (max-width: 768px) {
          .cards-container {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
        }
        @media (max-width: 480px) {
          .cards-container {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
        }
        .card h3 {
          font-size: 18px;
          margin-bottom: var(--ddd-spacing-3);
          color: var(--ddd-theme-default-black); 
        }
        .card p {
          font-size: 14px;
          color: var(--ddd-theme-default-black);
        }
        .card a {
          font-size: 14px;
          color: var(--ddd-theme-default-black); 
          text-decoration: underline;
          display: block;
          margin-top: var(--ddd-spacing-3);
        }
        .card a:hover {
          color: var(--ddd-theme-default-beaverBlue); 
        }
        .icon {
          display: inline-block;
          width: 20px; 
          height: 20px;
        }
        .link-container {
          display: inline-block;
          margin-top: var(--ddd-spacing-2);
        }
        .content-link .source-link {
          display: inline-block; /* Prevents the link from expanding */
          color: var(--ddd-theme-default-black);
          text-decoration: underline;
          padding: 0; /* Reduces clickable area to only text */
          margin: 0;
          cursor: pointer;
        }
      `];
  }

  inputChanged() {
    const siteUrl = this.shadowRoot.getElementById('input').value.trim();
    this.baseUrl = siteUrl.replace('/site.json', '');
    if (siteUrl) {
      this.fetchSiteData(siteUrl);
    } 
    else {
      alert("Please enter a valid URL.");
    }
  }
  
  async fetchSiteData(siteUrl) {
    if (siteUrl.endsWith('/site.json')) {
      fetch(siteUrl)
      const response = await fetch(siteUrl);
      const data = await response.json();
      if (data.metadata) {
        this.name = data.title || "Default Site Name";
        this.description = data.description || "Default description.";
        this.logo = data.metadata.site.logo || "project-1/defaultLogo.png";
        this.theme = data.metadata.theme.element || "Default theme";
        this.created = data.metadata.site.created || "Not specified";
        this.lastUpdated = data.metadata.site.updated || "Not specified";
        this.hexCode = data.metadata.theme.variables.hexCode || "#000000"; 
        this.icon = data.metadata.icon || "";
        this.showOverview = true;
        this.items = data.items || [];
      }
    }
  }

  render() {
    return html`
    <div class="input-container">
      <input id="input" type="text" placeholder="Enter JSON Link Here" /> 
      <button @click="${this.inputChanged}">Analyze</button> 
    </div>

    ${this.showOverview ? 
      html`
        <div class="overview">
          <img src = "${this.baseUrl}/${this.logo}"/>
          <h2>${this.name}</h2>
          <p>${this.description}</p>
          <p>Theme: ${this.theme}</p>
          <p>Created: ${this.created}</p>
          <p>Last Updated: ${this.lastUpdated}</p>
          <p>Hex Code: ${this.hexCode}</p>
          <p>Icon: <img class="icon" src="${this.baseUrl}/${this.icon}"/></p>
        </div>
      ` : ''
    }

    <div class="cards-container">
      ${this.items.map(item => html`
          <div class="card" @click="${() => window.open(`${this.baseUrl}/${item.slug}`, '_blank')}">
              <img class="icon" src = "${this.baseUrl}/${this.icon}"/>
              <h3>${item.title}</h3>
              <p>${item.description}</p>
              <p><strong>Last updated:</strong> ${item.metadata.updated || 'N/A'}</p>
              <p><strong>Slug:</strong> ${item.slug}</p>
              <div class="link-container" @click="${e => e.stopPropagation()}">
                <a href="${this.baseUrl}/${item.slug}" target="_blank" class="content-link">Content</a>
                <a href="${this.baseUrl}/${item.location}" target="_blank" class="source-link">Source</a>
              </div>
          </div>
      `)}
    </div>
    `;
  }
}

globalThis.customElements.define(Project1.tag, Project1);