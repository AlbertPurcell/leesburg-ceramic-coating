/**
 * Leesburg Ceramic Coating — site config (single source of truth)
 *
 * CallRail tracking number lives here. Changing phoneDisplay / phoneTel
 * updates visible numbers and the sticky mobile call bar via main.js.
 * Keep matching tel:+… attributes in HTML for progressive enhancement;
 * JSON-LD keeps a static E.164 number for crawlers.
 *
 * Form leads go to formEmail via FormSubmit.co. First-ever submission
 * sends an activation email to that address — confirm it before live leads.
 * Re-route leads later by changing formEmail (and formEndpoint) only.
 */
window.SITE_CONFIG = {
  phoneDisplay: "(703) 643-9130",
  phoneTel: "+17036439130",
  formEmail: "hello@leesburgceramiccoating.com",
  siteUrl: "https://leesburgceramiccoating.com",
  /** FormSubmit AJAX endpoint — recipient = formEmail */
  formEndpoint: "https://formsubmit.co/ajax/hello@leesburgceramiccoating.com"
};
