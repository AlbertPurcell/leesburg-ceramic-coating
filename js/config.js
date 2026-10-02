/**
 * Leesburg Ceramic Coating — site config (single source of truth)
 *
 * NOTE: (703) 555-1212 is the business number and is NO LONGER the CallRail
 * tracking number. The CallRail swap.js script is still loaded on every page;
 * if its swap target in the CallRail dashboard is still the old tracking number
 * it will find nothing to swap and calls will not be tracked
 * until the target is updated in CallRail (or swap.js is removed).
 *
 * Phone number lives here. Changing phoneDisplay / phoneTel
 * updates visible numbers and the sticky mobile call bar via main.js.
 * Keep matching tel:+… attributes in HTML for progressive enhancement;
 * JSON-LD keeps a static E.164 number for crawlers.
 *
 * Form leads go to formEmail via FormSubmit.co. First-ever submission
 * sends an activation email to that address — confirm it before live leads.
 * Re-route leads later by changing formEmail (and formEndpoint) only.
 */
window.SITE_CONFIG = {
  phoneDisplay: "(703) 555-1212",
  phoneTel: "+17035551212",
  formEmail: "hello@leesburgceramiccoating.com",
  siteUrl: "https://leesburgceramiccoating.com",
  /** FormSubmit AJAX endpoint — recipient = formEmail */
  formEndpoint: "https://formsubmit.co/ajax/hello@leesburgceramiccoating.com"
};
