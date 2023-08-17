import { Scene, Marker, Scale, ExportImage } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import * as G2 from '@antv/g2';

let scene: Scene;
export function setupMap() {
  scene = new Scene({
    id: 'map',
    map: new GaodeMap({
      style: 'light',
      center: [114.1987288, 22.61200036],
      zoom: 15,
      WebGLParams: {
        preserveDrawingBuffer: true,
      },
    }),
    logoVisible: false,
  });
  scene.on('loaded', () => {
    scene.addControl(new Scale({ position: 'bottomright' }));
    scene.addControl(
      new ExportImage({
        onExport: async (base64: string) => {
          const image = await fetch(base64);
          const blob = await image.blob();
          const uri = URL.createObjectURL(blob);
          var a = document.querySelector<HTMLAnchorElement>('#download')!;
          a.href = uri;
          a.click();
        },
      })
    );
    updateChart([]);
  });
}

export function updateChart(data: DataNode[]) {
  console.log(data);
  scene.removeAllMakers();
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
      .color('item', ['#5CCEA1', '#5D7092', '#5B8FF9']);
    chart.render();
    const marker = new Marker({
      element: el,
    }).setLnglat({
      lng: item.coordinates[0],
      lat: item.coordinates[1],
    });
    scene.addMarker(marker);
  });
  scene.render();
}
