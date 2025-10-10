<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Scene } from 'lib/Shapes/shapes';

  let canvas: HTMLCanvasElement;
  let scene: Scene;

  onMount(() => {
    scene = new Scene(canvas);
    scene.animate();
  });

  onDestroy(() => scene.destroy());
</script>

<canvas bind:this={canvas}></canvas>

<style>
  canvas {
    background: #0000;
  }
</style>
