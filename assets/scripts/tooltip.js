class Tooltip extends HTMLElement {
  constructor() {
    super()
  
    this.attachShadow({ mode: 'open' })
    this._container;
    this._text = 'Tooltip!'

    this.shadowRoot.innerHTML = `
      <style>
        div {
          position: absolute;
          color: #f2f2f2;
          background-color: rgba(0, 0, 0, .9)
        }
      </style>
      <slot>Default content</slot>
      <span> (?)</span>
    `
  }

  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._text = this.getAttribute('text')
    }

    const icon = this.shadowRoot.querySelector('span')

    icon.addEventListener('mouseenter', this._show.bind(this))
    icon.addEventListener('mouseleave', this._hide.bind(this))

    this.shadowRoot.appendChild(icon)
  }

  _show() {
    this._container = document.createElement('div')
    this._container.textContent = this._text
    
    this.shadowRoot.appendChild(this._container)
  }

  _hide() {
    this.shadowRoot.removeChild(this._container)
  }
}

customElements.define('app-tooltip', Tooltip)