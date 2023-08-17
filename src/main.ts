import { setupInput } from './input';
import { setupMap } from './map';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="input"></div>
  <div id="map" style="position: relative; width: 100%; height: 50vh;"></div>
  <a id="download" style="display: none" download="image.png"></a>
`;

setupInput();
setupMap();
