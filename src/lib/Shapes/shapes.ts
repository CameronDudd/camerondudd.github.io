import { Mesh3D, cuboidMesh, pitchMesh3D, pyramidMesh, rollMesh3D, sphereMesh, torusMesh, yawMesh3D } from 'lib/Geometry/geometry';
import { drawMesh3DOrthographic } from 'lib/Renderer/renderer';

export class Shape {
  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;
  private mesh: Mesh3D;
  private animationId: number;

  constructor(
    private shape: string,
    private canvas: HTMLCanvasElement
  ) {
    this.width = canvas.width;
    this.height = canvas.height;

    const maxSize = Math.min(this.width, this.height);
    const halfMaxSize = maxSize / 2;
    const cx = this.width / 2;
    const cy = this.height / 2;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get ctx');
    this.ctx = ctx;

    switch (shape) {
      case 'cube': {
        this.mesh = cuboidMesh(cx, cy, 0, halfMaxSize, halfMaxSize, halfMaxSize);
        break;
      }
      case 'pyramid': {
        this.mesh = pyramidMesh(cx, cy, 0, cx, cx, cx);
        break;
      }
      case 'sphere': {
        this.mesh = sphereMesh(cx, cy, 0, 0.9 * halfMaxSize, 30);
        break;
      }
      case 'torus': {
        const n = 3;
        const r = (0.9 * maxSize) / (2 * (n + 1));
        const R = (n * 0.9 * maxSize) / (2 * (n + 1));
        this.mesh = torusMesh(cx, cy, 0, r, R, 20);
      }
    }

    this.animate = this.animate.bind(this);
  }

  destroy() {
    cancelAnimationFrame(this.animationId);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    pitchMesh3D(this.mesh, Math.PI / 180);
    rollMesh3D(this.mesh, Math.PI / 180);
    yawMesh3D(this.mesh, Math.PI / 180);
    drawMesh3DOrthographic(this.canvas, this.mesh);
    this.animationId = requestAnimationFrame(this.animate);
  }
}
