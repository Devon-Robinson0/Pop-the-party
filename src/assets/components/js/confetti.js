(() => {
  const sections = document.querySelectorAll(".confetti-section");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!sections.length) return;

  const colours = ["#ef67ac", "#ffd447", "#48c9cc", "#b88ae0"];

  const settings = {
    density: 5500, // Higher number = fewer pieces
    speed: 9, // Falling speed in pixels per second
    opacity: 0.45,
  };

  const layers = Array.from(sections, (section) => {
    const canvas = document.createElement("canvas");
    canvas.className = "confetti-canvas";
    canvas.setAttribute("aria-hidden", "true");
    section.prepend(canvas);

    return {
      section,
      canvas,
      context: canvas.getContext("2d"),
      particles: [],
      width: 0,
      height: 0,
      ratio: 0,
    };
  }).filter((layer) => layer.context);

  function resize(layer, width, height) {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    if (
      layer.width === width &&
      layer.height === height &&
      layer.ratio === ratio
    )
      return;

    layer.width = width;
    layer.height = height;
    layer.ratio = ratio;

    layer.canvas.width = Math.round(width * ratio);
    layer.canvas.height = Math.round(height * ratio);
    layer.canvas.style.height = `${height}px`;
    layer.context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const count = Math.ceil(
      (width * layer.section.offsetHeight) / settings.density,
    );

    while (layer.particles.length < count) {
      layer.particles.push({
        x: Math.random(),
        y: Math.random(),
        size: 3 + Math.random() * 6,
        speed: 0.6 + Math.random() * 0.8,
        angle: Math.random() * Math.PI * 2,
        colour: colours[Math.floor(Math.random() * colours.length)],
        round: Math.random() > 0.7,
      });
    }

    layer.particles.length = count;
  }

  function wrap(value, limit) {
    return ((value % limit) + limit) % limit;
  }

  let animationId;
  let previousTime = 0;
  let elapsed = 0;

  function animate(time) {
    const delta = previousTime
      ? Math.min((time - previousTime) / 1000, 0.05)
      : 0;

    previousTime = time;
    elapsed += delta;

    for (const layer of layers) {
      const rect = layer.section.getBoundingClientRect();

      if (rect.bottom <= 0 || rect.top >= window.innerHeight || rect.width <= 0)
        continue;

      // Keep the canvas within the section's visible area.
      const top = Math.max(0, -rect.top);
      const bottom = Math.min(rect.height, window.innerHeight - rect.top);

      const height = Math.ceil(bottom - top);
      const width = Math.ceil(rect.width);

      if (height <= 0) continue;

      layer.canvas.style.top = `${top}px`;
      resize(layer, width, height);

      const ctx = layer.context;
      ctx.clearRect(0, 0, width, height);

      // A viewport-sized field avoids a huge canvas on long pages.
      const fieldHeight = rect.height + 60;

      for (const particle of layer.particles) {
        const x =
          particle.x * width + Math.sin(elapsed * 0.3 + particle.angle) * 12;

        const pageY =
          wrap(
            particle.y * fieldHeight +
              elapsed * settings.speed * particle.speed,
            fieldHeight,
          ) - 30;

        const y = pageY - top;

        // Fade gently near the visible area's edges.
        const fade = Math.max(0, Math.min(1, y / 45, (height - y) / 45));

        if (fade === 0) continue;

        ctx.save();
        ctx.globalAlpha = settings.opacity * fade;
        ctx.fillStyle = particle.colour;
        ctx.translate(x, y);
        ctx.rotate(particle.angle + elapsed * 0.2);

        if (particle.round) {
          ctx.beginPath();
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(
            -particle.size / 2,
            -particle.size / 4,
            particle.size,
            particle.size / 2,
          );
        }

        ctx.restore();
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  function updateMotion() {
    cancelAnimationFrame(animationId);
    previousTime = 0;

    if (!reducedMotion.matches && !document.hidden) {
      animationId = requestAnimationFrame(animate);
    }
  }

  reducedMotion.addEventListener("change", updateMotion);
  document.addEventListener("visibilitychange", updateMotion);
  updateMotion();
})();
