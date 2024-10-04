export function getItemTotalPrice(selectedSizes:any) {
    return selectedSizes.reduce((accumulator:any, current:any) => {
      return accumulator + (current.price * current.quantity);
    }, 0);
  }
  