import type { Mesh3D } from 'lib/Geometry/geometry';

const SQRT3 = Math.sqrt(3);
const RECIPROCAL_SQRT6 = 1 / Math.sqrt(6);

export function drawMesh3DIsometric(canvas: HTMLCanvasElement, mesh: Mesh3D) {
  if (!canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.beginPath();

  for (const edge of mesh.edges) {
    const start = mesh.vertices[edge.start];
    const end = mesh.vertices[edge.end];

    const startx = start.x;
    const starty = start.y;
    const startz = start.z;
    const endx = end.x;
    const endy = end.y;
    const endz = end.z;

    const startX = RECIPROCAL_SQRT6 * (SQRT3 * startx - SQRT3 * startz);
    const startY = RECIPROCAL_SQRT6 * (startx + 2 * starty + startz);
    const endX = RECIPROCAL_SQRT6 * (SQRT3 * endx - SQRT3 * endz);
    const endY = RECIPROCAL_SQRT6 * (endx + 2 * endy + endz);

    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
  }

  ctx.stroke();
}
