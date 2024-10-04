export function calceach(orderarr: any, cb: any) {
  const totaleach = orderarr.map((order: any) => order.price * order.quantity);

 return cb(totaleach);
}

export function itemtotal(totaleach: []) {
  const total = totaleach.reduce((acc, current) => acc + current, 0);
  console.log(total);
  return total
}

// const itgem =  {
//     detail: {
//       id: "1",
//       name: "Spaghetti Carbonara",
//       description: "Creamy pasta dish with eggs, cheese, and pancetta",
//       category: "Italian",
//       tags: ["pasta", "creamy"],
//       options: [
//         { size: "small", price: 12.99, quantity: 1 },
//         { size: "medium", price: 20.99, quantity: 1 },
//         { size: "large", price: 30.99, quantity: 1 },
//       ],
//       image: "/images/lobia.png",
//       ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan cheese", "Black pepper"],
//     },
//     order: {
//       options: [
//         { size: "medium", price: 20.99, quantity: 1 },
//         { size: "large", price: 30.99, quantity: 1 },
//       ],
//       total: 0,
//     },
//   }

export class cartItem {
  
  obj: any | Object;
  order: any;
  constructor(obj: any) {
    Object.assign(this, obj);

    // this.order.total = calceach(this.order.options, (totaleach: any) => {
    //    return itemtotal(totaleach);
    //   })
   
  }

}

export function sendOrderToWhatsApp(orderDetails:any, phoneNumber:any) {
  const message = encodeURIComponent(`New Order:\n${orderDetails}`);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
}
