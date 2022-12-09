const orderId = new URL(window.location.href).searchParams.get('orderId');

document.getElementById('orderId').textContent = orderId;
