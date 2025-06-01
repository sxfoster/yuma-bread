(function() {
  const MAX_QTY = 5;
  const STORAGE_KEY = 'cart';
  let cart = {};

  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      cart = raw ? JSON.parse(raw) : {};
    } catch (e) {
      cart = {};
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }

  function updateCartPreview() {
    const preview = document.getElementById('cart-preview');
    if (!preview) return;
    let totalItems = 0;
    let totalPrice = 0;
    for (const [loafId, qty] of Object.entries(cart)) {
      totalItems += qty;
      const btn = document.querySelector(`.add-to-cart-btn[data-loaf-id="${loafId}"]`);
      const price = btn ? parseFloat(btn.dataset.price || '0') : 0;
      totalPrice += price * qty;
    }
    preview.textContent = `${totalItems} Item${totalItems === 1 ? '' : 's'} – $${totalPrice.toFixed(2)}`;
  }

  function showWarning(btn) {
    let warn = btn.parentElement.querySelector('.warning');
    if (!warn) {
      warn = document.createElement('span');
      warn.className = 'warning';
      warn.textContent = 'Cannot order more than 5 of each loaf.';
      warn.style.color = 'red';
      warn.style.display = 'block';
      warn.style.marginTop = '4px';
      btn.parentElement.appendChild(warn);
    }
  }

  function clearWarning(btn) {
    const warn = btn.parentElement.querySelector('.warning');
    if (warn) warn.remove();
  }

  function setupAddToCartButtons() {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.loafId;
        if (!id) return;
        const qty = cart[id] || 0;
        if (qty >= MAX_QTY) {
          showWarning(btn);
          return;
        }
        cart[id] = qty + 1;
        clearWarning(btn);
        saveCart();
        updateCartPreview();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateCartPreview();
    setupAddToCartButtons();
  });
})();
