#!/bin/bash
# Script para gerar ícones PWA
# Se você tiver o ImageMagick instalado:

# Criar ícone simples 192x192 (placeholder)
convert -size 192x192 xc:'#88c0d0' \
  -fill white -font Arial -pointsize 80 \
  -draw "text 50,130 'LC'" \
  android/app/src/main/assets/public/icon-192.png 2>/dev/null || \
  echo "⚠️  ImageMagick não encontrado. Ícones serão placeholders."

# Criar ícone simples 512x512 (placeholder)
convert -size 512x512 xc:'#88c0d0' \
  -fill white -font Arial -pointsize 200 \
  -draw "text 140,350 'LC'" \
  android/app/src/main/assets/public/icon-512.png 2>/dev/null || \
  echo "⚠️  ImageMagick não encontrado. Ícones serão placeholders."

echo "✅ Ícones gerados (ou placeholders criados)"
