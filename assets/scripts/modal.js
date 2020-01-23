class Modal extends HTMLElement {
  constructor() {
    super()

    this.state = {
      isOpen: false,
    }

    this.props = {
      okButtonText: this.getAttribute("ok-button-text"),
      cancelButtonText: this.getAttribute("cancel-button-text")
    }

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        :host([is-open]) .backdrop,
        :host([is-open]) .modal-box {
          opacity: 1;
          visibility: visible;
        }

        ::slotted(.title) {
          margin: 0;
        }

        .backdrop {
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          visibility: hidden;
          background-color: rgba(0, 0, 0, .3);
          transition: all .5s;
        }

        .modal-box {
          position: fixed;
          left: 50%;
          top: 30%;
          min-width: 50%;
          opacity: 0;
          visibility: hidden;
          font-family: 'san-serif';
          background-color: #fff;
          box-shadow: 0 2rem 3rem rgba(0, 0, 0, .3);
          transform: translate(-50%, -50%);
          transition: all .5s;
        }

        .modal-header {
          padding: 1rem 1.5rem;
          text-align: center;
          background-color: var(--primary-color);
        }

        .modal-content {
          padding: 1rem 1.5rem;
        }

        .modal-footer {
          padding: 1rem 1.5rem;
          text-align: right;
          background-color: var(--primary-color);
        }

        .btn {
          padding: .5rem 1.5rem;
          font-size: 1.05rem;
          border: none;
          outline: none;
        }
        .btn:hover {
          opacity: .9;
          cursor: pointer;
        }
        .btn-ok {
          background-color: var(--default-color);
        }
        .btn-cancel {
          color: var(--light-color);
          background-color: var(--danger-color);
        }
      </style>
      <div class="backdrop"></div>
      <div class="modal-box">
        <header class="modal-header">
          <slot name="title">Missing title</slot>
        </header>
        <main class="modal-content"><slot></slot></main>
        <footer class="modal-footer">
          <button class="btn btn-ok">${this.props.okButtonText}</button>
          <button class="btn btn-cancel">${this.props.cancelButtonText}</button>
        </footer>
      </div>
    `

    this.handleSlotsChange()
  }

  static get observedAttributes() {
    return ['is-open']
  }

  /**
   * This feature might help at anytime
   */
  handleSlotsChange() {
    const slots = this.shadowRoot.querySelectorAll('slot')

    for (const slot of slots) {
      slot.addEventListener('slotchange', (event) => {
        console.dir(slot)
      })
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'is-open') {
      this.state.isOpen = newValue === "true"
    }
  }

  open() {
    this.setAttribute('is-open', true)
    this.state.isOpen = true
  }
}

customElements.define('app-modal', Modal)