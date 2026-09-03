/* The Squishy Store — theme scripts. */
(function () {
  'use strict';

  var moneyFormat = window.SQ && window.SQ.moneyFormat ? window.SQ.moneyFormat : '£{{amount}}';

  function formatMoney(cents) {
    return moneyFormat.replace(/\{\{\s*amount[a-z_]*\s*\}\}/, (cents / 100).toFixed(2));
  }

  /* Mobile menu */
  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('[data-menu-toggle]');
    if (toggle) {
      var nav = document.querySelector('[data-site-nav]');
      if (nav) {
        var open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
    }
  });

  /* Scroll-in animation */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.animate-in').forEach(function (el) { observer.observe(el); });
  } else {
    document.querySelectorAll('.animate-in').forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Toast */
  function toast(message) {
    var el = document.querySelector('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('is-visible');
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.classList.remove('is-visible'); }, 2600);
  }

  function updateCartCount(count) {
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.textContent = count;
      el.hidden = count === 0;
    });
  }

  /* Hero slideshow: crossfade between background photos */
  document.querySelectorAll('[data-hero-slideshow]').forEach(function (wrap) {
    var slides = wrap.querySelectorAll('.hero__slide');
    if (slides.length < 2) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var current = 0;
    var interval = (parseInt(wrap.dataset.interval, 10) || 5) * 1000;
    setInterval(function () {
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
    }, interval);
  });

  /* Swap the product gallery's main image. The main img carries a srcset for responsive loading; a srcset always wins
     over a JS-set src, so it must be removed when swapping. */
  function setGalleryMain(main, fullUrl, alt) {
    main.removeAttribute('srcset');
    main.removeAttribute('sizes');
    main.src = fullUrl;
    if (alt) main.alt = alt;
  }

  /* ------------------------------------------------------------------ */
  /* Buy box — Buy One / Two / Three tiers                               */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('[data-buy-box]').forEach(function (box) {
    var variantId = parseInt(box.dataset.variantId, 10);
    var tiers = Array.prototype.slice.call(box.querySelectorAll('[data-tier]'));
    var addBtn = box.querySelector('[data-buy-add]');
    var priceEl = box.querySelector('[data-buy-price]');
    var compareEl = box.querySelector('[data-buy-compare]');
    var errorEl = box.querySelector('[data-buy-error]');

    function selected() {
      var input = box.querySelector('input[name="tier"]:checked') || box.querySelector('input[name="tier"]');
      return input;
    }

    function render() {
      var input = selected();
      if (!input) return;
      tiers.forEach(function (t) { t.classList.toggle('is-selected', t.contains(input)); });
      var price = parseInt(input.dataset.price, 10);
      var compare = parseInt(input.dataset.compare, 10);
      if (priceEl) priceEl.textContent = formatMoney(price);
      if (compareEl) {
        compareEl.textContent = formatMoney(compare);
        compareEl.hidden = !(compare > price);
      }
    }

    tiers.forEach(function (t) {
      var input = t.querySelector('input[name="tier"]');
      if (input) input.addEventListener('change', render);
    });

    if (addBtn) {
      addBtn.addEventListener('click', function () {
        var input = selected();
        var qty = input ? parseInt(input.value, 10) : 1;
        addBtn.disabled = true;
        var original = addBtn.innerHTML;
        addBtn.textContent = 'Adding…';
        if (errorEl) errorEl.style.display = 'none';
        fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: [{ id: variantId, quantity: qty }] })
        })
          .then(function (r) {
            if (!r.ok) return r.json().then(function (d) { throw new Error(d.description || 'Could not add to basket'); });
            return r.json();
          })
          .then(function () { return fetch('/cart.js').then(function (r) { return r.json(); }); })
          .then(function (cart) {
            updateCartCount(cart.item_count);
            window.location.href = window.SQ && window.SQ.cartUrl ? window.SQ.cartUrl : '/cart';
          })
          .catch(function (err) {
            if (errorEl) {
              errorEl.textContent = err.message;
              errorEl.style.display = 'block';
            }
            addBtn.disabled = false;
            addBtn.innerHTML = original;
          });
      });
    }

    render();
  });

  /* ------------------------------------------------------------------ */
  /* Squeeze Me — tap to dimple, slow rise back                          */
  /* ------------------------------------------------------------------ */
  function squeezeAt(body, clientX, clientY) {
    var rect = body.getBoundingClientRect();
    var x = ((clientX - rect.left) / rect.width) * 100;
    var y = ((clientY - rect.top) / rect.height) * 100;
    var dimples = body.querySelector('[data-dimples]');
    if (dimples) {
      var d = document.createElement('span');
      d.className = 'squeeze__dimple';
      d.style.left = x + '%';
      d.style.top = y + '%';
      dimples.appendChild(d);
      d.addEventListener('animationend', function () { d.remove(); });
    }
    /* squash toward the touch point, then rise back slowly */
    body.style.transformOrigin = x + '% ' + y + '%';
    body.classList.remove('is-rising');
    body.style.transform = 'scale(1.06, 0.9)';
    var wrap = body.closest('[data-squeeze]');
    if (wrap) wrap.classList.add('is-squeezing');
    clearTimeout(body._rise);
    body._rise = setTimeout(function () {
      body.classList.add('is-rising');
      body.style.transform = '';
      if (wrap) setTimeout(function () { wrap.classList.remove('is-squeezing'); }, 2600);
    }, 130);
    if (navigator.vibrate) { try { navigator.vibrate(12); } catch (e) {} }
  }

  function makeSqueezable(body) {
    body.addEventListener('pointerdown', function (e) {
      squeezeAt(body, e.clientX, e.clientY);
    });
    body.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var r = body.getBoundingClientRect();
        squeezeAt(body, r.left + r.width / 2, r.top + r.height / 2);
      }
    });
  }
  document.querySelectorAll('[data-squeeze] [data-squeeze-body]').forEach(makeSqueezable);

  /* ------------------------------------------------------------------ */
  /* Product gallery thumbnails                                          */
  /* ------------------------------------------------------------------ */
  var galleryMain = document.querySelector('[data-gallery-main] img');
  if (galleryMain) {
    document.querySelectorAll('[data-gallery-thumb]').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var altImg = thumb.querySelector('img');
        setGalleryMain(galleryMain, thumb.dataset.full, altImg ? altImg.alt : '');
        document.querySelectorAll('[data-gallery-thumb]').forEach(function (t) {
          t.classList.toggle('is-active', t === thumb);
        });
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Cart page quantity controls                                         */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('[data-cart-qty]').forEach(function (wrap) {
    var input = wrap.querySelector('input');
    wrap.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var delta = btn.dataset.dir === 'up' ? 1 : -1;
        var next = Math.max(0, parseInt(input.value || '0', 10) + delta);
        input.value = next;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });
    input.addEventListener('change', function () {
      var line = parseInt(wrap.dataset.line, 10);
      fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ line: line, quantity: parseInt(input.value || '0', 10) })
      })
        .then(function (r) { return r.json(); })
        .then(function () { window.location.reload(); })
        .catch(function () { toast('Something went wrong — please refresh.'); });
    });
  });
})();
