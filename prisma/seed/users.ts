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
