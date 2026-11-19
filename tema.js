(() => {
  const chaveTema = "tema";
  const temaSalvo = localStorage.getItem(chaveTema);
  const temaEscuro = temaSalvo === "escuro";

  document.body.classList.toggle("tema-escuro", temaEscuro);

  const botaoTema = document.createElement("button");
  botaoTema.type = "button";
  botaoTema.className = "theme-toggle";
  botaoTema.innerHTML = `
    <svg class="theme-toggle__moon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M20.2 15.3A8.5 8.5 0 0 1 8.7 3.8 8.6 8.6 0 1 0 20.2 15.3Z" />
    </svg>
    <svg class="theme-toggle__sun" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
    </svg>`;

  const atualizarBotao = () => {
    const escuro = document.body.classList.contains("tema-escuro");
    const proximoTema = escuro ? "claro" : "escuro";
    botaoTema.setAttribute("aria-label", `Alterar para tema ${proximoTema}`);
    botaoTema.title = `Alterar para tema ${proximoTema}`;
    localStorage.setItem(chaveTema, escuro ? "escuro" : "claro");
  };

  botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("tema-escuro");
    atualizarBotao();
  });

  const acoesCabecalho = document.querySelector(".header-actions");
  if (acoesCabecalho) acoesCabecalho.prepend(botaoTema);
  atualizarBotao();
})();
