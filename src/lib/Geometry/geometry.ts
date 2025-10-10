import type { Vec3 } from 'lib/Vec/vec';

export type Edge = { start: number; end: number };

export type Mesh3D = {
  vertices: Vec3[];
  edges: Edge[];
  centroid: Vec3;
};

export function cuboidMesh(
  x: number,
  y: number,
  z: number,
  w: number,
  h: number,
  d: number
): Mesh3D {
  const centroid: Vec3 = {
    x: x + w / 2,
    y: y + h / 2,
    z: z + d / 2,
  };
  const vertices: Vec3[] = [
    { x: x, y: y, z: z },
    { x: x + w, y: y, z: z },
    { x: x + w, y: y + h, z: z },
    { x: x, y: y + h, z: z },
    { x: x, y: y, z: z + d },
    { x: x + w, y: y, z: z + d },
    { x: x + w, y: y + h, z: z + d },
    { x: x, y: y + h, z: z + d },
  ];
  const edges: Edge[] = [
    // Back-face
    { start: 0, end: 1 },
    { start: 1, end: 2 },
    { start: 2, end: 3 },
    { start: 3, end: 0 },
    // Face connection
    { start: 0, end: 4 },
    { start: 1, end: 5 },
    { start: 2, end: 6 },
    { start: 3, end: 7 },
    // Front-face
    { start: 4, end: 5 },
    { start: 5, end: 6 },
    { start: 6, end: 7 },
    { start: 7, end: 4 },
  ];

  return { vertices, edges, centroid };
}
