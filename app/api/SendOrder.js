const axios = require('axios');

// Simulated database of orders
const orderDatabase = new Map();

async function sendMessage(phoneNumber, message) {
  const token = 'YOUR_ACCESS_TOKEN';
  const url = `https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages`;

  const messageData = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: phoneNumber,
    type: 'text',
    text: { body: message }
  };

  try {
    const response = await axios.post(url, messageData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Message sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
    throw error;
  }
}

function formatOrderMessage(orderDetails) {
  const { orderNumber, items, total, shippingAddress, status } = orderDetails;

  let message = `Order Details:\n\n`;
  message += `Order Number: ${orderNumber}\n`;
  message += `Status: ${status}\n\n`;
  message += `Items:\n`;
  
  items.forEach(item => {
    message += `- ${item.name}: $${item.price.toFixed(2)} x ${item.quantity}\n`;
  });

  message += `\nTotal: $${total.toFixed(2)}\n\n`;
  message += `Shipping Address:\n${shippingAddress.street}\n${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}\n\n`;
  message += `To check your order status, reply with "STATUS ${orderNumber}"`;

  return message;
}

async function sendOrderToClient(phoneNumber, orderDetails) {
  const orderMessage = formatOrderMessage(orderDetails);
  await sendMessage(phoneNumber, orderMessage);

  // Save order to database
  orderDatabase.set(orderDetails.orderNumber, orderDetails);
}

async function handleIncomingMessage(phoneNumber, messageBody) {
  const words = messageBody.split(' ');
  if (words[0].toUpperCase() === 'STATUS' && words.length === 2) {
    const orderNumber = words[1];
    const order = orderDatabase.get(orderNumber);
    if (order) {
      const statusMessage = `Order ${orderNumber} status: ${order.status}`;
      await sendMessage(phoneNumber, statusMessage);
    } else {
      await sendMessage(phoneNumber, `Order ${orderNumber} not found.`);
    }
  } else {
    await sendMessage(phoneNumber, "To check your order status, please send 'STATUS' followed by your order number.");
  }
}

// Example usage
const orderDetails = {
  orderNumber: '12345',
  items: [
    { name: 'Widget A', price: 9.99, quantity: 2 },
    { name: 'Gadget B', price: 14.99, quantity: 1 }
  ],
  total: 34.97,
  shippingAddress: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345'
  },
  status: 'Processing'
};

// Sending an order confirmation
sendOrderToClient('RECIPIENT_PHONE_NUMBER', orderDetails)
  .then(() => console.log('Order sent successfully'))
  .catch((error) => console.error('Failed to send order:', error));

// Simulating an incoming message to check order status
setTimeout(() => {
  handleIncomingMessage('RECIPIENT_PHONE_NUMBER', 'STATUS 12345')
    .then(() => console.log('Status check handled successfully'))
    .catch((error) => console.error('Failed to handle status check:', error));
}, 5000);