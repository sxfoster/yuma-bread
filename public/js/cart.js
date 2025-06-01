const CART_KEY = 'cart';

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function updateTotal(cart) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById('cart-total').textContent = '$' + total.toFixed(2);
}

function renderCart() {
  const cart = loadCart();
  const tbody = document.getElementById('cart-items');
  const empty = document.getElementById('empty');
  const container = document.getElementById('cart-container');

  tbody.innerHTML = '';

  if (cart.length === 0) {
    empty.style.display = 'block';
    container.style.display = 'none';
    updateTotal(cart);
    return;
  }

  empty.style.display = 'none';
  container.style.display = 'block';

  cart.forEach(item => {
    const tr = document.createElement('tr');

    const imgTd = document.createElement('td');
    const img = document.createElement('img');
    img.src = item.imageSrc;
    img.alt = item.name;
    img.width = 60;
    imgTd.appendChild(img);

    const nameTd = document.createElement('td');
    nameTd.textContent = item.name;

    const priceTd = document.createElement('td');
    priceTd.textContent = '$' + item.price.toFixed(2);

    const qtyTd = document.createElement('td');
    const decBtn = document.createElement('button');
    decBtn.textContent = '\u2212';
    const qtySpan = document.createElement('span');
    qtySpan.textContent = item.quantity;
    qtySpan.className = 'quantity';
    const incBtn = document.createElement('button');
    incBtn.textContent = '+';
    qtyTd.appendChild(decBtn);
    qtyTd.appendChild(qtySpan);
    qtyTd.appendChild(incBtn);

    const subTd = document.createElement('td');
    subTd.textContent = '$' + (item.price * item.quantity).toFixed(2);

    tr.appendChild(imgTd);
    tr.appendChild(nameTd);
    tr.appendChild(priceTd);
    tr.appendChild(qtyTd);
    tr.appendChild(subTd);
    tbody.appendChild(tr);

    function sync() {
      qtySpan.textContent = item.quantity;
      subTd.textContent = '$' + (item.price * item.quantity).toFixed(2);
      incBtn.disabled = item.quantity >= 5;
    }

    decBtn.addEventListener('click', () => {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        const index = cart.findIndex(i => i.id === item.id);
        if (index > -1) cart.splice(index, 1);
        saveCart(cart);
        renderCart();
      } else {
        sync();
        saveCart(cart);
        updateTotal(cart);
      }
    });

    incBtn.addEventListener('click', () => {
      if (item.quantity < 5) {
        item.quantity += 1;
        sync();
        saveCart(cart);
        updateTotal(cart);
      }
    });

    sync();
  });

  updateTotal(cart);
}

document.addEventListener('DOMContentLoaded', renderCart);
