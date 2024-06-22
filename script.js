// Mostrar/ocultar carrito
const btnCart = document.querySelector('.container-cart-icon');
const containercartproducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containercartproducts.classList.toggle('hidden-cart');
});

/* ============================================ */
// Elementos del carrito
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productlist = document.querySelector('.container-items');

// Variable de arreglos de productos
let allproducts = [];

const valortotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');

// Añadir producto al carrito
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

// Eliminar o restar producto del carrito
rowProduct.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
        console.log('Icon close clicked');
        const productElement = e.target.closest('.cart-product'); // Usa closest para asegurarte de seleccionar correctamente el elemento
        const title = productElement.querySelector('.titulo-producto-carrito').textContent;

        console.log('Product title:', title);

        const product = allproducts.find(product => product.title === title);

        if (product) {
            if (product.quantity > 1) {
                product.quantity--;
            } else {
                allproducts = allproducts.filter(product => product.title !== title);
            }
        } else {
            console.log('Product not found in cart');
        }

        showhtml();
    }
});

// Mostrar el HTML del carrito
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
        total += parseInt(product.quantity * product.price.slice(1));
        totalofproducts += product.quantity;
    });

    if (!allproducts.length) {
        rowProduct.innerHTML = `
        <p class="cart-empty">El carrito está vacío</p>`;
    }

    valortotal.innerText = `$${total}`;
    countProducts.innerText = totalofproducts;
};
