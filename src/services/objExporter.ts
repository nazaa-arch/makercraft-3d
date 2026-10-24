import * as THREE from 'three';

export function exportGeometryToOBJ(geometry: THREE.BufferGeometry, filename = 'makercraft_model.obj') {
  let output = '# MakerCraft 3D - Algorithmic Mathematical Model\n';
  output += `# Exported from maker.steamcraft.online\n`;
  output += `# Creator: Muhammad Naza Firmansyah\n\n`;

  const posAttr = geometry.getAttribute('position');
  const normalAttr = geometry.getAttribute('normal');
  const index = geometry.getIndex();

  if (!posAttr) return;

  // Vertices
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);
    output += `v ${x.toFixed(4)} ${y.toFixed(4)} ${z.toFixed(4)}\n`;
  }

  // Normals
  if (normalAttr) {
    for (let i = 0; i < normalAttr.count; i++) {
      const nx = normalAttr.getX(i);
      const ny = normalAttr.getY(i);
      const nz = normalAttr.getZ(i);
      output += `vn ${nx.toFixed(4)} ${ny.toFixed(4)} ${nz.toFixed(4)}\n`;
    }
  }

  // Faces
  output += 's 1\n';
  if (index) {
    for (let i = 0; i < index.count; i += 3) {
      const a = index.getX(i) + 1;
      const b = index.getX(i + 1) + 1;
      const c = index.getX(i + 2) + 1;
      if (normalAttr) {
        output += `f ${a}//${a} ${b}//${b} ${c}//${c}\n`;
      } else {
        output += `f ${a} ${b} ${c}\n`;
      }
    }
  } else {
    for (let i = 0; i < posAttr.count; i += 3) {
      const a = i + 1;
      const b = i + 2;
      const c = i + 3;
      if (normalAttr) {
        output += `f ${a}//${a} ${b}//${b} ${c}//${c}\n`;
      } else {
        output += `f ${a} ${b} ${c}\n`;
      }
    }
  }

  const blob = new Blob([output], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
