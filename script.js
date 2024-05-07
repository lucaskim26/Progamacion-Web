const btnCart = document.querySelector('.container-cart-icon');
const containercartproducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containercartproducts.classList.toggle('hidden-cart');
});

/* ============================================ */
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productlist = document.querySelector('.container-items');

// Variable de arreglos de productos
let allproducts = [];

const valortotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');

productlist.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        };
        const exists = allproducts.some(product => product.title === infoProduct.title);
        if (exists) {
            const products = allproducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            });
            allproducts = [...products];
        } else {
            allproducts = [...allproducts, infoProduct];
        }
        if (containercartproducts.classList.contains('hidden-cart')) {
            containercartproducts.classList.remove('hidden-cart');
        }
        showhtml();
    }
});

rowProduct.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        allproducts = allproducts.filter(product => product.title !== title);
        showhtml();
    }
});

const showhtml = () => {
    rowProduct.innerHTML = '';

    let total = 0;
    let totalofproducts = 0;

    allproducts.forEach(product => {
        const containerproduct = document.createElement('div');
        containerproduct.classList.add('cart-product');

        containerproduct.innerHTML = `
        <div class="info-cart-product">
            <span class="cantidad-producto-carrito">${product.quantity}</span>
            <p class="titulo-producto-carrito">${product.title}</p>
            <p class="precio-carrito-producto">${product.price}</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        `;

        rowProduct.append(containerproduct);
        total = total + parseInt(product.quantity * product.price.slice(1));
        totalofproducts = totalofproducts + product.quantity;
    });

    if (!allproducts.length) {
        rowProduct.innerHTML = `
        <p class="cart-empty">El carrito está vacío</p>`;
    }

    valortotal.innerText = `$${total}`;
    countProducts.innerText = totalofproducts;
};
