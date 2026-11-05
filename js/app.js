(function () {
  const S = window.SITE, CATS = window.CATEGORIES, PRODUCTS = window.PRODUCTS;
  const $ = (s) => document.querySelector(s);
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const norm = (t) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const catName = (id) => (CATS.find((c) => c.id === id) || {}).name || "";
  const wa = (msg) => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`;
  const productMsg = (p) => `Olá! Vi o produto ${p.name} no site da Larissa Presentes e gostaria de saber mais informações sobre disponibilidade e valor.`;
  const GENERIC_MSG = "Olá! Estou vendo o site da Larissa Presentes e gostaria de ajuda para escolher um presente.";

  let activeCat = "todos", query = "";

  /* Links gerais de WhatsApp */
  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href = wa(GENERIC_MSG); a.target = "_blank"; a.rel = "noopener";
  });
  $("#instaBtn").href = S.instagramUrl;
  $("#year").textContent = new Date().getFullYear();

  /* Hero com foto, se configurada */
  if (S.heroImage) {
    $("#heroArt").innerHTML = `<img src="${esc(S.heroImage)}" alt="Produtos da Larissa Presentes" fetchpriority="high">`;
  }

  /* Imagem ou placeholder */
  function media(p, eager) {
    if (p.images && p.images.length) {
      return `<img src="${esc(p.images[0])}" alt="${esc(p.name)}" loading="${eager ? "eager" : "lazy"}" decoding="async" width="600" height="600">`;
    }
    return `<div class="ph" aria-hidden="true"><div><b>LP</b>foto em breve</div></div>`;
  }

  function priceHtml(p) {
    if (S.showPrices && p.price != null) return `<div class="price">${money(p.price)}<small>valor do catálogo, sujeito a confirmação</small></div>`;
    return `<p class="ask">Valor sob consulta</p>`;
  }
  const ctaLabel = (p) => (S.showPrices && p.price != null ? "Pedir pelo WhatsApp" : "Consultar disponibilidade e valor");

  function card(p, i) {
    return `<article class="card" style="animation-delay:${Math.min(i, 8) * 40}ms">
      <button class="card__media" data-open="${p.id}" aria-label="Ver detalhes de ${esc(p.name)}">
        ${media(p)}${p.featured ? '<span class="tag">Destaque</span>' : ""}
      </button>
      <div class="card__body">
        <span class="card__cat">${esc(catName(p.category))}</span>
        <h3><button data-open="${p.id}">${esc(p.name)}</button></h3>
        ${priceHtml(p)}
        <div class="card__act"><a class="btn btn--wa" style="width:100%" target="_blank" rel="noopener" href="${wa(productMsg(p))}">${ctaLabel(p)}</a></div>
      </div></article>`;
  }

  /* Categorias */
  $("#cats").innerHTML = CATS.map((c, i) => {
    const n = PRODUCTS.filter((p) => p.category === c.id).length;
    return `<button class="cat" data-cat="${c.id}"><span class="cat__n">0${i + 1}</span>
      <span><h3>${esc(c.name)}</h3><p>${esc(c.desc)}</p><span class="cat__go">Ver ${n} produto${n > 1 ? "s" : ""} →</span></span></button>`;
  }).join("");

  /* Destaques */
  const featured = PRODUCTS.filter((p) => p.featured);
  if (featured.length) $("#featuredGrid").innerHTML = featured.slice(0, 4).map(card).join("");
  else $("#destaques").hidden = true;

  /* Filtros (só quando há produtos suficientes) */
  const chips = $("#chips");
  chips.innerHTML = [{ id: "todos", name: "Todos" }, ...CATS].map((c) =>
    `<button class="chip" data-chip="${c.id}" aria-pressed="${c.id === "todos"}">${esc(c.name)}</button>`).join("");

  function render() {
    const q = norm(query.trim());
    const list = PRODUCTS.filter((p) =>
      (activeCat === "todos" || p.category === activeCat) && (!q || norm(p.name).includes(q)));
    $("#grid").innerHTML = list.length ? list.map(card).join("")
      : `<p class="empty">Nenhum produto encontrado${q ? ` para “${esc(query)}”` : ""}.<br>Quer algo diferente? <a href="${wa(GENERIC_MSG)}" target="_blank" rel="noopener"><u>Fale com a gente no WhatsApp</u></a>.</p>`;
    $("#count").textContent = `${list.length} produto${list.length === 1 ? "" : "s"}`;
    chips.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", c.dataset.chip === activeCat));
  }

  function setCat(id, scroll) {
    activeCat = id; render();
    if (scroll) $("#produtos").scrollIntoView({ behavior: "smooth" });
  }

  chips.addEventListener("click", (e) => { const b = e.target.closest("[data-chip]"); if (b) setCat(b.dataset.chip); });
  $("#cats").addEventListener("click", (e) => { const b = e.target.closest("[data-cat]"); if (b) setCat(b.dataset.cat, true); });
  $("#search").addEventListener("input", (e) => { query = e.target.value; render(); });

  /* Modal de produto */
  const modal = $("#modal");
  function openProduct(id) {
    const p = PRODUCTS.find((x) => x.id === +id); if (!p) return;
    const imgs = p.images || [];
    const gallery = imgs.length
      ? `<div class="gal__main"><img id="gMain" src="${esc(imgs[0])}" alt="${esc(p.name)}"></div>` +
        (imgs.length > 1 ? `<div class="gal__thumbs">${imgs.map((s, i) => `<button data-img="${i}" aria-label="Foto ${i + 1}" aria-current="${i === 0}"><img src="${esc(s)}" alt=""></button>`).join("")}</div>` : "")
      : `<div class="gal__main"><div class="ph"><div><b>LP</b>foto em breve</div></div></div>`;
    const det = (p.details || []).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("");
    $("#mBody").innerHTML = `<div class="gal">${gallery}</div>
      <div class="m__info"><span class="card__cat">${esc(catName(p.category))}</span>
        <h2 id="mTitle">${esc(p.name)}</h2><p>${esc(p.description)}</p>
        ${det ? `<dl>${det}</dl>` : ""}${priceHtml(p)}
        <a class="btn btn--wa" target="_blank" rel="noopener" href="${wa(productMsg(p))}">${ctaLabel(p)}</a>
        <p class="m__note">Disponibilidade, personalização, pagamento e entrega combinados pelo WhatsApp.</p></div>`;
    modal.showModal();
    modal.querySelectorAll("[data-img]").forEach((b) => b.addEventListener("click", () => {
      $("#gMain").src = imgs[+b.dataset.img];
      modal.querySelectorAll("[data-img]").forEach((x) => x.setAttribute("aria-current", x === b));
    }));
  }
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-open]"); if (b) openProduct(b.dataset.open); });
  $("#mClose").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

  /* Depoimentos */
  if (S.testimonials.length) {
    $("#testimonials").hidden = false;
    $("#quotes").innerHTML = S.testimonials.map((t) => `<blockquote>“${esc(t.texto)}”<cite>${esc(t.nome)}</cite></blockquote>`).join("");
  }

  /* Instagram */
  $("#insta").innerHTML = S.instagramPhotos.length
    ? S.instagramPhotos.map((s) => `<a href="${esc(S.instagramUrl)}" target="_blank" rel="noopener" aria-label="Ver no Instagram"><img src="${esc(s)}" alt="Publicação da Larissa Presentes no Instagram" loading="lazy"></a>`).join("")
    : `<p class="insta__note">Acompanhe novidades, lançamentos e trabalhos recentes da loja no perfil oficial.</p>`;

  /* Informações comerciais */
  const row = (label, f, link) => {
    const val = f.text
      ? esc(f.text) + (f.confirmed ? "" : '<span class="badge">a confirmar</span>')
      : '<span class="pending">Informação em breve</span>';
    return `<div><dt>${label}</dt><dd>${val}</dd></div>`;
  };
  $("#info").innerHTML =
    `<div><dt>WhatsApp</dt><dd><a href="${wa(GENERIC_MSG)}" target="_blank" rel="noopener">${esc(S.whatsappDisplay)}</a></dd></div>
     <div><dt>Instagram</dt><dd><a href="${esc(S.instagramUrl)}" target="_blank" rel="noopener">@${esc(S.instagram)}</a></dd></div>
     <div><dt>E-mail</dt><dd><a href="mailto:${esc(S.email)}">${esc(S.email)}</a></dd></div>` +
    row("Endereço", S.address) + row("Horário de atendimento", S.hours) + row("Formas de pagamento", S.payment) +
    row("Entrega ou retirada", S.delivery) + row("Encomendas", S.orders) + row("Trocas", S.exchange);

  $("#footContact").innerHTML =
    `<p><a href="${wa(GENERIC_MSG)}" target="_blank" rel="noopener">WhatsApp ${esc(S.whatsappDisplay)}</a></p>
     <p><a href="${esc(S.instagramUrl)}" target="_blank" rel="noopener">Instagram @${esc(S.instagram)}</a></p>
     <p><a href="mailto:${esc(S.email)}">${esc(S.email)}</a></p>` +
    (S.address.confirmed ? `<p>${esc(S.address.text)}</p>` : `<p>${esc(S.city)} - ${esc(S.state)}</p>`) +
    (S.hours.confirmed ? `<p>${esc(S.hours.text)}</p>` : "");

  /* Dados estruturados */
  const ld = { "@context": "https://schema.org", "@type": "GiftShop", name: S.name, telephone: "+" + S.whatsapp,
    email: S.email, sameAs: [S.instagramUrl],
    address: { "@type": "PostalAddress", addressLocality: S.city, addressRegion: S.state, addressCountry: "BR" } };
  if (S.address.confirmed) ld.address.streetAddress = S.address.text;
  $("#jsonld").textContent = JSON.stringify(ld);

  /* Header e menu */
  const header = $("#header"), burger = $("#burger"), nav = $("#nav");
  const onScroll = () => header.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const toggle = (open) => { nav.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); };
  burger.addEventListener("click", () => toggle(!nav.classList.contains("open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) toggle(false); });
  addEventListener("keydown", (e) => { if (e.key === "Escape") toggle(false); });

  render();
})();
