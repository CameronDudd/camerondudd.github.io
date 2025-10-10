import type { Vec3 } from 'lib/Vec/vec';

export type Edge = { start: number; end: number };

export type Mesh3D = {
  vertices: Vec3[];
  edges: Edge[];
  centroid: Vec3;
};

export function pitchMesh3D(mesh: Mesh3D, theta: number) {
  // https://en.wikipedia.org/wiki/Rotation_matrix
  // [ x']   [      1       0       0  ] [ x ]
  // [ y'] = [      0   cos(t) -sin(t) ] [ y ]
  // [ z']   [      0   sin(t)  cos(t) ] [ z ]
  // x is horizontally across up so pitch keeps x-axis constant
  const cy = mesh.centroid.y;
  const cz = mesh.centroid.z;
  const sinTheta = Math.sin(theta);
  const cosTheta = Math.cos(theta);
  for (const vertex of mesh.vertices) {
    const y = vertex.y - cy;
    const z = vertex.z - cz;
    vertex.y = cosTheta * y - sinTheta * z + cy;
    vertex.z = sinTheta * y + cosTheta * z + cz;
  }
}

export function rollMesh3D(mesh: Mesh3D, theta: number) {
  // https://en.wikipedia.org/wiki/Rotation_matrix
  // [ x']   [  cos(t) -sin(t)      0  ] [ x ]
  // [ y'] = [  sin(t)  cos(t)      0  ] [ y ]
  // [ z']   [      0       0       1  ] [ z ]
  // z is out of the screen roll keeps z-axis constant
  const cx = mesh.centroid.x;
  const cy = mesh.centroid.y;
  const sinTheta = Math.sin(theta);
  const cosTheta = Math.cos(theta);
  for (const vertex of mesh.vertices) {
    const x = vertex.x - cx;
    const y = vertex.y - cy;
    vertex.x = cosTheta * x - sinTheta * y + cx;
    vertex.y = sinTheta * x + cosTheta * y + cy;
  }
}

export function yawMesh3D(mesh: Mesh3D, theta: number) {
  // https://en.wikipedia.org/wiki/Rotation_matrix
  // [ x']   [  cos(t)      0   sin(t) ] [ x ]
  // [ y'] = [      0       1       0  ] [ y ]
  // [ z']   [ -sin(t)      0   cos(t) ] [ z ]
  // y is vertically up so yaw keeps y-axis constant
  const cx = mesh.centroid.x;
  const cz = mesh.centroid.z;
  const sinTheta = Math.sin(theta);
  const cosTheta = Math.cos(theta);
  for (const vertex of mesh.vertices) {
    const x = vertex.x - cx;
    const z = vertex.z - cz;
    vertex.x = cosTheta * x + sinTheta * z + cx;
    vertex.z = -sinTheta * x + cosTheta * z + cz;
  }
}

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
