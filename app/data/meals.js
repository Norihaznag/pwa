
  export const meals = 
    [
      {
        detail: {
          id: "1",
          name: "Spaghetti Carbonara",
          description: "Creamy pasta dish with eggs, cheese, and pancetta",
          category: "Italian",
          tags: ["pasta", "creamy"],
          options: [
            { size: "small", price: 12.99, quantity: 0 },
            { size: "medium", price: 20.99, quantity: 0 },
            { size: "large", price: 30.99, quantity: 0 },
          ],
          image: "/images/spaghetti_carbonara.png",
          ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan cheese", "Black pepper"],
        },
        order: {
          options: [],
          total: 2,
        },
      },
      {
        detail: {
          id: "2",
          name: "Margherita Pizza",
          description: "Classic pizza with tomato sauce, mozzarella, and basil",
          category: "Italian",
          tags: ["pizza", "vegetarian"],
          options: [
            { size: "small", price: 10.99, quantity: 1 },
            { size: "medium", price: 14.99, quantity: 1 },
            { size: "large", price: 18.99, quantity: 1 },
          ],
          image: "/images/margherita_pizza.png",
          ingredients: ["Pizza dough", "Tomato sauce", "Fresh mozzarella", "Basil", "Olive oil"],
        },
        order: {
          options: [],
          total: 0,
        },
      },
      {
        detail: {
          id: "3",
          name: "Chicken Tikka Masala",
          description: "Grilled chicken in a creamy tomato-based sauce",
          category: "Indian",
          tags: ["spicy", "curry"],
          options: [
            { size: "small", price: 13.99, quantity: 1 },
            { size: "medium", price: 18.99, quantity: 1 },
            { size: "large", price: 23.99, quantity: 1 },
          ],
          image: "/images/chicken_tikka_masala.png",
          ingredients: ["Chicken", "Yogurt", "Tomatoes", "Cream", "Spices"],
        },
        order: {
          options: [],
          total: 0,
        },
      },
      {
        detail: {
          id: "4",
          name: "Caesar Salad",
          description: "Fresh romaine lettuce with Caesar dressing and croutons",
          category: "American",
          tags: ["salad", "healthy"],
          options: [
            { size: "small", price: 8.99, quantity: 1 },
            { size: "medium", price: 11.99, quantity: 1 },
            { size: "large", price: 14.99, quantity: 1 },
          ],
          image: "/images/caesar_salad.png",
          ingredients: ["Romaine lettuce", "Croutons", "Parmesan cheese", "Caesar dressing", "Black pepper"],
        },
        order: {
          options: [],
          total: 0,
        },
      },
      {
        detail: {
          id: "5",
          name: "Beef Burger",
          description: "Juicy beef patty with lettuce, tomato, and cheese",
          category: "American",
          tags: ["burger", "fast food"],
          options: [
            { size: "single", price: 9.99, quantity: 1 },
            { size: "double", price: 13.99, quantity: 1 },
            { size: "triple", price: 16.99, quantity: 1 },
          ],
          image: "/images/beef_burger.png",
          ingredients: ["Beef patty", "Bun", "Lettuce", "Tomato", "Cheese"],
        },
        order: {
          options: [],
          total: 0,
        },
      },
      {
        detail: {
          id: "6",
          name: "Pad Thai",
          description: "Stir-fried rice noodles with tofu, shrimp, and peanuts",
          category: "Thai",
          tags: ["noodles", "spicy"],
          options: [
            { size: "small", price: 11.99, quantity: 1 },
            { size: "medium", price: 15.99, quantity: 1 },
            { size: "large", price: 19.99, quantity: 1 },
          ],
          image: "/images/pad_thai.png",
          ingredients: ["Rice noodles", "Tofu", "Shrimp", "Peanuts", "Tamarind sauce"],
        },
        order: {
          options: [],
          total: 0,
        },
      },
      {
        detail: {
          id: "7",
          name: "Sushi Roll Combo",
          description: "Assorted sushi rolls with soy sauce and wasabi",
          category: "Japanese",
          tags: ["sushi", "raw fish"],
          options: [
            { size: "8 pieces", price: 14.99, quantity: 1 },
            { size: "12 pieces", price: 19.99, quantity: 1 },
            { size: "16 pieces", price: 24.99, quantity: 1 },
          ],
          image: "/images/sushi_roll_combo.png",
          ingredients: ["Sushi rice", "Nori", "Salmon", "Tuna", "Avocado"],
        },
        order: {
          options: [],
          total: 0,
        },
      },
      {
        detail: {
          id: "8",
          name: "Greek Salad",
          description: "Fresh vegetables with feta cheese and olives",
          category: "Greek",
          tags: ["salad", "vegetarian"],
          options: [
            { size: "small", price: 9.99, quantity: 1 },
            { size: "medium", price: 12.99, quantity: 1 },
            { size: "large", price: 15.99, quantity: 1 },
          ],
          image: "/images/greek_salad.png",
          ingredients: ["Cucumber", "Tomatoes", "Feta cheese", "Olives", "Red onion"],
        },
        order: {
          options: [],
          total: 0,
        },
      },
      {
        detail: {
          id: "9",
          name: "Fish and Chips",
          description: "Battered fish with crispy fries and tartar sauce",
          category: "British",
          tags: ["seafood", "fried"],
          options: [
            { size: "small", price: 12.99, quantity: 1 },
            { size: "medium", price: 16.99, quantity: 1 },
            { size: "large", price: 20.99, quantity: 1 },
          ],
          image: "/images/fish_and_chips.png",
          ingredients: ["Cod", "Batter", "Potatoes", "Tartar sauce", "Lemon"],
        },
        order: {
          options: [],
          total: 0,
        },
      },
      {
        detail: {
          id: "10",
          name: "Vegetable Stir Fry",
          description: "Mixed vegetables in a savory sauce with rice",
          category: "Chinese",
          tags: ["vegetarian", "healthy"],
          options: [
            { size: "small", price: 10.99, quantity: 1 },
            { size: "medium", price: 14.99, quantity: 1 },
            { size: "large", price: 18.99, quantity: 1 },
          ],
          image: "/images/vegetable_stir_fry.png",
          ingredients: ["Mixed vegetables", "Rice", "Soy sauce", "Garlic", "Ginger"],
        },
        order: {
          options: [],
          total: 0,
        },
      },
      {
        detail: {
          id: "11",
          name: "Beef Tacos",
          description: "Soft tortillas filled with seasoned beef and toppings",
          category: "Mexican",
          tags: ["tacos", "spicy"],
          options: [
            { size: "2 tacos", price: 8.99, quantity: 1 },
            { size: "3 tacos", price: 11.99, quantity: 1 },
            { size: "4 tacos", price: 14.99, quantity: 1 },
          ],
          image: "/images/beef_tacos.png",
          ingredients: ["Tortillas", "Ground beef", "Lettuce", "Cheese", "Salsa"],
        },
        order: {
          options: [],
          total: 0,
        },
      },
      {
        detail: {
          id: "12",
          name: "Mushroom Risotto",
          description: "Creamy Italian rice dish with mushrooms and parmesan",
          category: "Italian",
          tags: ["vegetarian", "creamy"],
          options: [
            { size: "small", price: 13.99, quantity: 1 },
            { size: "medium", price: 17.99, quantity: 1 },
            { size: "large", price: 21.99, quantity: 1 },
          ],
          image: "/images/mushroom_risotto.png",
          ingredients: ["Arborio rice", "Mushrooms", "Parmesan cheese", "White wine", "Onion"],
        },
        order: {
          options: [],
          total: 0,
        },
      },
      {
        detail: {
          id: "13",
          name: "Chicken Shawarma",
          description: "Grilled marinated chicken with pita and garlic sauce",
          category: "Middle Eastern",
          tags: ["wrap", "grilled"],
          options: [
            { size: "small", price: 9.99, quantity: 1 },
            { size: "medium", price: 12.99, quantity: 1 },
            { size: "large", price: 15.99, quantity: 1 },
          ],
          image: "/images/chicken_shawarma.png",
          ingredients: ["Chicken", "Pita bread", "Garlic sauce", "Lettuce", "Tomatoes"],
        },
        order: {
          options: [],
          total: 0,
        },
      },
      {
        detail: {
          id: "14",
          name: "Vegetarian Lasagna",
          description: "Layered pasta dish with vegetables and cheese",
          category: "Italian",
          tags: ["vegetarian", "baked"],
          options: [
            { size: "small", price: 11.99, quantity: 1 },
            { size: "medium", price: 15.99, quantity: 1 },
            { size: "large", price: 19.99, quantity: 1 },
          ],
          image: "/images/vegetarian_lasagna.png",
          ingredients: ["Lasagna noodles", "Ricotta cheese", "Spinach", "Tomato sauce", "Mozzarella"],
        },
        order: {
          options: [],
          total: 0,
        },
      },
      {
        detail: {
          id: "15",
          name: "BBQ Ribs",
          description: "Slow-cooked pork ribs with barbecue sauce",
          category: "American",
          tags: ["meat", "barbecue"],
          options: [
            { size: "half rack", price: 16.99, quantity: 1 },
            { size: "full rack", price: 24.99, quantity: 1 },
            { size: "combo platter", price: 29.99, quantity: 1 },
          ],
          image: "/images/bbq_ribs.png",
          ingredients: ["Pork ribs", "BBQ sauce", "Coleslaw", "Corn on the cob", "Baked beans"],
        },
        order: {
          options: [],
          total: 0,
        },
      },
      {
        detail: {
          id: "16",
          name: "Falafel Plate",
          description: "Fried chickpea balls with hummus and pita",
          category: "Middle Eastern",
          tags: ["vegetarian", "fried"],
          options: [
            { size: "small", price: 10.99, quantity: 1 },
            { size: "medium", price: 13.99, quantity: 1 },
            { size: "large", price: 16.99, quantity: 1 },
          ],
          image: "/images/falafel_plate.png",
          ingredients: ["Falafel", "Hummus", "Pita bread", "Tahini sauce", "Pickled vegetables"],
        },
        order: {
          options: [],
          total: 0,
        },
      },
      {
        detail: {
          id: "17",
          name: "Clam Chowder",
          description: "Creamy soup with clams, potatoes, and bacon",
          category: "American",
          tags: ["soup", "seafood"],
          options: [
            { size: "cup", price: 6.99, quantity: 1 },
            { size: "bowl", price: 9.99, quantity: 1 },
            { size: "bread bowl", price: 12.99, quantity: 1 },
          ],
          image: "/images/clam_chowder.png",
          ingredients: ["Clams", "Potatoes", "Bacon", "Cream", "Celery"],
        },
        order: {
          options: [],
          total: 0,
        },
      },
      {
        detail: {
          id: "18",
          name: "Beef Pho",
          description: "Vietnamese noodle soup with beef and herbs",
          category: "Vietnamese",
          tags: ["soup", "noodles"],
          options: [
            { size: "small", price: 11.99, quantity: 1 },
            { size: "medium", price: 14.99, quantity: 1 },
            { size: "large", price: 17.99, quantity: 1 },
          ],
          image: "/images/beef_pho.png",
          ingredients: ["Rice noodles", "Beef", "Bean sprouts", "Basil", "Lime"],
        },
        order: {
          options: [],
          total: 0,
        },
      },
      {
        detail: {
          id: "19",
          name: "Eggplant Parmesan",
          description: "Breaded eggplant with tomato sauce and cheese",
          category: "Italian",
          tags: ["vegetarian", "baked"],
          options: [
            { size: "small", price: 12.99, quantity: 1 },
            { size: "medium", price: 16.99, quantity: 1 },
            { size: "large", price: 20.99, quantity: 1 },
          ],
          image: "/images/eggplant_parmesan.png",
          ingredients: ["Eggplant", "Tomato sauce", "Mozzarella cheese", "Parmesan cheese", "Basil"],
        },
        order: {
          options: [],
          total: 0,
        },
      }
        
  ];

  meals.forEach((meal)=>{
    meal.detail.image = "/images/lobia.png"
  }) ;


export const categories = meals.map((meal)=> meal.detail.category )





const Bearer = 'Bearer dbadfd24dbee5793f1b15660005aaec3db8167ba07a30841e74f47822f5b5f26efb5600dcb058bbbbbbaa50dc70538a7bc57e59741b1dfdbaea0b619ef27cd2f5e20576bdfc899a90defb830e8b3fa68f8216c465dba09e5d07c4bbbe628fb6b480d807341e668a599d4fadfaf22968d72cfdd9adff4dac3e822f5677422eb88' ;

  function addineg() {
    meals.forEach((meal)=>{

      meal.detail.ingredients.forEach((ingredient)=>{

        fetch('http://localhost:1337/api/ingredients',{
          method : "POST",
          headers : {
            // 'Authorization': Bearer ,
            'Content-Type': 'application/json' ,
          },
          body : JSON.stringify({
            data : {
              name : ingredient
            }
          }) 
        }) .catch((err)=> {console.log(err)}).then((data)=> {
          console.log(data)
        })

        console.log(ingredient);

      })
  
     
    })
  }
