/**
 * Gestionnaire Highlight.js - Version configurable
 * Charge HLJS de manière asynchrone via CDN avec options flexibles
 */
class ManageHljs {
  constructor(config = {}) {
    this.config = {
      version: '11.9.0',
      cdn: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js',

      // Scripts principaux
      coreScript: true,
      languages: ['go'], // ex: ['javascript', 'python', 'go', 'php']

      // Styles
      coreStyle: true,
      theme: 'atom-one-dark', // ex: 'default', 'github', 'atom-one-dark', 'monokai', etc.

      // Comportement
      autoHighlight: true,
      highlightOnLoad: true,

      ...config,
    };

    this.loaded = false;
  }

  /**
   * Charge un script et retourne une Promise
   */
  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error(`Échec du chargement : ${src}`));
      document.head.appendChild(script);
    });
  }

  /**
   * Charge une feuille de style
   */
  loadStyle(src) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      link.onload = () => resolve(true);
      link.onerror = () => reject(new Error(`Échec du chargement : ${src}`));
      document.head.appendChild(link);
    });
  }

  /**
   * Retourne l'URL complète selon la config
   */
  getUrl(type, name = '') {
    const { cdn, version } = this.config;
    switch (type) {
      case 'core':
        return `${cdn}/${version}/highlight.min.js`;
      case 'language':
        return `${cdn}/${version}/languages/${name}.min.js`;
      case 'style':
        return `${cdn}/${version}/styles/${name}.min.css`;
      default:
        return '';
    }
  }

  /**
   * Initialise Highlight.js avec la configuration
   */
  async init() {
    if (this.loaded) return;

    try {
      const promises = [];

      // 1. Charger le script principal
      if (this.config.coreScript) {
        await this.loadScript(this.getUrl('core'));
      }

      // 2. Charger les languages (en parallèle)
      if (this.config.languages.length > 0) {
        const langPromises = this.config.languages.map((lang) => this.loadScript(this.getUrl('language', lang)));
        await Promise.all(langPromises);
      }

      // 3. Charger les styles (en parallèle)
      const stylePromises = [];

      if (this.config.coreStyle) {
        stylePromises.push(this.loadStyle(this.getUrl('style', 'default')));
      }
      if (this.config.theme) {
        stylePromises.push(this.loadStyle(this.getUrl('style', this.config.theme)));
      }

      await Promise.all(stylePromises);

      // 4. Appliquer la configuration HLJS (optionnel)
      if (window.hljs && typeof window.hljs.configure === 'function') {
        window.hljs.configure({
          ignoreUnescapedHTML: true,
          throwUnescapedHTML: false,
        });
      }

      // 5. Highlight automatique
      if (this.config.autoHighlight && window.hljs) {
        if (this.config.highlightOnLoad) {
          window.hljs.highlightAll();
        }
      }

      this.loaded = true;
      console.log('✅ Highlight.js chargé avec succès');
    } catch (error) {
      console.error('❌ Erreur lors du chargement de Highlight.js :', error);
    }
  }
}

export default ManageHljs;

//////////////
