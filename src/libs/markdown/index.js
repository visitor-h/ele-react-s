import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import prism from 'prismjs';

export default class Markdown extends React.Component {
    constructor(props) {
        super(props);

        this.components = new Map;

        this.renderer = new marked.Renderer();
        this.renderer.table = (header, body) => {
            return `<table class="grid"><thead>${header}</thead><tbody>${body}</tbody></table>`;
        };
    }

    componentDidMount() {
        this.renderDOM();
    }

    componentDidUpdate() {
        this.renderDOM();
    }

    renderDOM() {
        for (const [id, component] of this.components) {
            const div = document.getElementById(id);

            if (div instanceof HTMLElement) {
                ReactDOM.render(component, div);
            }
        }
        prism.highlightAll();
    }

    render() {
        const document = this.document();
        console.log(11, document)

        return <div>123</div>
    }
}

