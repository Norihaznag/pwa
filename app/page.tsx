import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: 1,
    title: "Fast Delivery",
    description: "From our kitchen to your doorstep in minutes",
    imageUrl: "/images/shipping.png",
  },
  {
    id: 2,
    title: "Pay After Delivery",
    description: "Secure payment after receiving your order",
    imageUrl: "/images/pay.png",
  },
  {
    id: 3,
    title: "Quality Food",
    description: "Delicious dishes at affordable prices",
    imageUrl: "/images/cheap.png",
  },
];

const popularDishes = [
  { id: 1, name: "Margherita Pizza", price: "$12.99", imageUrl: "/api/placeholder/200/200" },
  { id: 2, name: "Chicken Burger", price: "$8.99", imageUrl: "/api/placeholder/200/200" },
  { id: 3, name: "Caesar Salad", price: "$7.99", imageUrl: "/api/placeholder/200/200" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:px-[5%]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Delicious Food,
              <span className="text-orange-500 block">Delivered Fast</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Experience the best local cuisine from top-rated restaurants, 
              delivered right to your doorstep.
            </p>
            <Link href="/dishes/all" 
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200">
              Explore Menu
            </Link>
          </div>
          <div className="flex-1 relative h-[400px]">
            <Image 
              src="/images/main.png"
              alt="Delicious Food Spread"
              fill
              className="object-contain rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-orange-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="relative h-40 mb-4">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dishes Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Dishes</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {popularDishes.map((dish) => (
            <div key={dish.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="relative h-48">
                <Image
                  src={"/images/placeholder.svg"}
                  alt={dish.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-orange-500 font-bold">{dish.price}</span>
                  <button className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Order?</h2>
          <p className="mb-8 text-lg">get 20% off on your first order!</p>
          <Link href="/download" 
                className="inline-block bg-white text-orange-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Order Now !
          </Link>
        </div>
      </section>
    </div>
  );
}