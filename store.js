(() => {
  const instagram = "https://www.instagram.com/floreiosart/";
  const products = [
    { name: "KIT Floreios", category: "Kits", image: "KIT PROMOCIONAL.png", alt: "Kit de acessórios literários Floreios", price: 69.9 },
    { name: "Ecobag Book Love", category: "Ecobags", image: "ecobag book love.png", alt: "Ecobag Book Love", price: 42 },
    { name: "Ecobag In My Reading Era", category: "Ecobags", image: "Ecobag “In My Reading Era”.png", alt: "Ecobag In My Reading Era", price: 42 },
    { name: "Chaveiro", category: "Acessórios", image: "chaveiro fofo.png", alt: "Chaveiro literário fofo", price: 12 },
    { name: "Xícara Book", category: "Xícaras", image: "xicara book.jpeg", alt: "Xícara com estampa literária Book", price: 24 },
    { name: "Xícara Leitoras Club", category: "Xícaras", image: "xicara leitoras club.jpeg", alt: "Xícara Leitoras Club", price: 24 },
    { name: "Adesivos", category: "Papelaria", image: "adesivos.png", alt: "Conjunto de adesivos literários", price: 10.5 },
    { name: "Skincard", category: "Papelaria", image: "skin card.png", alt: "Skincard com estampa literária", price: 12.5 }
  ];

  const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);

  const renderCard = (product) => {
    const name = escapeHtml(product.name);
    const category = escapeHtml(product.category);
    const image = escapeHtml(`produtos/${product.image}`);
    const alt = escapeHtml(product.alt);
    const price = product.price === null ? "Consulte no Instagram" : money.format(product.price);
    return `<article class="product-card">
      <a class="product-image" href="${instagram}" target="_blank" rel="noopener noreferrer" aria-label="Consultar ${name} pelo Instagram">
        <img src="${image}" alt="${alt}" loading="lazy">
      </a>
      <div class="product-info">
        <div class="product-meta"><span>${category}</span></div>
        <h3>${name}</h3>
        <div class="product-bottom"><strong>${price}</strong><a href="${instagram}" target="_blank" rel="noopener noreferrer" aria-label="Consultar ${name}">Consultar</a></div>
      </div>
    </article>`;
  };

  const catalog = document.querySelector('[data-product-list="all"]');
  const featured = document.querySelector('[data-product-list="featured"]');
  if (featured) featured.innerHTML = [products[0], products[1], products[4]].map(renderCard).join("");
  if (!catalog) return;

  const search = document.querySelector("[data-product-search]");
  const category = document.querySelector("[data-product-category]");
  const count = document.querySelector("[data-product-count]");
  const empty = document.querySelector("[data-product-empty]");
  const requestedCategory = new URLSearchParams(window.location.search).get("categoria");
  if (requestedCategory && [...category.options].some((option) => option.value === requestedCategory)) {
    category.value = requestedCategory;
  }

  const updateCatalog = () => {
    const query = search.value.trim().toLocaleLowerCase("pt-BR");
    const selectedCategory = category.value;
    const filtered = products.filter((product) => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const searchable = `${product.name} ${product.category}`.toLocaleLowerCase("pt-BR");
      return matchesCategory && searchable.includes(query);
    });
    catalog.innerHTML = filtered.map(renderCard).join("");
    count.textContent = `${filtered.length} ${filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}`;
    empty.hidden = filtered.length > 0;
  };

  search.addEventListener("input", updateCatalog);
  category.addEventListener("change", updateCatalog);
  updateCatalog();
})();
