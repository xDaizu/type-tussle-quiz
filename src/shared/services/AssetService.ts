// Utility for handling asset paths across different deployment environments
export class AssetService {
  /**
   * Detects if we're running in GitHub Pages environment
   */
  private static isGitHubPages(): boolean {
    if (typeof window === 'undefined') return false;
    return window.location.pathname.startsWith('/type-tussle-quiz/');
  }

  /**
   * Gets the correct base path for the current environment
   */
  private static getBasePath(): string {
    return this.isGitHubPages() ? '/type-tussle-quiz/' : '/';
  }

  /**
   * Resolves a local asset path for the current environment
   * @param assetPath - The relative path to the asset (e.g. 'sprites/types/wordy/FireIC_SV.png')
   */
  static getAssetPath(assetPath: string): string {
    // Remove leading slash if present to ensure consistent behavior
    const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
    const basePath = this.getBasePath();
    return `${basePath}${cleanPath}`;
  }

  /**
   * Checks if the current environment is development
   */
  static isDevelopment(): boolean {
    return import.meta.env.DEV;
  }

  /**
   * Checks if the current environment is production
   */
  static isProduction(): boolean {
    return import.meta.env.PROD;
  }
} 