import L, { Map } from 'leaflet';
import * as G2 from '@antv/g2';
import 'leaflet/dist/leaflet.css';
import './map.css';
// @ts-ignore
import AutoGraticule from 'leaflet-auto-graticule';
import { gcj02ToWgs84 } from './correction';

let map: Map;
export function setupMap() {
  map = L.map('map', {
    center: [22.61200036, 114.1987288],
    zoom: 15,
    attributionControl: false,
    zoomControl: false,
  });
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

  L.control.scale({ metric: true, imperial: false }).addTo(map);
  const graticule = new AutoGraticule();
  graticule.lineStyle.color = '#888888';
  graticule.addTo(map);
}

const layerGroup = L.layerGroup();

export function updateChart(data: DataNode[]) {
  layerGroup.clearLayers();
  data.forEach(function (item) {
    const el = document.createElement('div');

    const size = 70;

    const itemData = [
      {
        item: 'Fe',
        count: item.value,
      },
    ];

    const chart = new G2.Chart({
      container: el,
      width: 30,
      height: size,
      renderer: 'svg',
      padding: 0,
    });
    chart.legend(false);
    chart.data(itemData);
    chart.tooltip(false);

    chart.axis('count', false);
    chart.axis('item', false);
    chart
      .interval()
      .position('item*count')
      .color('item', ['#D08770', '#BF616A', '#EBCB8B']);
    chart.render();

    const marker = L.divIcon({
      html: el,
      className: 'bar-marker',
    });
    const {lng, lat} = gcj02ToWgs84(item.coordinates[0], item.coordinates[1])
    const layer = L.marker([lat, lng], { icon: marker });
    layerGroup.addLayer(layer);
  });
  layerGroup.addTo(map);
}
