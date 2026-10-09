export interface SiteConfig {
  name: string;
  url: string;
  email: string;
  careersEmail: string;
  phone: string;
  contactEndpoint: string;
  filmUrl: string;
  social: { x: string; linkedin: string; instagram: string };
}

/**
 * Company-wide settings. Update these values before going live.
 */
export const site: SiteConfig = {
  name: 'TALEAD',
  url: 'https://www.taleadtech.com',
  email: 'info@taleadtech.com',
  careersEmail: 'info@taleadtech.com',
  /** Shown on the contact page when set, e.g. '+966 11 000 0000'. */
  phone: '',
  /**
   * Optional endpoint that receives contact-form submissions as JSON (POST).
   * When empty, the form opens the visitor's email app addressed to `email`.
   */
  contactEndpoint: '',
  /** Optional MP4 shown by the hero "Watch now" button instead of the animated brand film. */
  filmUrl: '',
  /** Leave a value empty to hide that icon in the footer. */
  social: {
    x: '#',
    linkedin: '#',
    instagram: '#',
  },
};
