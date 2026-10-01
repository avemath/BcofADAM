/**
 * Phone carousels: a row of cards you swipe through, with dots under it. Any element with
 * `data-carousel` (holding a `data-carousel-track` row and `data-to` dot buttons) gets this.
 * Used by the numbers and the "anywhere" cards on the home page.
 */
  // On phones the three facts are a row you swipe through. The dots show which one you're on,
  // and tapping a dot slides to it. On bigger screens the facts sit side by side and this does nothing.
  for (const box of document.querySelectorAll<HTMLElement>('[data-carousel]')) {
    const track = box.querySelector<HTMLElement>('[data-carousel-track]');
    if (!track) continue;
    const items = [...track.children] as HTMLElement[];
    const dots = [...box.querySelectorAll<HTMLButtonElement>('[data-to]')];
    const phone = window.matchMedia('(max-width: 759px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const start = (i: number) => items[i].offsetLeft - items[0].offsetLeft;
    const update = () => {
      let on = 0;
      items.forEach((_, i) => {
        if (Math.abs(start(i) - track.scrollLeft) < Math.abs(start(on) - track.scrollLeft)) on = i;
      });
      dots.forEach((d, i) => d.setAttribute('aria-current', String(i === on)));
    };
    dots.forEach((d) =>
      d.addEventListener('click', () => {
        track.scrollTo({ left: start(Number(d.dataset.to)), behavior: calm.matches ? 'auto' : 'smooth' });
      }),
    );
    let frame = 0;
    track.addEventListener(
      'scroll',
      () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(update);
      },
      { passive: true },
    );
    // Keyboard users can scroll the row with the arrow keys once it is a row.
    const sync = () => {
      if (phone.matches) track.tabIndex = 0;
      else track.removeAttribute('tabindex');
      update();
    };
    phone.addEventListener('change', sync);
    sync();
  }
