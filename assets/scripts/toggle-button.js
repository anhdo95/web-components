class ToggleButton extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })

    this.shadowRoot.innerHTML = `
      <style>
        .toggle-btn {
          padding: .5rem 1.2rem;
          color: var(--light-color);
          background-color: var(--dark-color);
          border: none;
          outline: none;
          cursor: pointer;
        }

        /* app-toggle-button */
        :host {
          display: block;
          padding: .5rem 1rem;
          background-color: var(--default-color);
        }

        /* if app-toggle-button has a '.button-section' parent */
        :host-context(.button-section) {
          font-weight: bold;
        }

        :host(.primary) {
          background-color: var(--primary-color);
        }

        :host(.secondary) {
          background-color: var(--secondary-color);
        }

        ::slotted(span) {
          color: var(--dark-color);
        }

        ::slotted(span:hover) {
          color: var(--dark-color-1);
        }

        .content {
          display: none;
          padding: 1rem;
        }

        .content.active {
          display: block;
        }
      </style>
      <button class="toggle-btn">Show</button>
      <slot class="content"></slot>
    `

    this.button = this.shadowRoot.querySelector('.toggle-btn')
    this.content = this.shadowRoot.querySelector('.content')
    this.button.addEventListener('click', (event) => {
      const text = event.currentTarget.textContent;

      event.currentTarget.textContent = text === 'Hide' ? 'Show' : 'Hide'

      this.content.classList.toggle('active')
    })
  }

  connectedCallback() {
    if (this.hasAttribute("is-visible") && this.getAttribute("is-visible") !== 'false') {
      this.button.click()
    }
  }
}

customElements.define('app-toggle-button', ToggleButton)