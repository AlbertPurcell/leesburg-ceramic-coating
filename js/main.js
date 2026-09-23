/**
 * Leesburg Ceramic Coating — main.js
 * Mobile nav, phone from config, sticky mobile call bar, FormSubmit AJAX form.
 */
(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};
  var phoneDisplay = cfg.phoneDisplay || "(703) 643-9130";
  var phoneTel = cfg.phoneTel || "+17036439130";
  var formEndpoint =
    cfg.formEndpoint ||
    "https://formsubmit.co/ajax/" + (cfg.formEmail || "hello@leesburgceramiccoating.com");

  function applyPhones() {
    document.querySelectorAll(".js-phone").forEach(function (el) {
      el.textContent = phoneDisplay;
    });
    document.querySelectorAll(".js-phone-link").forEach(function (el) {
      el.setAttribute("href", "tel:" + phoneTel);
    });
  }

  function injectMobileCallBar() {
    if (document.querySelector(".mobile-call-bar")) return;

    var onContact = /contact\.html/i.test(window.location.pathname);
    var quoteHref = onContact ? "#quote-form" : "contact.html#quote-form";

    var bar = document.createElement("div");
    bar.className = "mobile-call-bar";
    bar.setAttribute("role", "navigation");
    bar.setAttribute("aria-label", "Quick contact");
    bar.innerHTML =
      '<a class="mobile-call-bar__btn mobile-call-bar__call js-phone-link" href="tel:' +
      phoneTel +
      '">Call Now</a>' +
      '<a class="mobile-call-bar__btn mobile-call-bar__quote" href="' +
      quoteHref +
      '">Free Quote</a>';
    document.body.appendChild(bar);
  }

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

  applyPhones();
  injectMobileCallBar();
  // Re-apply so sticky bar call link picks up js-phone-link class after inject
  applyPhones();

  // Contact form — FormSubmit.co AJAX (no mailto)
  var form = document.getElementById("quote-form");
  if (!form) return;

  var success = document.getElementById("form-success");
  var errorBox = document.getElementById("form-error");
  var submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (success) success.classList.remove("is-visible");
    if (errorBox) {
      errorBox.classList.remove("is-visible");
      errorBox.textContent = "";
    }

    var name = String((form.elements.namedItem("name") || {}).value || "").trim();
    var phone = String((form.elements.namedItem("phone") || {}).value || "").trim();
    var email = String((form.elements.namedItem("email") || {}).value || "").trim();
    var vehicle = String((form.elements.namedItem("vehicle") || {}).value || "").trim();
    var zip = String((form.elements.namedItem("zip") || {}).value || "").trim();
    var message = String((form.elements.namedItem("message") || {}).value || "").trim();
    var honey = String((form.elements.namedItem("_honey") || {}).value || "").trim();

    if (!name || !phone) {
      if (errorBox) {
        errorBox.textContent = "Please enter your name and phone number so we can reach you.";
        errorBox.classList.add("is-visible");
      } else {
        alert("Please enter your name and phone number so we can reach you.");
      }
      return;
    }

    // Honeypot filled — pretend success, do not submit
    if (honey) {
      window.location.href = "thank-you.html";
      return;
    }

    var payload = {
      name: name,
      phone: phone,
      email: email,
      vehicle: vehicle,
      zip: zip,
      message: message || "(none)",
      _subject: "Free Ceramic Coating Quote — " + name,
      _template: "table",
      _captcha: "false"
    };

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
    }

    fetch(formEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res.json().then(function (data) {
          return { ok: res.ok, data: data };
        });
      })
      .then(function (result) {
        if (result.ok) {
          window.location.href = "thank-you.html";
          return;
        }
        throw new Error(
          (result.data && (result.data.message || result.data.error)) ||
            "Something went wrong. Please try again or call us."
        );
      })
      .catch(function (err) {
        var msg =
          (err && err.message) ||
          "We could not send your request. Please call " + phoneDisplay + " or try again.";
        if (errorBox) {
          errorBox.textContent = msg;
          errorBox.classList.add("is-visible");
        } else {
          alert(msg);
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Request My Free Quote";
        }
      });
  });
})();
