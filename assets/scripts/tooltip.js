class Tooltip extends HTMLElement {
  constructor() {
    super()
  
    this.attachShadow({ mode: 'open' })

    Object.assign(this, {
      _isVisible: false,
      _container: undefined,
      _icon: undefined,
      _text: 'Tooltip!',
    })

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

    this._render()
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
    this._isVisible = true
    this._render()
  }

  _hide = () => {
    this._isVisible = false
    this._render()
  }

  _render() {
    if (this._isVisible) {
      this._container = document.createElement('div')
      this._container.textContent = this._text
      
      return void this.shadowRoot.appendChild(this._container)
    }

    this.shadowRoot.removeChild(this._container)
  }
}

customElements.define('app-tooltip', Tooltip)