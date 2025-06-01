const CART_KEY = 'cart';
const PRICE_PER_LOAF = 10;

const BREAD_DATA = {
  'cinnamon-sugar-swirl': {
    name: 'Cinnamon-Sugar Swirl Loaf',
    imageSrc: 'https://placehold.co/600x400',
    price: PRICE_PER_LOAF,
  },
  'garlic-herb-loaf': {
    name: 'Garlic & Herb Loaf',
    imageSrc: 'https://placehold.co/600x400',
    price: PRICE_PER_LOAF,
  },
  'honey-oats-loaf': {
    name: 'Honey & Oats Loaf',
    imageSrc: 'https://placehold.co/600x400',
    price: PRICE_PER_LOAF,
  },
  'jalapeno-cheddar-loaf': {
    name: 'Jalapeño & Cheddar Loaf',
    imageSrc: 'https://placehold.co/600x400',
    price: PRICE_PER_LOAF,
  },
  'parmesan-black-pepper-loaf': {
    name: 'Parmesan & Black Pepper Loaf',
    imageSrc: 'https://placehold.co/600x400',
    price: PRICE_PER_LOAF,
  },
  'pure-hearth-loaf': {
    name: 'Pure Hearth Loaf',
    imageSrc: 'https://placehold.co/600x400',
    price: PRICE_PER_LOAF,
  },
};

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

let cart = loadCart();

function updateCartPreview() {
  const preview = document.getElementById('cart-preview');
  if (!preview) return;
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = totalItems * PRICE_PER_LOAF;
  preview.textContent = `${totalItems} Item${totalItems === 1 ? '' : 's'} – $${
    totalPrice.toFixed(2)
  }`;
}

function updateTotal() {
  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const data = BREAD_DATA[id];
    return sum + (data ? data.price * qty : 0);
  }, 0);
  const totalEl = document.getElementById('cart-total');
  if (totalEl) totalEl.textContent = '$' + total.toFixed(2);
}

function renderCart() {
  const tbody = document.getElementById('cart-items');
  if (!tbody) {
    updateCartPreview();
    return;
  }
  const empty = document.getElementById('empty');
  const container = document.getElementById('cart-container');

  tbody.innerHTML = '';

  const entries = Object.entries(cart);
  if (entries.length === 0) {
    empty.style.display = 'block';
    container.style.display = 'none';
    updateTotal();
    updateCartPreview();
    return;
  }

  empty.style.display = 'none';
  container.style.display = 'block';

  entries.forEach(([id, qty]) => {
    const data = BREAD_DATA[id] || { name: id, imageSrc: '', price: PRICE_PER_LOAF };
    const tr = document.createElement('tr');

    const imgTd = document.createElement('td');
    if (data.imageSrc) {
      const img = document.createElement('img');
      img.src = data.imageSrc;
      img.alt = data.name;
      img.width = 60;
      imgTd.appendChild(img);
    }

    const nameTd = document.createElement('td');
    nameTd.textContent = data.name;

    const priceTd = document.createElement('td');
    priceTd.textContent = '$' + data.price.toFixed(2);

    const qtyTd = document.createElement('td');
    const decBtn = document.createElement('button');
    decBtn.textContent = '\u2212';
    const qtySpan = document.createElement('span');
    qtySpan.textContent = qty;
    qtySpan.className = 'quantity';
    const incBtn = document.createElement('button');
    incBtn.textContent = '+';
    qtyTd.appendChild(decBtn);
    qtyTd.appendChild(qtySpan);
    qtyTd.appendChild(incBtn);

    const subTd = document.createElement('td');
    subTd.textContent = '$' + (data.price * qty).toFixed(2);

    tr.appendChild(imgTd);
    tr.appendChild(nameTd);
    tr.appendChild(priceTd);
    tr.appendChild(qtyTd);
    tr.appendChild(subTd);
    tbody.appendChild(tr);

    function sync() {
      qtySpan.textContent = cart[id];
      subTd.textContent = '$' + (data.price * cart[id]).toFixed(2);
      incBtn.disabled = cart[id] >= 5;
    }

    decBtn.addEventListener('click', () => {
      cart[id] -= 1;
      if (cart[id] <= 0) {
        delete cart[id];
        saveCart(cart);
        renderCart();
      } else {
        sync();
        saveCart(cart);
        updateTotal();
        updateCartPreview();
      }
    });

    incBtn.addEventListener('click', () => {
      if (cart[id] < 5) {
        cart[id] += 1;
        sync();
        saveCart(cart);
        updateTotal();
        updateCartPreview();
      }
    });

    sync();
  });

  updateTotal();
  updateCartPreview();
}

function initAddToCartButtons() {
  document.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-loaf-id');
      if (!id) return;
      const warning = btn.parentElement?.querySelector('.warning');
      if (cart[id] && cart[id] >= 5) {
        if (warning) {
          warning.textContent = 'Cannot order more than 5 of each loaf.';
          warning.style.display = 'block';
        }
        return;
      }
      cart[id] = (cart[id] || 0) + 1;
      if (warning) warning.style.display = 'none';
      saveCart(cart);
      updateCartPreview();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  cart = loadCart();
  initAddToCartButtons();
  renderCart();
});
