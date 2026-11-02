# Calatea Art — landing page

Página única, estática. Sem build, sem dependências: abra `index.html` ou sirva a pasta como está.

## Estrutura

- `index.html` — a página (marca, manifesto, e-mail)
- `style.css` — estilos e fontes
- `fonts/` — fontes auto-hospedadas (Pinyon Script, Italiana, Fraunces, DM Sans; licença SIL OFL em `LICENSE-*.txt`)
- `img/fundo.jpg`, `img/fundo-mobile.jpg` — imagem de fundo (desktop e celular)
- `img/og.jpg` — imagem de compartilhamento (WhatsApp, Instagram, etc.)
- `img/icon.svg` — favicon

## Publicação

Qualquer host estático serve: GitHub Pages, Netlify, Cloudflare Pages.
Domínio previsto: `calatea.art` (as tags `canonical` e `og:url` já apontam para ele).

Para GitHub Pages: Settings → Pages → Branch `main`, pasta `/ (root)`, e adicionar o arquivo `CNAME` com `calatea.art`.
