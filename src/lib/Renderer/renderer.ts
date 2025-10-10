import type { Mesh3D } from 'lib/Geometry/geometry';

const SQRT3 = Math.sqrt(3);
const RECIPROCAL_SQRT6 = 1 / Math.sqrt(6);

export function drawMesh3DOrthographic(
  canvas: HTMLCanvasElement,
  mesh: Mesh3D
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.beginPath();
  for (const { start, end } of mesh.edges) {
    const s = mesh.vertices[start];
    const e = mesh.vertices[end];
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(e.x, e.y);
  }
  ctx.stroke();
}

export function drawMesh3DIsometric(canvas: HTMLCanvasElement, mesh: Mesh3D) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.beginPath();
  for (const { start, end } of mesh.edges) {
    const s = mesh.vertices[start];
    const e = mesh.vertices[end];
    const sx = RECIPROCAL_SQRT6 * (SQRT3 * s.x - SQRT3 * s.z);
    const sy = RECIPROCAL_SQRT6 * (s.x + 2 * s.y + s.z);
    const ex = RECIPROCAL_SQRT6 * (SQRT3 * e.x - SQRT3 * e.z);
    const ey = RECIPROCAL_SQRT6 * (e.x + 2 * e.y + e.z);
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
  }
  ctx.stroke();
}
