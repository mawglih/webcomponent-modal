class CustomMessage extends HTMLElement {
    get visible() {
      return this.hasAttribute("visible");
    }

    set visible(value) {
      if (value) {
        this.setAttribute("visible", "");
      } else {
        this.removeAttribute("visible");
      }
    }

    get title() {
      return this.getAttribute('title');
    }

    set title(value) {
      this.setAttribute('title', value);
    }

    constructor() {
      super();
    }

    connectedCallback() {
      this._render();
      this._attachEventHandlers();
    }
    static get observedAttributes() {
      return ["visible", "title"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "title" && this.shadowRoot) {
        this.shadowRoot.querySelector(".title").textContent = newValue;
      }
      if (name === "visible" && this.shadowRoot) {
        if (newValue === null) {
          this.shadowRoot.querySelector(".wrapper").classList.remove("visible");
          this.dispatchEvent(new CustomEvent("close"));
        } else {
          this.shadowRoot.querySelector(".wrapper").classList.add("visible");
          this.dispatchEvent(new CustomEvent("open"))
        }
      }
    }

    _render() {
        const wrapper = document.createElement("div");
        wrapper.setAttribute('class', 'wrapper');
        const wrapperContent = document.createElement('div');
        wrapperContent.setAttribute('class', 'wrapper-content');
        const icon = document.createElement('span');
        icon.setAttribute('class', 'icon');
        const title = document.createElement('h1');
        title.setAttribute('class', title);
        title.innerHTML = 'Lost connection';
        const titleWrapper = document.createElement('div');
        titleWrapper.setAttribute('class', 'title-wrapper');
        const infoWrapper = document.createElement('div');
        infoWrapper.setAttribute('class', 'info-wrapper');
        infoWrapper.innerHTML = `
            This application has experienced a <b>system error</b> due to the lack of internet access.<br> <em>Please</em> restart application in order to proceed.
        `
        const border = document.createElement('div');
        const action = document.createElement('span');
        action.setAttribute('class', 'action');
        border.setAttribute('class', 'border');
        action.innerHTML = 'Restart Now';
        let imgUrl;
        if(this.hasAttribute('img')) {
            imgUrl = this.getAttribute('img');
        } else {
            imgUrl = 'images/error-alert.svg';
        }
    
        const img = document.createElement('img');
        img.src = imgUrl;
        icon.appendChild(img);
        const style = document.createElement('style');
    
        style.textContent = `
        .wrapper {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: gray;
            opacity: 0;
            visibility: hidden;
            transform: scale(1.1);
            transition: visibility 0s linear .25s,opacity .25s 0s,transform .25s;
            z-index: 1;
          }
          .visible {
            opacity: 1;
            visibility: visible;
            transform: scale(1);
            transition: visibility 0s linear 0s,opacity .25s 0s,transform .25s;
          }
          .modal {
            font-family: 'Source Sans Pro', sans-serif;
            font-size: 14px;
            padding: 10px 10px 5px 10px;
            background-color: #fff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            border-radius: 2px;
            min-width: 300px;
          }
          .title {
            font-size: 18px;
          }
          .wrapper-content {
            font-family: 'Source Sans Pro', sans-serif;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 1rem 1.5rem;
            width: 24rem;
            border-radius: 0.5rem;
        }
        .title-wrapper {
            display: flex;
            align-items: center;
        }
        .title{
            font-weight: 300;
            padding-left: 50px;

        }
        img {
            width: 20px;
        }
        .icon {
            path {fill: red};
            margin-right: 20px;
        }
        .border {
            border: 1px blue solid;
            color: blue;
            display: flex;
            align-items:center;
            justify-content: center;
            font-weight: 600;
            margin-top: 20px;
            cursor: pointer;
        }
        .action {
            padding: 20px;
        }
        .info-wrapper {
            padding: 10px;
        }
          `;

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(wrapperContent);
        wrapperContent.appendChild(titleWrapper);
        titleWrapper.appendChild(icon);
        titleWrapper.appendChild(title);
        wrapperContent.appendChild(infoWrapper);
        wrapperContent.appendChild(border);
        border.appendChild(action);
    }

    _attachEventHandlers() {
      const cancelButton = this.shadowRoot.querySelector(".border");
      cancelButton.addEventListener('click', e => {
        this.dispatchEvent(new CustomEvent("cancel"))
        this.removeAttribute("visible");
      });
      const escape = this.shadowRoot.querySelector(".wrapper");
      escape.addEventListener('keydown', e => {
          if( e.key === 27) {
            this.dispatchEvent(new CustomEvent("escape"))
            this.removeAttribute("visible");
          }
      });
      this.shadowRoot.addEventListener('keydown', e => {
        if (e.key === 27) {
            this.dispatchEvent(new CustomEvent("keydown"))
            this.removeAttribute("visible");
        }
      });
    }
  }
  window.customElements.define('custom-message-dialog', CustomMessage);
  