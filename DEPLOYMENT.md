# Deployment — Gestar com Trombofilia PWA

Guia completo para distribuição do Gestar com Trombofilia como Progressive Web App (PWA).

## 📋 Requisitos

- Node.js 18+ e pnpm
- Domínio HTTPS (obrigatório para PWA)
- Servidor web (Vercel, Netlify, AWS S3 + CloudFront, etc.)
- Certificado SSL válido

## 🏗️ Build para Web

### 1. Build Estático

```bash
cd /home/ubuntu/gestar-trombofilia

# Build web otimizado
pnpm run build

# Saída em: dist/
```

### 2. Estrutura de Output

```
dist/
├── index.html              # HTML principal
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── favicon.png             # Favicon
├── icon-192.png            # App icon
├── icon-512.png            # App icon grande
├── splash-icon.png         # Splash screen
└── _next/                  # Assets otimizados
    ├── static/
    ├── server/
    └── ...
```

## 🚀 Opções de Deployment

### Opção 1: Vercel (Recomendado)

**Vantagens:** Deployment automático, HTTPS, CDN global, analytics

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Deploy
vercel --prod

# 3. Configurar domínio customizado
# Dashboard → Settings → Domains
```

**vercel.json:**
```json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "env": {
    "EXPO_PUBLIC_API_URL": "@api_url"
  },
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
      ]
    },
    {
      "source": "/manifest.json",
      "headers": [
        { "key": "Content-Type", "value": "application/manifest+json" }
      ]
    }
  ]
}
```

### Opção 2: Netlify

**Vantagens:** Deployment fácil, formulários, functions, analytics

```bash
# 1. Instalar Netlify CLI
npm i -g netlify-cli

# 2. Deploy
netlify deploy --prod --dir=dist

# 3. Configurar domínio
# Netlify Dashboard → Domain settings
```

**netlify.toml:**
```toml
[build]
command = "pnpm run build"
publish = "dist"

[[headers]]
for = "/sw.js"
[headers.values]
Cache-Control = "public, max-age=0, must-revalidate"

[[headers]]
for = "/manifest.json"
[headers.values]
Content-Type = "application/manifest+json"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

### Opção 3: AWS S3 + CloudFront

**Vantagens:** Escalável, controle total, HTTPS, analytics

```bash
# 1. Criar bucket S3
aws s3 mb s3://gestar-trombofilia --region us-east-1

# 2. Upload dos arquivos
aws s3 sync dist/ s3://gestar-trombofilia/ \
  --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "index.html" \
  --exclude "manifest.json" \
  --exclude "sw.js"

# 3. Upload de arquivos com cache curto
aws s3 cp dist/index.html s3://gestar-trombofilia/ \
  --cache-control "public, max-age=0, must-revalidate" \
  --content-type "text/html"

aws s3 cp dist/manifest.json s3://gestar-trombofilia/ \
  --cache-control "public, max-age=0, must-revalidate" \
  --content-type "application/manifest+json"

aws s3 cp dist/sw.js s3://gestar-trombofilia/ \
  --cache-control "public, max-age=0, must-revalidate" \
  --content-type "application/javascript"

# 4. Criar distribuição CloudFront
# AWS Console → CloudFront → Create Distribution
```

### Opção 4: Docker + Servidor Próprio

**Dockerfile:**
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm install
COPY . .
RUN pnpm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  # Cache headers
  location ~* \.(js|css|png|jpg|jpeg|svg|gif|webp|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # Service Worker
  location = /sw.js {
    add_header Cache-Control "public, max-age=0, must-revalidate";
    add_header Service-Worker-Allowed "/";
  }

  # Manifest
  location = /manifest.json {
    add_header Cache-Control "public, max-age=0, must-revalidate";
    add_header Content-Type "application/manifest+json";
  }

  # HTML
  location / {
    add_header Cache-Control "public, max-age=0, must-revalidate";
    try_files $uri $uri/ /index.html;
  }

  # Security headers
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "SAMEORIGIN" always;
  add_header X-XSS-Protection "1; mode=block" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

## 🔒 Configurações de Segurança

### HTTPS Obrigatório

```bash
# Redirecionar HTTP → HTTPS
# Vercel/Netlify: automático
# Próprio servidor: configurar no nginx/apache
```

### Headers de Segurança

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### CSP (Content Security Policy)

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self' data:;
connect-src 'self' https://api.gestar-trombofilia.com;
```

## 📊 Monitoramento

### Lighthouse Audit

```bash
# Instalar Lighthouse CLI
npm i -g lighthouse

# Auditar PWA
lighthouse https://gestar-trombofilia.com \
  --view \
  --output-path=./lighthouse-report.html
```

**Métricas esperadas:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100
- PWA: 100

### Analytics

- **Google Analytics 4:** Rastrear usuários, eventos, conversões
- **Sentry:** Monitorar erros e performance
- **Web Vitals:** Monitorar Core Web Vitals

## 🔄 Atualizações e Versionamento

### Versioning

```json
{
  "version": "1.0.0",
  "buildNumber": 1
}
```

### Estratégia de Cache

1. **Assets estáticos** (JS, CSS, imagens): 1 ano
2. **HTML**: sem cache (sempre fetch)
3. **Service Worker**: sem cache (sempre fetch)
4. **Manifest**: sem cache (sempre fetch)

### Notificar Usuários de Atualizações

```typescript
// Detectar nova versão
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then((registration) => {
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      newWorker?.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // Nova versão disponível
          showUpdateNotification();
        }
      });
    });
  });
}
```

## 📱 Instalação no Dispositivo

### iOS (Safari)

1. Abrir em Safari
2. Compartilhar → Adicionar à Tela Inicial
3. Nomeie e confirme

### Android (Chrome)

1. Abrir em Chrome
2. Menu (⋮) → Instalar app
3. Confirme

### Desktop (Chrome/Edge)

1. Abrir no navegador
2. Ícone de instalação na barra de endereço
3. Confirme

## 🧪 Testes

```bash
# Testar build local
pnpm run build
pnpm run preview

# Testar PWA offline
# DevTools → Application → Service Workers → Offline

# Testar instalação
# DevTools → Manifest → Installability
```

## 📞 Suporte

Para dúvidas sobre deployment, consulte:
- Documentação Expo Web: https://docs.expo.dev/guides/web/
- PWA Documentation: https://web.dev/progressive-web-apps/
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com/
