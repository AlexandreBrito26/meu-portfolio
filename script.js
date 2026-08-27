// ===============================
// Portfólio v2 - script.js
// ===============================

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // 1) Ano automático
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // 2) Menu mobile
  const menuBtn = $("#menuBtn");
  const navLinks = $("#navLinks");

  function closeMenu() {
    if (!navLinks || !menuBtn) return;
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Abrir menu");
  }

  function toggleMenu() {
    if (!navLinks || !menuBtn) return;
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", toggleMenu);
    $$("#navLinks a").forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) closeMenu();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  }

  // 3) Bloquear links desabilitados
  $$('a[aria-disabled="true"]').forEach((a) => {
    a.addEventListener("click", (e) => e.preventDefault());
    a.setAttribute("tabindex", "-1");
    a.style.pointerEvents = "none";
    a.style.opacity = "0.6";
  });

  // 4) Skills interativas
  const skillInfo = $("#skillInfo");
  const chips = $$(".chip");

  const skillText = {
    HTML: "Estrutura semântica, acessibilidade básica, boas práticas e organização do conteúdo.",
    CSS: "Layout responsivo (Flex/Grid), estilos modernos, componentes e foco em manutenção do código.",
    JavaScript: "DOM, eventos, lógica, interações e funcionalidades que deixam o projeto vivo.",
    "Git/GitHub": "Versionamento, commits consistentes e publicação de projetos com README.",
    Responsivo: "Mobile-first, media queries e adaptação real para diferentes tamanhos de tela."
  };

  function setSkill(name, chipEl) {
    if (!skillInfo) return;
    skillInfo.textContent = skillText[name] || `Skill selecionada: ${name}`;
    chips.forEach((c) => c.classList.remove("selected"));
    if (chipEl) chipEl.classList.add("selected");
  }

  if (chips.length && skillInfo) {
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        setSkill(chip.dataset.skill || chip.textContent.trim(), chip);
      });
    });
    const first = chips[0];
    setSkill(first.dataset.skill || first.textContent.trim(), first);
  }

  // 5) Copiar email + Toast
  const copyBtn = $("#copyEmail");
  const emailEl = $("#email");
  const toastEl = $("#toast");

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("show");
    window.setTimeout(() => toastEl.classList.remove("show"), 2400);
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      try {
        const temp = document.createElement("textarea");
        temp.value = text;
        temp.style.position = "absolute";
        temp.style.left = "-9999px";
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
        return true;
      } catch { return false; }
    }
  }

  if (copyBtn && emailEl) {
    copyBtn.addEventListener("click", async () => {
      const email = emailEl.textContent.trim();
      if (!email || email.includes("exemplo.com")) {
        showToast("Troque o email de exemplo pelo seu email real 🙂");
        return;
      }
      const ok = await copyToClipboard(email);
      showToast(ok ? "Email copiado! ✅" : "Não consegui copiar. Copie manualmente 🙂");
    });
  }

  // 6) Form simulação
  const form = $("#form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = form.elements.namedItem("nome")?.value?.trim() || "";
      const msg = form.elements.namedItem("msg")?.value?.trim() || "";
      if (nome.length < 2 || msg.length < 5) {
        showToast("Preencha nome e mensagem corretamente 🙂");
        return;
      }
      showToast(`Mensagem pronta, ${nome}! (simulação) ✅`);
      form.reset();
    });
  }

  // 7) Active link ao scrollar
  const sections = ["inicio", "sobre", "skills", "projetos", "contato"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const navAnchors = $$("#navLinks a").filter((a) => a.getAttribute("href")?.startsWith("#"));

  function setActiveLink(id) {
    navAnchors.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
    });
  }

  if (sections.length && navAnchors.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveLink(visible.target.id);
      },
      { root: null, threshold: [0.25, 0.45, 0.65] }
    );
    sections.forEach((sec) => observer.observe(sec));
  }

  // 8) Filtro de projetos — usa data-tags no article
  const filterBtns = $$(".filter-btn");
  const projectCards = $$(".project:not(.ghost)");

  if (filterBtns.length > 0 && projectCards.length > 0) {
    const counts = { "Todos": projectCards.length, "HTML": 0, "CSS": 0, "JS": 0, "TypeScript": 0, "React Native": 0 };

    projectCards.forEach(card => {
      const tags = card.dataset.tags || card.querySelector(".project-tags")?.textContent || "";
      if (tags.includes("HTML")) counts["HTML"]++;
      if (tags.includes("CSS")) counts["CSS"]++;
      if (tags.includes("JS")) counts["JS"]++;
      if (tags.includes("TypeScript")) counts["TypeScript"]++;
      if (tags.includes("React Native")) counts["React Native"]++;
    });

    Object.keys(counts).forEach(key => {
      const el = document.getElementById(`count-${key}`);
      if (el) el.textContent = counts[key];
    });

    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.getAttribute("data-filter");

        projectCards.forEach(card => {
          const tags = card.dataset.tags || card.querySelector(".project-tags")?.textContent || "";
          const match = f === "Todos" || tags.includes(f);
          if (match) {
            card.classList.remove("hidden");
            setTimeout(() => card.classList.remove("hiding"), 10);
          } else {
            card.classList.add("hiding");
            setTimeout(() => { if (card.classList.contains("hiding")) card.classList.add("hidden"); }, 300);
          }
        });
      });
    });
  }

  // 9) Scroll reveal suave
  const revealEls = $$(".section, .card");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  revealEls.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";
    el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
    revealObserver.observe(el);
  });

  // 10) Tags dos projetos viram chips coloridos
  $$(".project-tags").forEach(tagsEl => {
    const raw = tagsEl.textContent;
    const parts = raw.split("•").map(t => t.trim()).filter(Boolean);
    if (!parts.length) return;
    tagsEl.innerHTML = parts
      .map(p => `<span class="tag-chip tag-${p.replace(/\s+/g, "")}">${p}</span>`)
      .join("");
  });

  // 11) Tilt 3D + glow que segue o cursor nos cards de projeto
  const tiltCards = $$(".project:not(.ghost)");
  const maxTilt = 6; // graus

  tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      card.style.setProperty("--mx", `${px * 100}%`);
      card.style.setProperty("--my", `${py * 100}%`);
      card.style.setProperty("--rx", `${(0.5 - py) * maxTilt}deg`);
      card.style.setProperty("--ry", `${(px - 0.5) * maxTilt}deg`);
      card.classList.add("tilt");
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("tilt");
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });

})();
