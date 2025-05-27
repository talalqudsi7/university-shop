
  const bar   = document.getElementById('bar');
  const close = document.getElementById('close');
  const nav   = document.getElementById('navbar');

  if (bar) {
    bar.addEventListener('click', () => {
      nav.classList.add('active');
    });
  }

  if (close) {
    close.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  }

  /* ------------------  ------------------ 
  const mainImg = document.getElementById('MainImg');
        const smallImgs = document.getElementsByClassName('small-img');

        for (let i = 0; i < smallImgs.length; i++) {
            smallImgs[i].onclick = function () {
                mainImg.src = smallImgs[i].src;
            }
        }
   ------------------  ------------------ */

  /* ------------------ إضافة إلى السلة ------------------ */
  function addToCart() {
    const size = document.getElementById('sizeSelect').value;
    const qty  = parseInt(document.getElementById('qtyInput').value) || 1;

    if (!size) {
      alert('Please select a size before adding to the cart.');
      return;
    }

    const name  = document.querySelector('.single-pro-details h4').innerText;
    const price = document.querySelector('.single-pro-details h2').innerText;
    const image = document.getElementById('MainImg').src;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price, image, size, quantity: qty, addedAt: Date.now() });
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('The product has been added to the cart!');
    window.location.href = 'cart.html';
  }

  /* ------------------ تحميل السلة ------------------ */
  function loadCart() {
    const tbody   = document.querySelector('#cart tbody');
    const subCell = document.getElementById('cartSubtotal');
    const totCell = document.querySelector('#grandTotal strong') || document.getElementById('grandTotal');

    if (!tbody) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    tbody.innerHTML = '';

    let total = 0;

    cart.forEach((item, i) => {
      const priceNum = parseTL(item.price);
      const subtotal = priceNum * item.quantity;
      total += subtotal;

      tbody.insertAdjacentHTML('beforeend', `
        <tr>
          <td><a href="#" onclick="removeFromCart(${i})"><i class="fa fa-times-circle"></i></a></td>
          <td><img src="${item.image}" width="50"></td>
          <td>${item.name}<br><small>Size: ${item.size}</small></td>
          <td>${item.price}</td>
          <td><input type="number" value="${item.quantity}" min="1" onchange="updateQty(${i}, this.value)"></td>
          <td>${formatTL(subtotal)}</td>
        </tr>
      `);
    });

    if (subCell) subCell.textContent = formatTL(total);
    if (totCell) totCell.textContent = formatTL(total);
  }

  /* ------------------ تحديث الكمية ------------------ */
  function updateQty(i, q) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[i].quantity = Math.max(1, parseInt(q) || 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }

  /* ------------------ حذف عنصر ------------------ */
  function removeFromCart(i) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(i, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }

  /* ------------------ أدوات الأسعار ------------------ */
  function parseTL(str) {
    return parseFloat(
      str.replace(/[^\d,]/g, '').replace(/\./g, '').replace(',', '.')
    );
  }

  function formatTL(num) {
    return num.toLocaleString('tr-TR', { minimumFractionDigits: 2 }) + ' TL';
  }

  /* ------------------ تغيير الصورة الرئيسية ------------------ */
  document.querySelectorAll('.small-img').forEach(img => {
    img.addEventListener('click', () => {
      document.getElementById('MainImg').src = img.src;
    });
  });

  /* ------------------ تحميل السلة عند فتح الصفحة ------------------ */
  document.addEventListener('DOMContentLoaded', loadCart);

