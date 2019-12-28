/* eslint-disable import/extensions */
import App from './src/js/components/App.js';

const app = new App();
app.draw();
requestAnimationFrame(() => app.step());
