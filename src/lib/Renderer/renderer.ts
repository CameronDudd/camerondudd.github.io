import type { Mesh3D } from "lib/Geometry/geometry";
import { barycentric2, cross3, dot3, norm3, sub3 } from "lib/Vec/vec";

const SQRT3 = Math.sqrt(3);
const RECIPROCAL_SQRT6 = 1 / Math.sqrt(6);

type ColorRGBA = { r: number; g: number; b: number; a: number };

export function drawPixel(x: number, y: number, color: ColorRGBA, imageData: ImageData) {
  const { width, height } = imageData;
  if (x < 0 || x >= width || y < 0 || y >= height) return;
  const i = (Math.floor(y) * width + Math.floor(x)) * 4;
  imageData.data[i] = color.r;
  imageData.data[i + 1] = color.g;
  imageData.data[i + 2] = color.b;
  imageData.data[i + 3] = color.a;
}

export function drawMesh3DOrthographic(canvas: HTMLCanvasElement, mesh: Mesh3D) {
  const ctx = canvas.getContext("2d");
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
  const ctx = canvas.getContext("2d");
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

export function drawFaces3DOrthographic(canvas: HTMLCanvasElement, mesh: Mesh3D) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const zBuff: [number, number][][] = Array.from({ length: canvas.height }, () =>
    Array.from({ length: canvas.width }, () => [0, -Infinity] as [number, number]),
  );

  const lightDir = norm3({ x: 0, y: 0, z: -1 });

  for (const [aIdx, bIdx, cIdx] of mesh.faces) {
    const a = mesh.vertices[aIdx];
    const b = mesh.vertices[bIdx];
    const c = mesh.vertices[cIdx];

    const normal = norm3(cross3(sub3(b, a), sub3(c, a)));

    const brt = Math.max(0, dot3(normal, lightDir));

    const minX = Math.max(0, Math.floor(Math.min(a.x, b.x, c.x)));
    const minY = Math.max(0, Math.floor(Math.min(a.y, b.y, c.y)));
    const maxX = Math.min(canvas.height, Math.ceil(Math.max(a.x, b.x, c.x)));
    const maxY = Math.min(canvas.height, Math.ceil(Math.max(a.y, b.y, c.y)));

    for (let y = minY; y <= maxY; ++y) {
      for (let x = minX; x <= maxX; ++x) {
        const [u, v, w] = barycentric2({ x, y }, a, b, c);
        if (u < 0 || v < 0 || w < 0) continue;

        const z = a.z * u + b.z * v + c.z * w;

        if (z > zBuff[y][x][1]) {
          zBuff[y][x] = [brt, z];
          const brightness = Math.floor(brt * 255);
          const color = {
            r: brightness,
            g: brightness,
            b: brightness,
            a: 0xff,
          };
          drawPixel(x, y, color, imageData);
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
}
