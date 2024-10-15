// const users = [
//   {
//     username: 'jasonwong',
//     password: 'password',
//     email: 'jasonwong_3@hotmail.com',
//     first_name: 'Jason',
//     last_name: 'Wong',
//     image: 'https://ca.slack-edge.com/T0WU5R8NT-U06F8STMKUL-ff3e7965451c-512',
//   },
//   {
//     username: 'sunnyanter',
//     password: 'sunnylovessam',
//     email: 'sunny.anter4@gmail.com',
//     first_name: 'Sunny',
//     last_name: 'Anter',
//     image: 'https://ca.slack-edge.com/T0WU5R8NT-U06A277GPB7-abf836aeaa2e-192',
//   },
//   {
//     username: 'sampolge',
//     password: 'samlovessunny',
//     email: 'sampolge1@gmail.com',
//     first_name: 'Sam',
//     last_name: 'Polge',
//     image: 'https://ca.slack-edge.com/T0WU5R8NT-U06AQDGF279-efc187bba1c7-512',
//   },
//   {
//     username: 'tobydixonsmith',
//     password: 'tobylovescoding',
//     email: 'tobydixonsmith@gmail.com',
//     first_name: 'Toby',
//     last_name: 'Dixon Smith',
//     image: 'https://ca.slack-edge.com/T0WU5R8NT-U06FBCC4S14-803b97100552-192',
//   },
// ];

// Check if Environment is Production or Development
const isProduction = process.env.NODE_ENV === 'production';

// Define the Users type
interface Users {
  Toby: `user_${string}`;
  Sunny: `user_${string}`;
  Sam: `user_${string}`;
  Jason: `user_${string}`;
}

function getUsers (): Users {
  // Return clerkIds for users based on the environment
  if (isProduction) {
    return {
      Toby: 'user_2nThENiM9Dw4563OlRFX6VhL3jP',
      Sam: 'user_2nThNd1INckMu1fGnfvh4PU2xgR',
      Jason: 'user_2nThRNMHUWA403PL8tgQzZXpNX0',
      Sunny: 'user_2nThW36L8aF9doa0gk7vijlUkXk',
    };
  }
  return {
    Toby: 'user_2j1HLk5FSMGX1OVDLR3Hud0To7B',
    Sam: 'user_2nPAV0yKQ3TXqSSucgz86eMhIdV',
    Jason: 'user_2nPGvo78elbym6u6Gp0j9lIvsfr',
    Sunny: 'user_2nPH5l0bSPgROag677NSERaZH6E',
  };
}
const users = getUsers();

export default users;
