/* Catálogo. Para cadastrar: copie um item e edite. Para remover: apague o item.
   images: lista de caminhos (ex.: ["img/produtos/xicara-1.jpg"]). Vazio = "foto em breve".
   price: número ou null (null = "Consultar valor"). Preços vêm do catálogo atual; confirmar.
   featured: true para a seção de destaques. details: lista [rótulo, valor] — só dados confirmados. */
window.PRODUCTS = [
  { id: 62377, name: "Copo Stanley tradicional", category: "copos", price: 55.00, images: [], featured: true,
    description: "Copo térmico estilo Stanley.", details: [] },
  { id: 52728, name: "Copo Twister com canudo", category: "copos", price: 12.80, images: [], featured: true,
    description: "Copo Twister com canudo, personalizável.", details: [["Personalização", "Sob consulta"]] },
  { id: 58045, name: "Xícara personalizada", category: "copos", price: 30.00, images: [], featured: true,
    description: "Xícara com personalização.", details: [["Personalização", "Sob consulta"]] },
  { id: 56029, name: "Ursinho", category: "lembrancinhas", price: 20.00, images: [], featured: true,
    description: "Ursinho para presentear.", details: [] },
  { id: 56028, name: "Sapatinho unissex", category: "lembrancinhas", price: 10.00, images: [],
    description: "Sapatinho unissex, lembrança para bebês.", details: [] },
  { id: 20461, name: "Terço religioso", category: "lembrancinhas", price: 8.00, images: [],
    description: "Terço religioso.", details: [] },
  { id: 59542, name: "Embalagem de presente", category: "embalagens", price: 5.00, images: [],
    description: "Embalagem para presente.", details: [] },
  { id: 51077, name: "Caixinha personalizada com laço", category: "embalagens", price: 7.70, images: [], featured: true,
    description: "Caixinha personalizada com laço.", details: [["Personalização", "Sob consulta"]] },
  { id: 52729, name: "Saquinho transparente médio", category: "embalagens", price: 2.50, images: [],
    description: "Saquinho transparente, tamanho médio.", details: [["Tamanho", "Médio"]] },
  { id: 52731, name: "Tags personalizadas", category: "embalagens", price: 1.50, images: [],
    description: "Tags personalizadas para presentes.", details: [["Personalização", "Sob consulta"]] },
  { id: 38416, name: "100 saquinhos para tags", category: "embalagens", price: 22.00, images: [],
    description: "Pacote com 100 saquinhos para tags.", details: [["Quantidade", "100 unidades"]] },
  { id: 51076, name: "Folha A4 fosca", category: "embalagens", price: 8.00, images: [],
    description: "Folha A4 com acabamento fosco.", details: [["Formato", "A4"], ["Acabamento", "Fosco"]] }
];
