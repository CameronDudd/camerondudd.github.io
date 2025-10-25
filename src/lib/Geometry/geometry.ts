import type { Vec3 } from 'lib/Vec/vec';

const TWO_PI = 2 * Math.PI;

export type Edge = { start: number; end: number };
export type Face = [number, number, number];

export type Mesh3D = {
  vertices: Vec3[];
  edges: Edge[];
  faces: Face[];
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
  cx: number,
  cy: number,
  cz: number,
  w: number,
  h: number,
  d: number
): Mesh3D {
  const centroid: Vec3 = { x: cx, y: cy, z: cz };
  const vertices: Vec3[] = [
    { x: cx - w / 2, y: cy - h / 2, z: cz - d / 2 },
    { x: cx + w / 2, y: cy - h / 2, z: cz - d / 2 },
    { x: cx + w / 2, y: cy + h / 2, z: cz - d / 2 },
    { x: cx - w / 2, y: cy + h / 2, z: cz - d / 2 },
    { x: cx - w / 2, y: cy - h / 2, z: cz + d / 2 },
    { x: cx + w / 2, y: cy - h / 2, z: cz + d / 2 },
    { x: cx + w / 2, y: cy + h / 2, z: cz + d / 2 },
    { x: cx - w / 2, y: cy + h / 2, z: cz + d / 2 },
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

  const faces: Face[] = [
    // Back face
    [0, 3, 2],
    [2, 1, 0],
    // Left face
    [4, 7, 3],
    [3, 0, 4],
    // Right face
    [5, 6, 2],
    [2, 1, 5],
    // Top face
    [7, 3, 2],
    [2, 6, 7],
    // Bottom face
    [4, 0, 1],
    [1, 5, 4],
    // Front face
    [4, 7, 6],
    [6, 5, 4],
  ];

  return { vertices, edges, faces, centroid };
}

export function pyramidMesh(
  cx: number,
  cy: number,
  cz: number,
  w: number,
  d: number,
  h: number
): Mesh3D {
  const centroid: Vec3 = {
    x: cx,
    y: cy,
    z: cz,
  };
  const vertices: Vec3[] = [
    { x: cx - w / 2, y: cy - h / 2, z: cz - d / 2 },
    { x: cx + w / 2, y: cy - h / 2, z: cz - d / 2 },
    { x: cx + w / 2, y: cy - h / 2, z: cz + d / 2 },
    { x: cx - w / 2, y: cy - h / 2, z: cz + d / 2 },
    { x: cx, y: cy + h / 2, z: cz },
  ];
  const edges: Edge[] = [
    // Floor-face
    { start: 0, end: 1 },
    { start: 1, end: 2 },
    { start: 2, end: 3 },
    { start: 3, end: 0 },
    // Peak-faces
    { start: 0, end: 4 },
    { start: 1, end: 4 },
    { start: 2, end: 4 },
    { start: 3, end: 4 },
  ];
  const faces: Face[] = [];
  return { vertices, edges, faces, centroid };
}

export function sphereMesh(
  cx: number,
  cy: number,
  cz: number,
  r: number,
  n: number
): Mesh3D {
  const centroid: Vec3 = { x: cx, y: cy, z: cz };
  const vertices: Vec3[] = [{ x: cx, y: cy + r, z: cz }];
  const edges: Edge[] = [];
  const faces: Face[] = [];
  for (let latStep = 1; latStep < n; ++latStep) {
    for (let lonStep = 0; lonStep < n; ++lonStep) {
      const lat = Math.PI * (latStep / n);
      const lon = TWO_PI * (lonStep / n);
      vertices.push({
        x: cx + r * Math.sin(lat) * Math.cos(lon),
        y: cy + r * Math.cos(lat),
        z: cz + r * Math.sin(lat) * Math.sin(lon),
      });

      // Longitude edges
      edges.push({
        start: (latStep - 1) * n + lonStep + 1,
        end: (latStep - 1) * n + ((lonStep + 1) % n) + 1,
      });

      // Latitude edges
      if (latStep == 1) {
        edges.push({ start: 0, end: lonStep + 1 });
      } else {
        edges.push({
          start: (latStep - 2) * n + lonStep + 1,
          end: (latStep - 1) * n + lonStep + 1,
        });
      }
    }
  }
  vertices.push({ x: cx, y: cy - r, z: cz });
  for (let i = 0; i < n; ++i) {
    edges.push({
      start: (n - 2) * n + i + 1,
      end: vertices.length - 1,
    });
  }
  return { vertices, edges, faces, centroid };
}

export function torusMesh(
  cx: number,
  cy: number,
  cz: number,
  r: number,
  R: number,
  n: number
): Mesh3D {
  const centroid: Vec3 = { x: cx, y: cy, z: cz };
  const vertices: Vec3[] = [];
  const edges: Edge[] = [];
  const faces: Face[] = [];
  for (let outer = 0; outer < n; ++outer) {
    for (let inner = 0; inner < n; ++inner) {
      const outerTheta = TWO_PI * (outer / n);
      const innerTheta = TWO_PI * (inner / n);
      vertices.push({
        x: cx + (R + r * Math.cos(innerTheta)) * Math.cos(outerTheta),
        y: cy + (R + r * Math.cos(innerTheta)) * Math.sin(outerTheta),
        z: cz + r * Math.sin(innerTheta),
      });

      // inner circles
      edges.push({
        start: outer * n + inner,
        end: outer * n + ((inner + 1) % n),
      });

      // outer lines
      edges.push({
        start: outer * n + inner,
        end: ((outer + 1) % n) * n + inner,
      });
    }
  }
  return { vertices, edges, faces, centroid };
}
