<script lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
  import Shapes from 'lib/Shapes/Shapes.svelte';
  const socials = [
    { href: 'https://github.com/camerondudd', icon: faGithub },
    { href: 'https://linkedin.com/in/camerondudd', icon: faLinkedin },
  ];
</script>

<main>
  <img src="/images/profile.png" alt="Cameron Dudd" class="profile-picture" />
  <h1>Cameron Dudd</h1>
  <h2>Software Engineer</h2>
  <p class="manifesto">Simple tools</p>
  <div class="socials">
    {#each socials as { href, icon }}
      <a {href} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon {icon} />
      </a>
    {/each}
  </div>
</main>

<style>
  * {
    color: rgb(255, 255, 255);
    margin: 0;
    padding: 0;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  .profile-picture {
    width: 100px;
    height: 100px;
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 1.8rem;
  }

  h2 {
    font-size: 1rem;
    opacity: 0.7;
    margin-bottom: 1rem;
  }

  .manifesto {
    margin: 0.5rem 0 1.5rem;
    opacity: 0.8;
  }

  .socials a {
    color: var(--fg1);
    margin: 0 0.5rem;
    font-size: 1.2rem;
  }

  .socials a:hover {
    color: var(--red);
  }
</style>
