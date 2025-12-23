const texts = [
  "Projetos reais desenvolvidos",
  "Social media estratégico",
  "Tráfego pago"
];

const animatedText = document.getElementById("animated-text");
let index = 0;

// estado inicial
animatedText.classList.add("opacity-100", "translate-y-0");

setInterval(() => {
  // saída: sobe e some
  animatedText.classList.remove("opacity-100", "translate-y-0");
  animatedText.classList.add("opacity-0", "-translate-y-6");

  setTimeout(() => {
    // troca o texto
    index = (index + 1) % texts.length;
    animatedText.textContent = texts[index];

    // prepara entrada (vem de baixo invisível)
    animatedText.classList.remove("-translate-y-6");
    animatedText.classList.add("translate-y-6");

    // força reflow para aplicar corretamente
    animatedText.offsetHeight;

    // entrada: sobe suavemente e aparece
    animatedText.classList.remove("opacity-0", "translate-y-6");
    animatedText.classList.add("opacity-100", "translate-y-0");
  }, 600);

}, 3000);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

const counters = document.querySelectorAll(".counter");

const animateCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  const duration = 1500;
  const startTime = performance.now();

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const value = Math.floor(progress * target);
    counter.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = target;
    }
  };

  requestAnimationFrame(update);
};

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => {
  observer.observe(counter);
});
