<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

  const socials = [
    { href: 'https://github.com/camerondudd', icon: faGithub },
    { href: 'https://linkedin.com/in/camerondudd', icon: faLinkedin },
  ];

  const projects = [
    { name: 'dot-matrix', href: 'https://github.com/CameronDudd/dot-matrix' },
    { name: 'elegoo-tumbller', href: 'https://github.com/CameronDudd/elegoo-tumbller' },
    { name: 'chess-engine', href: 'https://github.com/CameronDudd/chess-engine' },
  ];

  const sections = ['home', 'projects'];
  let activeSection = 0;

  function scrollToSection(idx: number) {
    document.getElementById(sections[idx])?.scrollIntoView({ behavior: 'smooth' });
  }

  let scroller: HTMLElement | null = null;

  function onScroll() {
    if (!scroller) return;
    const scrollY = scroller.scrollTop;
    const vh = window.innerHeight;
    activeSection = Math.round(scrollY / vh);
  }

  onMount(() => {
    scroller = document.getElementById('scroll-container');
    scroller?.addEventListener('scroll', onScroll, { passive: true });
  });

  onDestroy(() => scroller?.removeEventListener('scroll', onScroll));
</script>

<div class="dots">
  {#each sections as _, idx}
    <button
      type="button"
      class:active={idx === activeSection}
      on:click={() => scrollToSection(idx)}
      aria-label="goto section"></button>
  {/each}
</div>

<div
  id="scroll-container"
  class="scroll-container">
  <section
    id="home"
    class="panel">
    <img
      src="/images/profile.png"
      alt="Cameron Dudd"
      class="profile-picture" />
    <h1>Cameron Dudd</h1>
    <h2>Software Engineer</h2>
    <div class="socials">
      {#each socials as { href, icon }}
        <a
          {href}
          target="_blank"
          rel="noopener noreferrer">
          <FontAwesomeIcon {icon} />
        </a>
      {/each}
    </div>
  </section>

  <section
    id="projects"
    class="panel projects-section">
    <h1>Projects</h1>
    <div class="project-list">
      {#each projects as { name, href }}
        <a
          class="project-item"
          {href}
          target="_blank"
          rel="noopener noreferrer">
          <span class="project-name">{name}</span>
          <span class="project-arrow">-></span>
        </a>
      {/each}
    </div>
  </section>
</div>

<style>
  * {
    color: rgb(255, 255, 255);
    margin: 0;
    box-sizing: border-box;
  }

  .scroll-container {
    height: 100vh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .scroll-container::-webkit-scrollbar {
    display: none;
  }

  .dots {
    position: fixed;
    right: 20px;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }

  .dots button {
    width: 10px;
    aspect-ratio: 1;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: background 0.2s;
  }

  .dots button.active {
    background: #fff;
  }

  .dots button:hover {
    background: #fff;
  }

  .panel {
    scroll-snap-align: start;
    height: 100svh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .profile-picture {
    width: 100px;
    height: 100px;
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
  }

  a {
    text-decoration: none;
  }

  .socials a {
    color: var(--fg1);
    margin: 0 0.5rem;
    font-size: 1.2rem;
  }

  .socials a:hover {
    color: var(--red);
  }

  .projects-section {
    padding: 2rem 1.5rem;
    align-items: center;
  }

  .project-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: min(500px, 90vw);
  }

  .project-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.9rem 1.1rem;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(4px);
    transition:
      background 0.2s,
      transform 0.2s;
    text-decoration: none;
    color: var(--fg1);
  }

  .project-item:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateX(4px);
  }

  .project-arrow {
    opacity: 0.5;
    transition:
      opacity 0.2s,
      transform 0.2s;
  }

  .project-item:hover .project-arrow {
    opacity: 1;
    transform: translateX(4px);
  }

  #projects h1 {
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 2rem;
    color: var(--purple);
    align-self: center;
  }

  h1 {
    font-size: 1.8rem;
    font-weight: 600;
  }

  h2 {
    font-size: 1rem;
    opacity: 0.7;
    margin-bottom: 1rem;
  }
</style>
