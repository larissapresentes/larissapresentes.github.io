/* Configurações centralizadas da loja.
   Campos com confirmed:false aparecem no site como "a confirmar". */
window.SITE = {
  name: "Larissa Presentes",
  tagline: "Presentes personalizados em Rondonópolis",
  whatsapp: "5566999170419",
  whatsappDisplay: "(66) 99917-0419",
  instagram: "larissa.presentes_roo",
  instagramUrl: "https://www.instagram.com/larissa.presentes_roo/",
  email: "larissamarquesrs18@gmail.com",
  city: "Rondonópolis",
  state: "MT",
  // Foto principal do hero (ex.: "img/hero.jpg"). Vazio = composição tipográfica.
  heroImage: "",
  address: { text: "Rua Irmã Bernarda, Conjunto São José 2, 654 — Rondonópolis, MT", confirmed: false },
  hours:    { text: "", confirmed: false },
  payment:  { text: "", confirmed: false },
  delivery: { text: "", confirmed: false },
  orders:   { text: "", confirmed: false },
  exchange: { text: "", confirmed: false },
  // Mostrar preços do catálogo atual. Coloque false para exibir só "Consultar valor".
  showPrices: true,
  // Depoimentos reais e autorizados: { nome, texto }
  testimonials: [],
  // Fotos autorizadas do Instagram: ["img/insta-1.jpg", ...]
  instagramPhotos: []
};

window.CATEGORIES = [
  { id: "copos", name: "Copos e xícaras", desc: "Copos Stanley, Twister com canudo e xícaras personalizadas." },
  { id: "lembrancinhas", name: "Lembrancinhas", desc: "Ursinho, sapatinho e terço para presentear." },
  { id: "embalagens", name: "Embalagens e tags", desc: "Caixinhas, saquinhos, tags e papel para finalizar o presente." }
];
