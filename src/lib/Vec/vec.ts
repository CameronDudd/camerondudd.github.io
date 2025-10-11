export type Vec2 = { x: number; y: number };
export type Vec3 = { x: number; y: number; z: number };

export function add3(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

export function sub3(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

export function dot3(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y + b.y + a.z * b.z;
}

export function cross3(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

export function norm3(v: Vec3): Vec3 {
  const len = Math.sqrt(dot3(v, v));
  return { x: v.x / len, y: v.y / len, z: v.z / len };
}
