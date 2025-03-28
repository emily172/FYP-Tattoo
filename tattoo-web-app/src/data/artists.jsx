export const artists = [
  {
    id: 1,
    name: "Alice Smith",
    image: "https://placehold.co/350x200",
    specialty: "Geometric Tattoos",
    bio: "Alice is a geometric tattoo artist with 10 years of experience. She loves creating intricate patterns inspired by nature and mathematics.",
    portfolio: [
      "https://placehold.co/300x200?text=Design+1",
      "https://placehold.co/300x200?text=Design+2",
      "https://placehold.co/300x200?text=Design+3",
    ],
    availability: {
      open: ["2025-03-28", "2025-03-29","2025-03-30", "2025-03-31"], // Available dates
      blocked: ["2025-03-22", "2025-03-23"], // Blocked dates
    },
    reviews: [
      {
        username: "JohnDoe",
        rating: 5,
        comment: "Alice was amazing! The geometric design came out better than I expected.",
      },
      {
        username: "JaneSmith",
        rating: 4,
        comment: "Alice is great, but the session lasted longer than planned.",
      },
    ],
  },
  {
    id: 2,
    name: "Bob Johnson",
    image: "https://placehold.co/350x200",
    specialty: "Blackwork Tattoos",
    bio: "Bob specializes in bold blackwork tattoos. His minimalistic approach and attention to detail have earned him a loyal clientele.",
    portfolio: [
      "https://placehold.co/300x200?text=Design+4",
      "https://placehold.co/300x200?text=Design+5",
    ],
    availability: {
      open: ["2025-03-28", "2025-03-29","2025-03-30", "2025-03-31"],
      blocked: ["2025-06-10", "2025-06-12"],
    },
    reviews: [
      {
        username: "SarahConnor",
        rating: 5,
        comment: "Bob's designs are bold and beautiful! Highly recommend.",
      },
      {
        username: "RickGrimes",
        rating: 3,
        comment: "Good work, but the communication could have been better.",
      },
    ],
  },
  {
    id: 3,
    name: "Cara White",
    image: "https://placehold.co/350x200",
    specialty: "Realism Tattoos",
    bio: "Cara creates stunning realism tattoos that bring images to life. Her work often includes lifelike portraits and nature-inspired pieces.",
    portfolio: [
      "https://placehold.co/300x200?text=Design+6",
      "https://placehold.co/300x200?text=Design+7",
      "https://placehold.co/300x200?text=Design+8",
      "https://placehold.co/300x200?text=Design+9",
    ],
    availability: {
      open: ["2025-03-28", "2025-03-29","2025-03-30", "2025-03-31"],
      blocked: ["2025-03-30", "2025-03-31"],
    },
    reviews: [
      {
        username: "DarylDixon",
        rating: 5,
        comment: "Cara is an incredible artist! The portrait she created was perfect.",
      },
      {
        username: "MaggieGreene",
        rating: 4,
        comment: "Very detailed work. Love the tattoo, but the session took a bit too long.",
      },
    ],
  },
];
