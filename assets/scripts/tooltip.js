class Tooltip extends HTMLElement {
  constructor() {
    super()
  
    this.attachShadow({ mode: 'open' })
    this._container
    this._icon
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

  static get observedAttributes() {
    return ['text']
  }

  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._text = this.getAttribute('text')
    }

    this._icon = this.shadowRoot.querySelector('span')

    this._icon.addEventListener('mouseenter', this._show)
    this._icon.addEventListener('mouseleave', this._hide)

    this.shadowRoot.appendChild(this._icon)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return

    const attribute = {
      text: '_text'
    }[name]

    this[attribute] = newValue
  }

  disconnectedCallback() {
    this._icon.addEventListener('mouseenter', this._show)
    this._icon.addEventListener('mouseleave', this._hide)
  }

  _show = () => {
    this._container = document.createElement('div')
    this._container.textContent = this._text
    
    this.shadowRoot.appendChild(this._container)
  }

  _hide = () => {
    this.shadowRoot.removeChild(this._container)
  }
}

customElements.define('app-tooltip', Tooltip)