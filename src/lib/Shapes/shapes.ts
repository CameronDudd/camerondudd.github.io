import {
  Mesh3D,
  cuboidMesh,
  pitchMesh3D,
  pyramidMesh,
  rollMesh3D,
  sphereMesh,
  yawMesh3D,
} from 'lib/Geometry/geometry';
import { drawMesh3DOrthographic } from 'lib/Renderer/renderer';

export class Scene {
  private width: number = 500;
  private height: number = 180;
  private ctx: CanvasRenderingContext2D;
  private meshes: Mesh3D[];
  private animationId: number;

  constructor(private canvas: HTMLCanvasElement) {
    canvas.width = this.width;
    canvas.height = this.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get ctx');
    this.ctx = ctx;

    this.meshes = [
      cuboidMesh(40, 40, 0, 100, 100, 100),
      pyramidMesh(200, 40, 0, 100, 100, 100),
      sphereMesh(400, 90, 0, 60, 12),
    ];

    this.animate = this.animate.bind(this);
  }

  destroy() {
    cancelAnimationFrame(this.animationId);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const mesh of this.meshes) {
      pitchMesh3D(mesh, Math.PI / 180);
      rollMesh3D(mesh, Math.PI / 180);
      yawMesh3D(mesh, Math.PI / 180);
      drawMesh3DOrthographic(this.canvas, mesh);
    }
    this.animationId = requestAnimationFrame(this.animate);
  }
}
