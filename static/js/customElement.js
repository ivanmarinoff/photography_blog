class IncludeComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const src = this.getAttribute('src');
        if (src) {
            fetch(src)
                .then(response => response.text())
                .then(data => {
                    this.innerHTML = data;
                })
                .catch(error => {
                    console.error('Error loading include file:', error);
                    this.innerHTML = "<p>Error loading content</p>";
                });
        }
    }
}

customElements.define('include-component', IncludeComponent);
