// Insert Button JS
// Create a class for the element
class CustomButton extends HTMLElement {
    constructor() {
      // Always call super first in constructor
        super();
  
      // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});
  
      // Create spans
        const wrapper = document.createElement('span');
        wrapper.setAttribute('class', 'wrapper');
        const button = document.createElement('span');
        button.setAttribute('class', 'button');
        button.type = 'button';
        const info = document.createElement('span');
        info.setAttribute('class', 'info');
        const text = this.getAttribute('data-text');
        info.textContent = text;

        // button.innerHTML = 'Error Example'
        const style = document.createElement('style');
        style.textContent = `
            .wrapper {
                position: relative;
            }
            .button {
                font-family: 'Source Sans Pro', sans-serif;
                font-weight: 600;
                color: #2F2F32;
                background-color: #D7D7D8;
                padding: 10px 40px;
                margin-top: 40px !important;
            }
            .button:hover {
                background-color: #888;
            } 
        `;
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(button);
        button.appendChild(info);
        button.onclick
    }
}
customElements.define('custom-button', CustomButton);
let modal = document.querySelector('custom-message-dialog');
modal.addEventListener('cancel', function () {
    console.log('cancel event raised');
});
modal.addEventListener('escape', function () {
    console.log('escape event raised');
});

let open = document.querySelector('custom-button');
open.addEventListener('click', function () {
    modal.visible = true;
});
let close = document.addEventListener('keydown', e => {
    modal.visible = false;
  });