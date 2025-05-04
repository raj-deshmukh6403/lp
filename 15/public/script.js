// Fetch product data and display it in the grid
fetch('/api/products')
  .then(response => response.json())
  .then(data => {
    const productGrid = document.getElementById('product-grid');
    data.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-details">
          <div class="product-name">${product.name}</div>
          <div class="product-price">$${product.price.toFixed(2)}</div>
        </div>
      `;
      productGrid.appendChild(productCard);
    });
  })
  .catch(error => console.error('Error fetching product data:', error));