// ===============================
// Portfólio Tech/Neon - script.js
// ===============================

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // 1) Ano automático
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // 2) Menu mobile (hambúrguer)
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

    // Fecha ao clicar em um link (mobile)
    $$("#navLinks a").forEach((a) => {
      a.addEventListener("click", () => closeMenu());
    });

    // Fecha ao clicar fora
    document.addEventListener("click", (e) => {
      const target = e.target;
      const clickedInside =
        navLinks.contains(target) || menuBtn.contains(target);
      if (!clickedInside) closeMenu();
    });

    // Fecha com ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // 3) Bloquear links com aria-disabled="true" (Demo/Código)
  $$('a[aria-disabled="true"]').forEach((a) => {
    a.addEventListener("click", (e) => e.preventDefault());
    a.setAttribute("tabindex", "-1");
    a.style.pointerEvents = "none";
    a.style.opacity = "0.7";
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
    const text = skillText[name] || `Skill selecionada: ${name}`;
    skillInfo.textContent = text;

    chips.forEach((c) => c.classList.remove("selected"));
    if (chipEl) chipEl.classList.add("selected");
  }

  if (chips.length && skillInfo) {
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const name = chip.dataset.skill || chip.textContent.trim();
        setSkill(name, chip);
      });
    });

    // default
    const first = chips[0];
    setSkill(first.dataset.skill || first.textContent.trim(), first);
  }

  // 5) Toast + copiar email
  const copyBtn = $("#copyEmail");
  const emailEl = $("#email");
  const toastEl = $("#toast");

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("show");
    window.setTimeout(() => toastEl.classList.remove("show"), 2200);
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      try {
        const temp = document.createElement("textarea");
        temp.value = text;
        temp.setAttribute("readonly", "");
        temp.style.position = "absolute";
        temp.style.left = "-9999px";
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
        return true;
      } catch {
        return false;
      }
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
      showToast(ok ? "Email copiado!" : "Não consegui copiar. Copie manualmente 🙂");
    });
  }

  // 6) Form (simulação)
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

  // 7) Destaque do link ativo no menu conforme scroll (extra profissa)
  const sections = ["inicio", "sobre", "skills", "projetos", "contato"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const navAnchors = $$("#navLinks a").filter((a) => a.getAttribute("href")?.startsWith("#"));

  function setActiveLink(id) {
    navAnchors.forEach((a) => {
      const href = a.getAttribute("href");
      const isActive = href === `#${id}`;
      a.classList.toggle("active", isActive);
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
})();