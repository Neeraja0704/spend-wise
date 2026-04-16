// Firebase Authentication (for future Firebase integration)
// Currently using localStorage for development

export const mockUsers = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Demo User',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
  },
];

export const registerUser = async (email, password, name) => {
  try {
    const user = {
      id: Date.now().toString(),
      email,
      password,
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      createdAt: new Date().toISOString(),
    };

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
      throw new Error('Email already registered');
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(user));

    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const loginUser = async (email, password) => {
  try {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const googleLogin = async () => {
  try {
    const googleUser = {
      id: Date.now().toString(),
      email: `user_${Date.now()}@gmail.com`,
      name: 'Google User',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=google${Date.now()}`,
      loginMethod: 'google',
      createdAt: new Date().toISOString(),
    };

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(googleUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(googleUser));

    return { success: true, user: googleUser };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
  return { success: true };
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('currentUser');
};
