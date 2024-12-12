export const routePermissions: Record<string, string[]> = {
    '/users': ['owner', 'manager'],
    '/dashboard': ['owner', 'manager'],
    '/table': ['cook', 'waiter', 'owner', 'manager'],
    // '/profile': ['user', 'admin'],
    // Add more routes and their allowed roles as needed
  };
  
  