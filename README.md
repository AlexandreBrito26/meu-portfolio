# 🌐 Portfólio v2 — Alexandre Brito

> Portfólio pessoal de desenvolvedor Front-end, construído do zero com HTML, CSS e JavaScript puro.

**[▶ Ver ao vivo](https://meu-portfolio-nine-vert.vercel.app/)** · **[📁 Repositório](https://github.com/AlexandreBrito26/meu-portfolio)**

---

## ✨ Sobre o projeto

Este portfólio foi desenvolvido para apresentar minha trajetória, habilidades e projetos como desenvolvedor Front-end em formação. A versão 2 trouxe uma reformulação visual completa com foco em tipografia, motion e identidade visual coesa.

---

## 🚀 Novidades na v2

- **Tipografia repaginada** — Fontes [Syne](https://fonts.google.com/specimen/Syne) (display) + [Outfit](https://fonts.google.com/specimen/Outfit) (body)
- **Gradiente no título** — Nome com degradê cyan → purple via CSS `background-clip: text`
- **Orbs animados** — Esferas de luz flutuantes no fundo com `@keyframes`
- **Noise texture** — Camada de ruído SVG embutido para profundidade visual
- **Badge "Disponível"** — Ponto verde pulsante indicando status de busca por oportunidades
- **Section labels numeradas** — `01 — Sobre`, `02 — Habilidades`...
- **Scroll reveal** — Animação suave de entrada via `IntersectionObserver`
- **2 projetos em destaque** — One Night in the Code's e Perk Lab DBD com thumbnails animadas customizadas em CSS puro
- **Thumbnails CSS para todos os projetos** — Nenhuma imagem externa necessária *(ver abaixo)*

---

## 🖼️ Thumbnails CSS — sem assets externos

Todos os cards de projeto agora usam **thumbnails geradas inteiramente em CSS**, sem dependência de arquivos de imagem. Cada thumbnail foi desenhada para representar visualmente o projeto:

| Projeto | Thumbnail |
|---------|-----------|
| One Night in the Code's | Dois olhos laranja com glow pulsante + scanlines |
| Perk Lab — DBD | Gancho animado com oscilação + fundo roxo |
| Portfólio pessoal | Avatar "AB" azul + barras pulsantes |
| CalcQuest RPG | ⚔ com glow dourado + título Lendas de Algoritma |
| CalcQuest Website | "RECUPERE A / MATRIZ LÓGICA" em vermelho |
| Controle de Gastos | Card com saldo, gastos e disponível em verde |
| Landing Page Netflix | Logo NETFLIX vermelho + tagline |
| CalcQuest 2 | ★ girando + título dourado |
| CalcPro | Display + grid de botões da calculadora |

Isso elimina a pasta `assets/` e torna o projeto **totalmente autônomo** — basta o `index.html`, `style.css` e `script.js`.

---

## 🗂️ Estrutura

```
portfolio/
├── index.html     # Estrutura e conteúdo
├── style.css      # Design system + thumbnails CSS
└── script.js      # Interações e comportamentos
```

> A pasta `assets/` foi removida — todas as prévias são geradas via CSS puro.

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|------------|-----|
| HTML5 semântico | Estrutura e acessibilidade |
| CSS3 (Flex + Grid + @keyframes) | Layout, animações, thumbnails, design system |
| JavaScript (ES6+) | Interações, filtros, IntersectionObserver |
| Google Fonts | Syne + Outfit |
| Vercel | Deploy e hospedagem |

Sem frameworks, sem dependências externas — 100% vanilla.

---

## 🎨 Design

**Paleta principal**

| Variável | Cor | Uso |
|----------|-----|-----|
| `--bg` | `#060810` | Fundo |
| `--cyan` | `#38bdf8` | Destaque primário |
| `--purple` | `#a855f7` | Destaque secundário |
| `--green` | `#22c55e` | Status / sucesso |
| `--text` | `#eef0f5` | Texto principal |

**Fontes**

- **Syne 800** — Títulos, logo, labels
- **Outfit 400/600** — Corpo do texto

---

## 📦 Projetos exibidos

| Projeto | Tags | Link |
|---------|------|------|
| One Night in the Code's | HTML • CSS • JS | [Demo](https://one-night-in-the-code.vercel.app/) |
| Perk Lab — DBD Build Maker | HTML • CSS • JS | [Demo](https://perk-lab-dbd.vercel.app/) |
| Portfólio pessoal | HTML • CSS • JS | [Demo](https://meu-portfolio-nine-vert.vercel.app/) |
| CalcQuest RPG | HTML • CSS • JS | [Demo](https://calc-quest-rpg-lendas-de-algoritma.vercel.app/) |
| CalcQuest Website | HTML • CSS • JS | [Demo](https://calcquestwebsite.netlify.app/) |
| Controle de Gastos (Vale Card) | HTML • CSS • JS | [Demo](https://controle-de-gastos-com-vale-card.vercel.app/) |
| Landing Page Netflix | HTML • CSS | [Demo](https://landing-page-netflix-zeta.vercel.app/) |
| CalcQuest 2 | HTML • CSS • JS | [Demo](https://calc-quest2.vercel.app/) |
| CalcPro | HTML • CSS • JS | [Demo](https://calc-pro-bay.vercel.app/) |

---

## ⚙️ Como usar localmente

```bash
# Clone o repositório
git clone https://github.com/AlexandreBrito26/meu-portfolio.git

# Entre na pasta
cd meu-portfolio

# Abra no navegador
# Live Server no VS Code ou qualquer servidor local
```

Não há build step, bundler ou instalação de dependências. Basta abrir o `index.html`.

---

## 📬 Contato

- **Email:** alexandrebritoprofissional@gmail.com
- **LinkedIn:** [alexandre-brito-b6a7071b2](https://www.linkedin.com/in/alexandre-brito-b6a7071b2/)
- **GitHub:** [@AlexandreBrito26](https://github.com/AlexandreBrito26)

---

<p align="center">Feito com HTML, CSS e JS · Minas Gerais, Brasil · 2026</p>
