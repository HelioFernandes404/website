export const languages = {
  pt: 'Português',
  en: 'English',
} as const;

export const defaultLang = 'en';

export const htmlLang = {
  pt: 'pt-BR',
  en: 'en-US',
} as const;

export const ui = {
  pt: {
    'nav.home': '/inicio',
    'nav.blog': '/blog',
    'nav.projects': '/projetos',

    'layout.skipToContent': 'Pular para o conteúdo',
    'layout.openMenu': 'Abrir menu',
    'layout.closeMenu': 'Fechar menu',
    'layout.contact': 'Contato',
    'layout.backToTop': 'Voltar ao topo',
    'layout.footerCopyright':
      '© 2024 Hélio Fernandes. Construído com lógica e criatividade.',
    'layout.switchLanguage': 'English',

    'blogList.eyebrow': 'Conteúdo técnico',
    'blogList.title': 'Blog',
    'blogList.description':
      'Conteúdos publicados sobre arquitetura, backend e engenharia de plataforma.',
    'blogList.countOne': 'artigo publicado',
    'blogList.countOther': 'artigos publicados',
    'blogList.empty': 'Nenhum post publicado ainda.',
    'blogList.featuredBadge': 'Em destaque',
    'blogList.readArticle': 'Ler artigo',
    'blogList.minRead': 'min de leitura',

    'blogPost.kicker': 'Artigo',
    'blogPost.minRead': 'min de leitura',
    'blogPost.readingModeLabel': 'Modo de leitura',
    'blogPost.themeLight': 'Claro',
    'blogPost.themeDark': 'Escuro',
    'blogPost.themeSystem': 'Sistema',
    'blogPost.shareLink': 'Compartilhar link',
    'blogPost.shareStatusShared': 'Link compartilhado.',
    'blogPost.shareStatusCancelled': 'Compartilhamento cancelado.',
    'blogPost.shareStatusCopied': 'Link copiado.',
    'blogPost.shareStatusClipboardFallback':
      'Clipboard indisponível, abrindo prompt.',
    'blogPost.shareStatusReady': 'Link pronto para copiar.',
    'blogPost.copyPromptLabel': 'Copie o link do artigo:',
    'blogPost.navAriaLabel': 'Navegação entre artigos',
    'blogPost.previous': 'Anterior',
    'blogPost.next': 'Próximo',
    'blogPost.backToBlog': 'Voltar para o blog',

    'projectsList.eyebrow': 'Portfólio técnico',
    'projectsList.title': 'Projetos',
    'projectsList.description':
      'Cada projeto abaixo tem o problema, a decisão técnica e o resultado. Sem lista de tecnologia solta.',
    'projectsList.empty': 'Nenhum projeto publicado ainda.',
    'projectsList.viewProject': 'Ver projeto',
    'projectsList.comingSoon': 'Em breve',

    'projectDetail.defaultUrlLabel': 'Acessar projeto',
    'projectDetail.defaultSecondaryUrlLabel': 'Ver contexto',
    'projectDetail.opensInNewTab': '(abre em uma nova aba)',
    'projectDetail.carlContext': 'Contexto',
    'projectDetail.carlAction': 'Ação',
    'projectDetail.carlResult': 'Resultado',
    'projectDetail.carlLearning': 'Aprendizado',
    'projectDetail.architectureDefaultTitle': 'Arquitetura',
    'projectDetail.architectureIntro':
      'Cada componente carrega a decisão que foi tomada ali e o que ela custou.',
    'projectDetail.viewDecisionsText': 'Ver todas as decisões em texto',
    'projectDetail.tradeoffLabel': 'Trade-off:',
    'projectDetail.backToProjects': 'Voltar para projetos',
  },
  en: {
    'nav.home': '/home',
    'nav.blog': '/blog',
    'nav.projects': '/projects',

    'layout.skipToContent': 'Skip to content',
    'layout.openMenu': 'Open menu',
    'layout.closeMenu': 'Close menu',
    'layout.contact': 'Contact',
    'layout.backToTop': 'Back to top',
    'layout.footerCopyright':
      '© 2024 Hélio Fernandes. Built with logic and creativity.',
    'layout.switchLanguage': 'Português',

    'blogList.eyebrow': 'Technical content',
    'blogList.title': 'Blog',
    'blogList.description':
      'Posts about architecture, backend, and platform engineering.',
    'blogList.countOne': 'article published',
    'blogList.countOther': 'articles published',
    'blogList.empty': 'No posts published yet.',
    'blogList.featuredBadge': 'Featured',
    'blogList.readArticle': 'Read article',
    'blogList.minRead': 'min read',

    'blogPost.kicker': 'Article',
    'blogPost.minRead': 'min read',
    'blogPost.readingModeLabel': 'Reading mode',
    'blogPost.themeLight': 'Light',
    'blogPost.themeDark': 'Dark',
    'blogPost.themeSystem': 'System',
    'blogPost.shareLink': 'Share link',
    'blogPost.shareStatusShared': 'Link shared.',
    'blogPost.shareStatusCancelled': 'Share cancelled.',
    'blogPost.shareStatusCopied': 'Link copied.',
    'blogPost.shareStatusClipboardFallback':
      'Clipboard unavailable, opening prompt.',
    'blogPost.shareStatusReady': 'Link ready to copy.',
    'blogPost.copyPromptLabel': 'Copy the article link:',
    'blogPost.navAriaLabel': 'Article navigation',
    'blogPost.previous': 'Previous',
    'blogPost.next': 'Next',
    'blogPost.backToBlog': 'Back to blog',

    'projectsList.eyebrow': 'Technical portfolio',
    'projectsList.title': 'Projects',
    'projectsList.description':
      "Each project below covers the problem, the technical decision, and the result. No loose tech-stack list.",
    'projectsList.empty': 'No projects published yet.',
    'projectsList.viewProject': 'View project',
    'projectsList.comingSoon': 'Coming Soon',

    'projectDetail.defaultUrlLabel': 'Visit project',
    'projectDetail.defaultSecondaryUrlLabel': 'View context',
    'projectDetail.opensInNewTab': '(opens in a new tab)',
    'projectDetail.carlContext': 'Context',
    'projectDetail.carlAction': 'Action',
    'projectDetail.carlResult': 'Result',
    'projectDetail.carlLearning': 'Lessons learned',
    'projectDetail.architectureDefaultTitle': 'Architecture',
    'projectDetail.architectureIntro':
      'Each component carries the decision made there and what it cost.',
    'projectDetail.viewDecisionsText': 'View all decisions as text',
    'projectDetail.tradeoffLabel': 'Trade-off:',
    'projectDetail.backToProjects': 'Back to projects',
  },
} as const;

export type Lang = keyof typeof ui;
