<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Shape } from 'lib/Shapes/shapes';

  const { shape, width, height } = $props();

  let canvas: HTMLCanvasElement;
  let scene: Shape;

  onMount(() => {
    canvas.width = width;
    canvas.height = width;
    scene = new Shape(shape, canvas);
    scene.animate();
  });

  onDestroy(() => scene.destroy());
</script>

<canvas bind:this={canvas}></canvas>
