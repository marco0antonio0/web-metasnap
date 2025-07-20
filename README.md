# 📸 MetaSnap Web



**MetaSnap Web** é um frontend simples e direto que consome a [API MetaSnap](https://metasnap.dirrocha.com), permitindo a geração de thumbnails (capturas de tela) de qualquer site a partir de uma URL.

🔗 **Acesse agora**: [https://web-metasnap.dirrocha.com](https://web-metasnap.dirrocha.com)

---

## 🚀 Funcionalidades

- Geração instantânea de imagens `.jpeg` (1200x630) a partir de qualquer URL
- Pré-visualização da imagem gerada
- Interface leve, responsiva e amigável
- Ideal para criar imagens dinâmicas para:
  - `og:image`
  - `twitter:image`
  - Previews em redes sociais

---

## 📦 Tecnologias

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [lucide-react](https://lucide.dev/)

---

## 🌐 API utilizada

Este frontend consome a seguinte API REST pública:

```
GET https://metasnap.dirrocha.com/screenshot?url=https://exemplo.com
```

A resposta é uma imagem do tipo `image/jpeg`.

Documentação da API:  
📘 [https://metasnap.dirrocha.com/api](https://metasnap.dirrocha.com/api)

---

## 🖥️ Rodando localmente

```bash
git clone https://github.com/marco0antonio0/web-metasnap.git
cd web-metasnap
npm install
npm run dev
```

---

## 📄 Licença

MIT © [Marco Antonio](https://github.com/marco0antonio0)