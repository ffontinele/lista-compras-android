# 🛒 Lista de Compras

> **[🇺🇸 Read in English](README_EN.md)**

<div align="center">

![Versão](https://img.shields.io/badge/versão-1.8-5e81ac)
![Android](https://img.shields.io/badge/android-5.1%2B-88c0d0)

</div>

Aplicativo Android nativo para gerenciar listas de compras com histórico de preços, análise de gastos e múltiplas paletas de cores. Funciona **100% offline** — nenhum dado sai do celular.

---

## 📸 Screenshots

### 🛒 Tela Principal — Listas

| Visão geral das listas | Criando nova lista |
|:---:|:---:|
| ![Listas](Imagens/13_home_listas.png) | ![Nova Lista](Imagens/12_home_nova_lista.png) |
| Listas do mês agrupadas com resumo de itens, total e tags dos produtos | Formulário inline com seleção de mercado e opção de adicionar novo |

---

### 📦 Dentro da Lista

| Itens da lista | Menu de ordenação | Editar item |
|:---:|:---:|:---:|
| ![Itens](Imagens/10_lista_itens.png) | ![Ordenação](Imagens/09_lista_menu_ordenacao.png) | ![Editar](Imagens/11_editar_item.png) |
| Itens com checkbox, quantidade, preço unitário e total | Ordenações + filtros de variação + posição do total + exportar | Edição com comparação de preço em tempo real e subtotal |

---

### 📊 Análise de Gastos

| Análise anual | Análise mensal | Produtos |
|:---:|:---:|:---:|
| ![Anual](Imagens/08_analise_anual.png) | ![Mensal](Imagens/07_analise_mensal.png) | ![Produtos](Imagens/06_analise_mercados.png) |
| Gráfico por mês com mês mais caro/barato e navegação | Total mensal, ticket médio, comparação com período anterior | Histórico de preços por produto com filtros e ordenação |

---

### ⚙️ Configurações

| Navegação | Tema | Tamanho da fonte | Dados |
|:---:|:---:|:---:|:---:|
| ![Navegação](Imagens/05_configuracoes_navegacao.png) | ![Tema](Imagens/04_configuracoes_aparencia.png) | ![Fonte](Imagens/03_configuracoes_fonte.png) | ![Dados](Imagens/02_configuracoes_dados.png) |
| Alerta de reposição, toque tátil, posição da barra e botão voltar | 7 paletas + paleta personalizada + ocultar/restaurar temas | Slider de tamanho com preview ao vivo | Backup, restauração, exportar CSV e limpeza de dados |

---

### ℹ️ Sobre

<div align="center">
  <img src="Imagens/01_sobre.png" width="280" alt="Tela Sobre"/>
  <br/><sub>Versão, desenvolvedor e verificação de atualizações</sub>
</div>

---

## 📱 Download e Instalação

1. Acesse a página de [Releases](https://github.com/thespation/lista-compras-android/releases)
2. Baixe o arquivo `app-release.apk`
3. No Android: **Configurações → Segurança → Instalar apps desconhecidos** → ative para o gerenciador de arquivos
4. Abra o APK e toque em **Instalar**

> **Requisito mínimo:** Android 5.1 (API 22)

---

## ✨ Funcionalidades

### 🛒 Listas de Compras

- **Criar listas** com nome, data e mercado selecionável
- **Data editável** — toque no cabeçalho para editar nome, mercado e data; permite criar rascunhos e definir a data no dia real da compra
- **Basear em lista anterior** — ao criar nova lista, copie os produtos de uma lista existente com preços zerados
- **Listas Futuras** — seção colapsável para listas com data futura, separada do mês atual
- **Organização por mês** — mês atual expandido; meses anteriores agrupados por ano/mês, cada um colapsável
- **Duplicar lista** — copia todos os itens para uma nova lista, com opção de zerar valores e trocar mercado
- **Busca de histórico de preço** — pesquise qualquer item para ver o histórico completo com data, mercado, valor e variação
- **Card "Este mês" clicável** — navega direto para a Análise Mensal do mês atual
- **Remover lista** — com confirmação para evitar exclusão acidental

### 📦 Itens da Lista

- **Adicionar itens** com nome, quantidade e preço
- **Capitalização automática** — nomes salvos com a primeira letra maiúscula
- **Nomes longos** — quebra de linha automática
- **Autocompletar** — sugere nomes já usados, com indicação quando o item já está na lista e atalho para edição
- **Comparação de preço automática** — mostra ▼ mais barato ou ▲ mais caro em relação à última lista que contém aquele item
- **Quantidade editável** — ao tocar no campo de quantidade, o valor é selecionado automaticamente
- **Estimativa de gasto** — quando há itens sem preço, o total exibe "≈ TOTAL"
- **Marcar/desmarcar** itens comprados com checkbox e toque tátil configurável
- **Editar item** — toque no ✏️ para corrigir nome, quantidade ou preço
- **Ordenação** por 6 critérios: inserção, alfabética, preço, marcados primeiro/último
- **Filtro de variação** — exibir só os itens mais baratos ou mais caros
- **Total no topo ou rodapé** — escolha se a barra de marcados+total fica no topo ou fixada no rodapé
- **Exportar lista** — compartilha todos os itens como texto formatado via aplicativos do Android (WhatsApp, e-mail, etc.)
- **Marcar todos / Desmarcar todos** de uma vez

### 📊 Análise de Gastos

- **Resumo geral** — card fixo no topo com total do ano, mês anterior (ou última compra) e este mês com indicador ▲/▼
- **Gastos por ano** — gráfico horizontal por mês com destaque do mês mais caro e mais barato; toque em uma barra para navegar ao mês
- **Gastos por mês** — total mensal, ticket médio, gasto por mercado, comparação com período anterior e itens acima da média histórica
- **Produtos** — tabela de itens com histórico de preços, recorrência, variação, mercado mais barato e filtros por período, mercado e ordenação
- **Alerta de reposição** — sugere itens comprados regularmente que ainda não aparecem no mês atual; cada sugestão pode ser removida individualmente

### ⚙️ Configurações

Seções em ordem: **Tema → Tamanho da fonte → Navegação → Dados → Sobre o Aplicativo**

#### Navegação
- **Alerta de reposição** — ativar/desativar sugestão de itens frequentes
- **Toque tátil** — vibração ao marcar/desmarcar item
- **Posição da barra de navegação** — acima (topo) ou abaixo (base da tela)
- **Botão voltar** na tela inicial — perguntar antes de sair, minimizar o app ou não fazer nada

#### Tema
- **7 paletas de cores**, cada uma com modo escuro e claro:
  - 🟡 **Dourado** — clássica e elegante
  - 🔵 **Nórdica** — ártico e limpa (Nord)
  - 🟤 **Gruvbox** — retrô e quente
  - 🌸 **Rosé Pine** — suave e floral
  - 🟣 **Catppuccin** — pastel techno
  - ⚫ **Meia-Noite** — OLED, preto absoluto `#000000`
  - 📄 **Papel** — tinta sobre papel, branco puro `#ffffff`
- **Ocultar temas** — botão ✕ em cada tema predefinido; restauração em linha única colapsável
- **🎨 Paleta personalizada** — crie sua própria paleta com prévia em tempo real

#### Tamanho da fonte
- Controle de 11px a 22px com slider e botões +/−

#### Dados
- **💾 Salvar backup agora** — snapshot com data e hora
- **📂 Ver e restaurar backups** — lista, restaura ou exclui backups individuais
- **📊 Exportar como CSV** — exporta todas as listas em formato compatível com Excel/Google Sheets
- **🧹 Limpar histórico de preços** — remove entradas de itens que não existem em nenhuma lista atual (com confirmação)
- **🗑 Apagar todos os dados** — com confirmação

### 🔄 Atualizações
- Botão **"Verificar atualização"** na tela Sobre — consulta o GitHub e exibe o changelog quando há novidade
- Download do APK mais recente com um toque
- Verificação manual, sem consumo de dados em background

---

## 🗂️ Estrutura do Projeto

```
lista-compras-android/
├── android/                          # Projeto Android Studio
│   ├── app/
│   │   ├── build.gradle              # Config do módulo (AGP 8.3.2, compileSdk 34)
│   │   └── src/main/
│   │       ├── AndroidManifest.xml   # Permissões: INTERNET e VIBRATE
│   │       ├── assets/public/
│   │       │   └── index.html        # App completo embutido (~344KB)
│   │       ├── java/com/listacompras/app/
│   │       │   └── MainActivity.java # WebView + AndroidBridge
│   │       └── res/
│   │           ├── mipmap-*/         # Ícones em todas as densidades
│   │           └── values/themes.xml # Tema sem interferência na status bar
│   └── gradle/wrapper/
│       └── gradle-wrapper.properties # Gradle 8.5
├── src/
│   └── App.jsx                       # Código-fonte React (~3300 linhas)
├── Imagens/                          # Screenshots do app
├── README.md                         # Este arquivo (pt-BR)
└── README_EN.md                      # Versão em inglês
```

---

## 🔧 Tecnologias Utilizadas

| Tecnologia | Versão | Função |
|---|---|---|
| **React** | 18.x | Interface de usuário |
| **JavaScript (JSX)** | ES2017+ | Lógica da aplicação |
| **esbuild** | latest | Bundler — compila e minifica o JSX |
| **Android WebView** | — | Container nativo para o app web |
| **Java** | 17 | MainActivity, AndroidBridge |
| **Gradle** | 8.5 | Build system Android |
| **Android Gradle Plugin** | 8.3.2 | Plugin de build Android |
| **localStorage** | Web API | Persistência de dados e backups |

> Sem frameworks externos, sem banco de dados, sem servidor. Dados salvos 100% no dispositivo.

---

## 🏗️ Arquitetura

O app é uma **Single Page Application (SPA)** React compilada com esbuild em um único arquivo `index.html`. Esse arquivo é carregado por uma `WebView` Android nativa.

### Bridge Java ↔ JavaScript

```javascript
window.__androidDarkMode             // boolean — tema do sistema Android
window.__androidBack                 // function — handler do botão voltar
window.AndroidBridge.openUrl(url)    // abre URL no navegador externo
window.AndroidBridge.exitApp()       // fecha o app
window.AndroidBridge.minimizeApp()   // minimiza para segundo plano
window.AndroidBridge.vibrate(ms)     // vibração tátil (Android 8+)
window.AndroidBridge.share(text)     // compartilhamento nativo de texto
```

### Persistência (localStorage)

| Chave | Conteúdo |
|---|---|
| `lista-compras-v2` | Listas, itens e histórico de preços |
| `lista-compras-settings` | Configurações do usuário |
| `lista-compras-backups` | Índice dos backups |
| `lista-compras-backup-{timestamp}` | Dados de cada backup individual |

---

## 📲 Como Gerar o APK

```bash
# 1. Clone o repositório
git clone https://github.com/thespation/lista-compras-android.git

# 2. Abra o Android Studio
# File → Open → selecione a pasta android/

# 3. Se aparecer "Invalid Gradle JDK": clique em "Use Embedded JDK"

# 4. Aguarde o Gradle sincronizar

# 5. Build → Build Bundle(s) / APK(s) → Build APK(s)
# APK em: android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🎮 Navegação — Botão Voltar (Android)

Comportamento em cascata:
1. Fecha qualquer modal ou dropdown aberto
2. Fecha accordion aberto em Configurações
3. Recolhe detalhes expandidos em Análise → Produtos
4. Dentro de uma lista → volta para Listas
5. Em Análise ou Configurações → volta para Listas
6. Na tela Sobre → volta para Configurações
7. Na tela inicial → comportamento configurável (perguntar, minimizar ou nada)

---

## 👨‍💻 Desenvolvedor

**William Santos**
- GitHub: [@thespation](https://github.com/thespation)
- E-mail: thespation@gmail.com

---

## 📄 Licença

Este projeto é de uso pessoal. Sinta-se livre para usar como referência ou base para projetos próprios.
