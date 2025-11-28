

export const locations = [
    {
        id: 1,
        name: 'Leuven I',
        address: 'Tiensestraat 12, 3000 Leuven',
        status: 'Open',
        closes: 'Closes at 21:00',
        opening: '10:00',
        closing: '21:00'
    },

    {
        id: 2,
        name: 'Leuven II',
        address: 'Bondgenotenlaan 45, 3000 Leuven',
        status: 'Open',
        closes: 'Closes at 22:00',
        opening: '10:00',
        closing: '21:00'
    },

    {
        id: 3,
        name: 'Antwerp',
        address: 'Meir 23, 2000 Antwerp',
        status: 'Closed',
        closes: 'Opens at 11:00',
        opening: '10:00',
        closing: '21:00'
    },

    {
        id: 4,
        name: 'Ghent',
        address: 'Veldstraat 67, 9000 Ghent',
        status: 'Open',
        closes: 'Closes at 21:30',
        opening: '10:00',
        closing: '21:00'
    }
]

export const newsletterCardItems = [
    {
        id: 1,
        title: 'Chicken Beans - One for you, one on us!',
        date: 'June 15, 2024',
        image: require('../img/ChickenBeans.png'),
        description: "Roasted chicken, organic brown rice, red onion, roasted potatoes, kidney beans, corn, red cabbage, honey mustard, topped with jalapeños.",
        promoDescription: ["Buy one, get one FREE. Yes, you read that right. Double the beans. This deal is on from 4th of November to 15th of November. Get 'em while they're hot!", "Just click add to cart and 2 bowls are automatically added to the cart.", "This offer is app exclusive and cannot be combined with other offers."],
        priceLarge: 14.99,
        priceRegular: 12.99 
    },
    {
        id: 2,
        title: 'Summer Salad - Fresh & Zesty!',
        date: 'June 10, 2024',
        image: require('../img/CaesarsGarden.png'),
        description: "A refreshing mix of seasonal greens, cherry tomatoes, cucumbers, feta cheese, and a zesty lemon vinaigrette.",
        promoDescription: ["Enjoy a light and healthy meal this summer with our Summer Salad. Perfect for those warm days!"],
        priceLarge: 11.99,
        priceRegular: 9.99 
    }, 
    {
        id: 3,
        title: 'Vegan Delight - Plant Power!',
        date: 'June 5, 2024',
        image: require('../img/HoneyHarvest.png'),
        description: "A hearty bowl of quinoa, chickpeas, roasted vegetables, avocado, and a tangy tahini dressing.",
        promoDescription: ["Celebrate World Vegan Day with our Vegan Delight bowl. Packed with nutrients and flavor!"],
        priceLarge: 13.99,
        priceRegular: 11.99
    }
]

export const users = [
    {
        id: 1, 
        name: 'Dima Podoleanu',
        email: 'dimapodoleanu@gmail.com',
        city: 'Leuven',
        dateOfBirth: '2004-10-19',
        gender: 'Male'
    },

    {
        id: 2, 
        name: 'Jane Doe',
        email: 'janeDoe@gmail.com',
        city: 'Antwerp',
        dateOfBirth: '1990-05-15',
        gender: 'Female'
    }
]

export const menuItems = [
    {
        id: 1,
        type: 'bowl',
        name: 'Chicken Beans',
        description: 'Roasted chicken with organic brown rice, kidney beans, corn, and honey mustard, topped with jalapeños.',
        priceRegular: 12.99,
        priceLarge: 14.99,
        image: '../img/ChickenBeans.png'
    },
    {
        id: 2,
        type: 'bowl',
        name: 'Vegan Harvest Bowl',
        description: 'Quinoa, chickpeas, roasted vegetables, avocado, and tangy tahini dressing.',
        priceRegular: 13.49,
        priceLarge: 15.49,
        image: '../img/HoneyHarvest.png'
    },
    {
        id: 3,
        type: 'salad',
        name: 'Caesar Garden Salad',
        description: 'Seasonal greens with cherry tomatoes, cucumbers, feta, and lemon vinaigrette.',
        priceRegular: 9.99,
        priceLarge: 11.99,
        image: '../img/CaesarsGarden.png'
    },
    {
        id: 4,
        type: 'wrap',
        name: 'Grilled Chicken Wrap',
        description: 'Grilled chicken, fresh greens, and a light dressing wrapped in a soft tortilla.',
        priceRegular: 8.99,
        priceLarge: 10.99,
        image: '../img/ChickenBeans.png'
    },
    {
        id: 5,
        type: 'bowl',
        name: 'Salmon Teriyaki Bowl',
        description: 'Teriyaki glazed salmon on a bed of rice with steamed veggies and sesame seeds.',
        priceRegular: 14.49,
        priceLarge: 16.49,
        image: '../img/HoneyHarvest.png'
    },
    {
        id: 6,
        type: 'dessert',
        name: 'Honey Cake Slice',
        description: 'Moist honey cake with a delicate crumb—perfect with coffee or tea.',
        priceRegular: 4.99,
        priceLarge: 6.49,
        image: '../img/ChickenBeans.png'
    },
    {
        id: 7,
        type: 'drink',
        name: 'Fresh Lemonade',
        description: 'House-made lemonade with freshly squeezed lemons and a hint of mint.',
        priceRegular: 2.99,
        priceLarge: 3.99,
        image: '../img/CaesarsGarden.png'
    },
    {
        id: 8,
        type: 'side',
        name: 'Roasted Sweet Potatoes',
        description: 'Seasoned and roasted sweet potato wedges with a light glaze.',
        priceRegular: 3.49,
        priceLarge: 4.99,
        image: '../img/HoneyHarvest.png'
    },
    {
        id: 9,
        type: 'bowl',
        name: 'Thai Peanut Veggie Bowl',
        description: 'Mixed veggies and rice tossed in a creamy Thai peanut sauce, topped with sesame.',
        priceRegular: 12.49,
        priceLarge: 14.49,
        image: '../img/ChickenBeans.png'
    },
    {
        id: 10,
        type: 'salad',
        name: 'Prawn & Avocado Salad',
        description: 'Fresh prawns, ripe avocado, mixed greens and a citrus dressing.',
        priceRegular: 11.99,
        priceLarge: 13.99,
        image: '../img/CaesarsGarden.png'
    }
];

