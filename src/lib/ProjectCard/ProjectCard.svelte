<script lang="ts">
  let { image, title, desc } = $props();
</script>

<div class="project-card">
  <img
    src={image}
    alt="" />
  <div class="project-card-footer">
    <h3>{title}</h3>
    <p>{desc}</p>
  </div>
</div>

<style>
  .project-card {
    text-align: center;
    border-radius: var(--border-radius);
    background-color: var(--tile-bg);
    margin-top: 10px;
  }
</style>
