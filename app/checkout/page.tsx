import Checkout from "../components/checkout/Checkout";
import Page from "../components/Page";
import Items from "../components/cart/Items";
import Summary from "../components/cart/Summary";

const page = () => {
  return (
    <Page className="md:p-10 p-2 w-full min-h-[35vh] grid md:grid-cols-3 items-center gap-10 ">
      <Items />
      <Summary />
      <Checkout />
    </Page>
  );
};

export default page;
