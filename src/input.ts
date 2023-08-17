import './input.css';
import { updateChart } from './map';

export function setupInput() {
  document.querySelector<HTMLDivElement>('#input')!.innerHTML = `
    <div id="input-container">
      <div id="paste">
        <label>数据</label><br>
        <textarea id="data"></textarea>
        <button id="submit">提交</button>
      </div>
      <div id="preview">
        <table>
          <thead>
            <tr>
              <th>名称</th>
              <th>经度</th>
              <th>纬度</th>
              <th>浓度</th>
            </tr>
          </thead>
          <tbody id="preview-data"><tbody>
        </table>
      <div>
    </div>
  `;

  document.getElementById(
    'data'
  )!.value = `ZKAB2\t114.1987288\t22.61200036\t0.08
    `;

  document
    .getElementById('submit')!
    .addEventListener('click', update, { passive: true });
}

function update() {
  const data: DataNode[] = [];
  const raw = document.getElementById('data')!.value as string;
  const preview = raw
    .split('\n')
    .map((line) => {
      if (line.trim() === '') return '';
      const [name, longtitude, latitude, value] = line.trim().split('\t');
      data.push({
        name,
        value: parseFloat(value),
        coordinates: [parseFloat(longtitude), parseFloat(latitude)],
        id: name,
      });
      return `<tr>
      <th>${name}</th>
      <td>${longtitude}</td>
      <td>${latitude}</td>
      <td>${value}</td>
    </tr>`;
    })
    .join('\n');
  document.getElementById('preview-data')!.innerHTML = preview;
  updateChart(data);
}
