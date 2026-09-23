/**
 * Leesburg Ceramic Coating — main.js
 * Mobile nav + contact form (mailto fallback).
 * To switch to Formspree later: set form action to your Formspree endpoint
 * and method="POST", then remove or bypass the mailto handler below.
 * Example: action="https://formspree.io/f/YOUR_FORM_ID"
 */
(function () {
  "use strict";

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
      });
    });
  }

  // Contact form — builds a mailto: link with filled fields
  var form = document.getElementById("quote-form");
  if (!form) return;

  var success = document.getElementById("form-success");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = (form.elements.namedItem("name") || {}).value || "";
    var phone = (form.elements.namedItem("phone") || {}).value || "";
    var email = (form.elements.namedItem("email") || {}).value || "";
    var vehicle = (form.elements.namedItem("vehicle") || {}).value || "";
    var zip = (form.elements.namedItem("zip") || {}).value || "";
    var message = (form.elements.namedItem("message") || {}).value || "";

    name = String(name).trim();
    phone = String(phone).trim();
    email = String(email).trim();
    vehicle = String(vehicle).trim();
    zip = String(zip).trim();
    message = String(message).trim();

    if (!name || !phone) {
      alert("Please enter your name and phone number so we can reach you.");
      return;
    }

    var subject = "Free Ceramic Coating Quote — " + name;
    var body = [
      "New quote request from leesburgceramiccoating.com",
      "",
      "Name: " + name,
      "Phone: " + phone,
      "Email: " + email,
      "Vehicle: " + vehicle,
      "ZIP / Neighborhood: " + zip,
      "",
      "Message:",
      message || "(none)"
    ].join("\r\n");

    var mailto =
      "mailto:hello@leesburgceramiccoating.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    // Open default mail client with pre-filled message
    window.location.href = mailto;

    if (success) {
      success.classList.add("is-visible");
    }

    // Soft reset after a beat so fields stay visible if mailto is cancelled
    setTimeout(function () {
      form.reset();
    }, 800);
  });
})();
