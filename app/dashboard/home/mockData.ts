// home page - get reviews

const mockData = [
  {
    id: '058a3a29-ee22-442b-9273-b44c824ea8da',
    user: {
      id: '1be15729-263a-43c6-99c5-40ed527b8ebb',
      first_name: 'sam',
      last_name: 'polge',
      image_url: 'placeholder',
    },
    restaurant: {
      id: '5b12d702-6d3b-4650-8aba-235deb0071d7',
      google_id: 'ChIJByP318ek2EcRukGNd9OGHeo',
      name: 'The Hot Wok Chinese',
      address: '30 London Rd, Romford RM7 9RB, UK',
      type: 'Takeout Restaurant',
      image_url: 'null',
    },
    rating_food: 3,
    rating_value: 3,
    rating_atmosphere: 2,
    created_at: '2024-05-10T09:21:56.060Z',
  },
  {
    id: '49612254-baa7-4e76-b92a-33b4a65b94c6',
    user: {
      id: '1be15729-263a-43c6-99c5-40ed527b8ebb',
      first_name: 'sam',
      last_name: 'polge',
      image_url: 'placeholder',
    },
    restaurant: {
      id: '117360af-2497-4f22-8236-9e26c8f40ec7',
      google_id: 'ChIJcafMedQedkgRLKqCh7ARCKU',
      name: 'Hot Wok Chinese takeaway',
      address: '934 Green Lanes, London N21 2AD, UK',
      type: 'Takeout Restaurant',
      image_url: 'null',
    },
    rating_food: 5,
    rating_value: 4,
    rating_atmosphere: 3,
    created_at: '2024-05-10T09:21:56.059Z',
  },
  {
    id: 'fa84a0f1-0120-4031-9c86-9cbaa522cae7',
    user: {
      id: '1be15729-263a-43c6-99c5-40ed527b8ebb',
      first_name: 'sam',
      last_name: 'polge',
      image_url: 'placeholder',
    },
    restaurant: {
      id: 'd042fa3f-f54c-441a-a2d4-8d924e5fae10',
      google_id: 'ChIJZxg-WK4bdkgRTmAZFSNlzIo',
      name: 'Hot Wok Kitchen',
      address: '663 Holloway Rd, Archway, London N19 5SE, UK',
      type: 'Chinese Restaurant',
      image_url: 'null',
    },
    rating_food: 5,
    rating_value: 2,
    rating_atmosphere: 4,
    created_at: '2024-05-10T09:21:56.057Z',
  },
  {
    id: '2f0abfe1-a4f6-41f5-a554-76d3895f6119',
    user: {
      id: '1be15729-263a-43c6-99c5-40ed527b8ebb',
      first_name: 'sam',
      last_name: 'polge',
      image_url: 'placeholder',
    },
    restaurant: {
      id: '6c10fcb9-2fc2-4426-9653-37f1b8249e85',
      google_id: 'ChIJPdWDNmsbdkgR6Qtpb2RDnpc',
      name: 'Hot Wok.',
      address: '265 Caledonian Rd, London N1 1EE, UK',
      type: 'Takeout Restaurant',
      image_url: 'null',
    },
    rating_food: 3,
    rating_value: 4,
    rating_atmosphere: 4,
    created_at: '2024-05-10T09:21:56.055Z',
  },
  {
    id: '92fa3d27-67a8-4cc0-be48-7f29c9fde0dc',
    user: {
      id: '1be15729-263a-43c6-99c5-40ed527b8ebb',
      first_name: 'sam',
      last_name: 'polge',
      image_url: 'placeholder',
    },
    restaurant: {
      id: '65c17e40-4203-4562-b66d-bb06bd4c7475',
      google_id: 'ChIJaeMWvsIEdkgRPKGlNOE_vd8',
      name: 'Sapori',
      address: '60 Horseferry Rd, London SW1P 2AF, UK',
      type: 'Italian Restaurant',
      image_url: 'null',
    },
    rating_food: 4,
    rating_value: 4,
    rating_atmosphere: 2,
    created_at: '2024-05-10T09:21:56.054Z',
  },
  {
    id: 'a965c460-e40b-4873-9d29-90cf2f110158',
    user: {
      id: 'bbd07c2d-f4c8-4511-a1f8-17f73a42abad',
      first_name: 'sunny',
      last_name: 'anter',
      image_url: 'placeholder',
    },
    restaurant: {
      id: '5b12d702-6d3b-4650-8aba-235deb0071d7',
      google_id: 'ChIJByP318ek2EcRukGNd9OGHeo',
      name: 'The Hot Wok Chinese',
      address: '30 London Rd, Romford RM7 9RB, UK',
      type: 'Takeout Restaurant',
      image_url: 'null',
    },
    rating_food: 5,
    rating_value: 5,
    rating_atmosphere: 5,
    created_at: '2024-05-10T09:21:56.052Z',
  },
  {
    id: '2a8cc27f-ff05-43dc-aca5-9d55848546c5',
    user: {
      id: 'bbd07c2d-f4c8-4511-a1f8-17f73a42abad',
      first_name: 'sunny',
      last_name: 'anter',
      image_url: 'placeholder',
    },
    restaurant: {
      id: '117360af-2497-4f22-8236-9e26c8f40ec7',
      google_id: 'ChIJcafMedQedkgRLKqCh7ARCKU',
      name: 'Hot Wok Chinese takeaway',
      address: '934 Green Lanes, London N21 2AD, UK',
      type: 'Takeout Restaurant',
      image_url: 'null',
    },
    rating_food: 4,
    rating_value: 5,
    rating_atmosphere: 3,
    created_at: '2024-05-10T09:21:56.051Z',
  },
  {
    id: 'fb125783-7c5f-484c-bc57-105b83266651',
    user: {
      id: 'bbd07c2d-f4c8-4511-a1f8-17f73a42abad',
      first_name: 'sunny',
      last_name: 'anter',
      image_url: 'placeholder',
    },
    restaurant: {
      id: 'd042fa3f-f54c-441a-a2d4-8d924e5fae10',
      google_id: 'ChIJZxg-WK4bdkgRTmAZFSNlzIo',
      name: 'Hot Wok Kitchen',
      address: '663 Holloway Rd, Archway, London N19 5SE, UK',
      type: 'Chinese Restaurant',
      image_url: 'null',
    },
    rating_food: 5,
    rating_value: 3,
    rating_atmosphere: 2,
    created_at: '2024-05-10T09:21:56.049Z',
  },
  {
    id: '51dfa647-0c50-409d-afaa-76459729fae6',
    user: {
      id: 'bbd07c2d-f4c8-4511-a1f8-17f73a42abad',
      first_name: 'sunny',
      last_name: 'anter',
      image_url: 'placeholder',
    },
    restaurant: {
      id: '6c10fcb9-2fc2-4426-9653-37f1b8249e85',
      google_id: 'ChIJPdWDNmsbdkgR6Qtpb2RDnpc',
      name: 'Hot Wok.',
      address: '265 Caledonian Rd, London N1 1EE, UK',
      type: 'Takeout Restaurant',
      image_url: 'null',
    },
    rating_food: 5,
    rating_value: 5,
    rating_atmosphere: 3,
    created_at: '2024-05-10T09:21:56.048Z',
  },
  {
    id: 'b414bdb9-eb29-4859-b7b6-6a092fba4df2',
    user: {
      id: 'bbd07c2d-f4c8-4511-a1f8-17f73a42abad',
      first_name: 'sunny',
      last_name: 'anter',
      image_url: 'placeholder',
    },
    restaurant: {
      id: '65c17e40-4203-4562-b66d-bb06bd4c7475',
      google_id: 'ChIJaeMWvsIEdkgRPKGlNOE_vd8',
      name: 'Sapori',
      address: '60 Horseferry Rd, London SW1P 2AF, UK',
      type: 'Italian Restaurant',
      image_url: 'null',
    },
    rating_food: 5,
    rating_value: 5,
    rating_atmosphere: 5,
    created_at: '2024-05-10T09:21:56.046Z',
  },
  {
    id: '51c2d3ad-fd45-41be-bf1e-5e59d27d5b53',
    user: {
      id: 'a3a81d9f-1f8d-4938-ba66-68455eaeaded',
      first_name: 'jason',
      last_name: 'wong',
      image_url: 'placeholder',
    },
    restaurant: {
      id: '5b12d702-6d3b-4650-8aba-235deb0071d7',
      google_id: 'ChIJByP318ek2EcRukGNd9OGHeo',
      name: 'The Hot Wok Chinese',
      address: '30 London Rd, Romford RM7 9RB, UK',
      type: 'Takeout Restaurant',
      image_url: 'null',
    },
    rating_food: 3,
    rating_value: 4,
    rating_atmosphere: 3,
    created_at: '2024-05-10T09:21:56.043Z',
  },
  {
    id: '07f10fd3-6c1f-4138-8fc4-5766a3adf695',
    user: {
      id: 'a3a81d9f-1f8d-4938-ba66-68455eaeaded',
      first_name: 'jason',
      last_name: 'wong',
      image_url: 'placeholder',
    },
    restaurant: {
      id: '117360af-2497-4f22-8236-9e26c8f40ec7',
      google_id: 'ChIJcafMedQedkgRLKqCh7ARCKU',
      name: 'Hot Wok Chinese takeaway',
      address: '934 Green Lanes, London N21 2AD, UK',
      type: 'Takeout Restaurant',
      image_url: 'null',
    },
    rating_food: 5,
    rating_value: 3,
    rating_atmosphere: 4,
    created_at: '2024-05-10T09:21:56.041Z',
  },
  {
    id: 'fda953fb-a94c-4183-9bb8-a014aa6a4845',
    user: {
      id: 'a3a81d9f-1f8d-4938-ba66-68455eaeaded',
      first_name: 'jason',
      last_name: 'wong',
      image_url: 'placeholder',
    },
    restaurant: {
      id: 'd042fa3f-f54c-441a-a2d4-8d924e5fae10',
      google_id: 'ChIJZxg-WK4bdkgRTmAZFSNlzIo',
      name: 'Hot Wok Kitchen',
      address: '663 Holloway Rd, Archway, London N19 5SE, UK',
      type: 'Chinese Restaurant',
      image_url: 'null',
    },
    rating_food: 2,
    rating_value: 3,
    rating_atmosphere: 5,
    created_at: '2024-05-10T09:21:56.038Z',
  },
  {
    id: '59a3e572-a4f6-4688-82d5-319b0ba0fbe3',
    user: {
      id: 'a3a81d9f-1f8d-4938-ba66-68455eaeaded',
      first_name: 'jason',
      last_name: 'wong',
      image_url: 'placeholder',
    },
    restaurant: {
      id: '6c10fcb9-2fc2-4426-9653-37f1b8249e85',
      google_id: 'ChIJPdWDNmsbdkgR6Qtpb2RDnpc',
      name: 'Hot Wok.',
      address: '265 Caledonian Rd, London N1 1EE, UK',
      type: 'Takeout Restaurant',
      image_url: 'null',
    },
    rating_food: 2,
    rating_value: 5,
    rating_atmosphere: 3,
    created_at: '2024-05-10T09:21:56.035Z',
  },
  {
    id: '2aa7726d-c8a2-4486-8308-31e760dffcc4',
    user: {
      id: 'a3a81d9f-1f8d-4938-ba66-68455eaeaded',
      first_name: 'jason',
      last_name: 'wong',
      image_url: 'placeholder',
    },
    restaurant: {
      id: '65c17e40-4203-4562-b66d-bb06bd4c7475',
      google_id: 'ChIJaeMWvsIEdkgRPKGlNOE_vd8',
      name: 'Sapori',
      address: '60 Horseferry Rd, London SW1P 2AF, UK',
      type: 'Italian Restaurant',
      image_url: 'null',
    },
    rating_food: 5,
    rating_value: 3,
    rating_atmosphere: 5,
    created_at: '2024-05-10T09:21:56.032Z',
  },
];

export default mockData;