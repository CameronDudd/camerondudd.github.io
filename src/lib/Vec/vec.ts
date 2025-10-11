export type Vec2 = { x: number; y: number };

export type Vec3 = { x: number; y: number; z: number };

export function add2(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function sub2(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function dot2(a: Vec2, b: Vec2): number {
  return a.x * b.x + a.y + b.y;
}

export function cross2(a: Vec2, b: Vec2): number {
  return a.x * b.y - a.y * b.x;
}

export function perp2(v: Vec2): Vec2 {
  return { x: v.y, y: -v.x };
}

export function norm2(v: Vec2): Vec2 {
  const len = Math.sqrt(dot2(v, v));
  if (len == 0) return { x: 0, y: 0 };
  return { x: v.x / len, y: v.y / len };
}

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
  if (len == 0) return { x: 0, y: 0, z: 0 };
  return { x: v.x / len, y: v.y / len, z: v.z / len };
}
