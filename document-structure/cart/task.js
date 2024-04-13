const btnAdd = document.querySelectorAll('.product__add');
const cart = document.querySelector('.cart__products');
const btnsInc = document.querySelectorAll('.product__quantity-control_inc');
const btnsDec = document.querySelectorAll('.product__quantity-control_dec');
const btnClear = document.querySelector('.btn__clear');
let savedCart = JSON.parse(localStorage.getItem('cartIteam')) || [];

window.addEventListener('load', () => {
    restoreFromLocalStorage();
});

function updateLocalStorage() {
    localStorage.setItem('cartIteam', JSON.stringify(savedCart));
};

function restoreFromLocalStorage() {
    savedCart.forEach(product => {
      renderCartItem(product);
    });
};

function renderCartItem(product) {
  cart.insertAdjacentHTML('beforeend', `
      <div class="cart__product" data-id="${product.dataId}">
          <img class="cart__product-image" src="${product.imageSrc}">
          <div class="cart__product-count">${product.count}</div>
      </div>
  `);
};

btnsInc.forEach(btn => {
    btn.addEventListener('click', (event) => {
        const product = event.target.closest('.product');
        const countElement = product.querySelector('.product__quantity-value');
        const productCount = parseInt(countElement.textContent);
        const newProductCount = productCount + 1;
        countElement.textContent = newProductCount;
    });
});

btnsDec.forEach(btn => {
    btn.addEventListener('click', (event) => {
        const product = event.target.closest('.product');
        const countElement = product.querySelector('.product__quantity-value');
        const productCount = parseInt(countElement.textContent);
        if (productCount > 1) {
            const newProductCount = productCount - 1;
            countElement.textContent = newProductCount;
        } else {
            return 1;
        }
    });
});

btnAdd.forEach(btn => {
    btn.addEventListener('click', event => {
        const product = event.target.closest('.product');
        const dataId = product.getAttribute('data-id');
        const image = product.querySelector('.product__image');
        const imageSrc = image.getAttribute('src');
        const cartCountElement = product.querySelector('.product__quantity-value');
        const cartProductCount = parseInt(cartCountElement.textContent);

        const existingProduct = cart.querySelector(`.cart__product[data-id="${dataId}"]`);

        if (existingProduct) {
            const existingCountElement = existingProduct.querySelector('.cart__product-count');
            let existingProductCount = parseInt(existingCountElement.textContent);
            existingProductCount += cartProductCount;
            existingCountElement.textContent = existingProductCount;

            const existingProductIndex = savedCart.findIndex(item => item.dataId === dataId);
            savedCart[existingProductIndex].count = existingProductCount;
        } else {
          savedCart.push({
            dataId: dataId,
            imageSrc: imageSrc,
            count: cartProductCount
          });
          renderCartItem(savedCart[savedCart.length - 1]);
        }
        updateLocalStorage();
    });
});

//очистить корзину полностью
btnClear.addEventListener('click', () => {
  savedCart = [];
  cart.innerHTML = '';
  updateLocalStorage();
});


