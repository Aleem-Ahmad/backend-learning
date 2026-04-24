/**
 * STORAGE SERVICE (THE "BACKEND" LAYER)
 * 
 * In a traditional full-stack app, this logic would live on a server (Node.js/Python/Go)
 * and communicate with a real database like PostgreSQL or MongoDB.
 * 
 * For this learning project, we are using the Browser's 'localStorage' as our Database.
 * This file acts as our "Data Access Layer" (DAL).
 */

const STORAGE_KEY = "my_sample_db_tasks";

/**
 * Get all items from our "Database"
 * @returns {Array} Array of task objects
 */
export const getAllTasks = () => {
  // We check if we are in the browser (client-side) because localStorage 
  // is not available during Next.js server-side rendering.
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);
  
  // If data exists, parse the JSON string back into a JavaScript array.
  // If not, return an empty array.
  return data ? JSON.parse(data) : [];
};

/**
 * Save a new item to our "Database"
 * @param {Object} task The task object to save
 */
export const saveTask = (task) => {
  const tasks = getAllTasks();
  
  // We create a new array with the old tasks + the new one.
  // This is a "Create" operation in CRUD (Create, Read, Update, Delete).
  const updatedTasks = [...tasks, { ...task, id: Date.now() }];
  
  // LocalStorage only stores strings, so we must convert our array to JSON.
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
  
  return updatedTasks;
};

/**
 * Delete an item from our "Database"
 * @param {number} id The unique ID of the task to delete
 */
export const deleteTask = (id) => {
  const tasks = getAllTasks();
  
  // Filter out the task with the matching ID.
  // This is the "Delete" operation in CRUD.
  const filteredTasks = tasks.filter(task => task.id !== id);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTasks));
  
  return filteredTasks;
};

/**
 * CLEAR ALL DATA (RESET DATABASE)
 */
export const resetDatabase = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(USERS_KEY);
  localStorage.removeItem(SESSION_KEY);
};

// --- AUTHENTICATION MODULE ---

const USERS_KEY = "my_sample_db_users";
const SESSION_KEY = "my_sample_session";

/**
 * Get all registered users
 */
export const getAllUsers = () => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Register a new user
 * @param {Object} userObj { email, password, role }
 */
export const signupUser = (userObj) => {
  const users = getAllUsers();
  
  // Check if user already exists
  if (users.find(u => u.email === userObj.email)) {
    throw new Error("User already exists!");
  }

  const newUser = { ...userObj, id: Date.now() };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
  return newUser;
};

/**
 * Login a user
 * @param {string} email
 * @param {string} password
 */
export const loginUser = (email, password) => {
  const users = getAllUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Create a "Session" (simulating a JWT or Cookie)
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
};

/**
 * Get the currently logged in user
 */
export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
};

/**
 * Logout
 */
export const logoutUser = () => {
  localStorage.removeItem(SESSION_KEY);
};
