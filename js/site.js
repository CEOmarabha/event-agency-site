(function () {
  "use strict";

  var brand = window.BRAND;
  if (!brand || !brand.name) return;

  var FALLBACK_NAME = "Northlight";

  function replaceName(value) {
    if (!value || brand.name === FALLBACK_NAME) return value;
    return String(value).split(FALLBACK_NAME).join(brand.name);
  }

  document.querySelectorAll("[data-brand]").forEach(function (node) {
    var key = node.getAttribute("data-brand");
    var value = brand[key];
    if (value == null || typeof value !== "string") return;
    if (key === "email" && node.tagName === "A") {
      node.setAttribute("href", "mailto:" + value);
    }
    node.textContent = value;
  });

  document.querySelectorAll("[data-brand-href]").forEach(function (node) {
    var key = node.getAttribute("data-brand-href");
    if (typeof brand[key] === "string") node.setAttribute("href", brand[key]);
  });

  if (brand.name !== FALLBACK_NAME) {
    document.title = replaceName(document.title);
    document.querySelectorAll("meta[content]").forEach(function (meta) {
      var content = meta.getAttribute("content");
      if (content && content.indexOf(FALLBACK_NAME) !== -1) {
        meta.setAttribute("content", replaceName(content));
      }
    });
  }

  var origin = String(brand.siteUrl || "").replace(/\/$/, "");
  var path = document.body.getAttribute("data-path") || "/";
  if (path.charAt(0) !== "/") path = "/" + path;
  var canonical = origin + path;

  var canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink && origin) canonicalLink.setAttribute("href", canonical);

  function setMeta(selector, value) {
    var el = document.querySelector(selector);
    if (el && value) el.setAttribute("content", value);
  }

  if (origin) {
    setMeta('meta[property="og:url"]', canonical);
    setMeta('meta[property="og:image"]', origin + "/og.png");
    setMeta('meta[name="twitter:image"]', origin + "/og.png");
    setMeta('meta[property="og:site_name"]', brand.name);
  }
  setMeta('meta[property="og:title"]', document.title);
  setMeta('meta[name="twitter:title"]', document.title);

  var ld = document.getElementById("ld-org");
  if (ld && origin) {
    var areas = (brand.regions || []).map(function (regionName) {
      return { "@type": "AdministrativeArea", name: regionName };
    });
    var data = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: brand.name,
          url: origin + "/",
          email: brand.email,
          description: brand.description,
          logo: origin + "/favicon.svg",
          sameAs: brand.github ? [brand.github] : [],
        },
        {
          "@type": "ProfessionalService",
          name: brand.name,
          url: origin + "/",
          email: brand.email,
          description: brand.description,
          image: origin + "/og.png",
          areaServed: areas,
          serviceType: [
            "Wedding vendor matching",
            "Quinceañera vendor matching",
            "Birthday vendor matching",
            "Block party vendor matching",
            "Corporate event vendor matching",
            "Festival staffing referrals",
            "Park event vendor matching",
          ],
        },
      ],
    };
    ld.textContent = JSON.stringify(data);
  }

  document.querySelectorAll("nav a[href]").forEach(function (anchor) {
    var href = anchor.getAttribute("href");
    if (!href || href.charAt(0) !== "/") return;
    if (href === path) anchor.setAttribute("aria-current", "page");
    else anchor.removeAttribute("aria-current");
  });

  document.querySelectorAll("[data-tier-pick]").forEach(function (link) {
    link.addEventListener("click", function () {
      var select = document.getElementById("tier");
      var tier = link.getAttribute("data-tier-pick");
      if (select && tier) select.value = tier;
    });
  });

  document.querySelectorAll("form[data-netlify]").forEach(function (form) {
    var locked = false;
    form.addEventListener("submit", function (event) {
      if (!form.checkValidity()) return;
      if (locked) {
        event.preventDefault();
        return;
      }
      locked = true;
      var button = form.querySelector('button[type="submit"]');
      if (button) {
        button.setAttribute("aria-disabled", "true");
        button.textContent = "Sending…";
      }
    });
  });
})();
