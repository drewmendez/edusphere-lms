import pool from "../../config/db.config.js";
import { capitalize } from "../../utils/helpers.js";

export const isEmailRegistered = async (email) => {
  const query = `
    SELECT email 
    FROM users 
    WHERE email = ?
  `;
  const values = [email];

  try {
    const [rows] = await pool.query(query, values);

    return !!rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const getUserData = async (email) => {
  const query = `
    SELECT user_id, role, email, password
    FROM users 
    WHERE email = ?
  `;
  const values = [email];

  try {
    const [[row]] = await pool.query(query, values);

    return row;
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const createUser = async (
  firstname,
  lastname,
  role,
  email,
  password
) => {
  const query = `
    INSERT INTO users (firstname, lastname, role, email, password) 
    VALUE (?,?,?,?,?)
  `;
  const values = [
    capitalize(firstname),
    capitalize(lastname),
    role,
    email,
    password,
  ];

  try {
    await pool.query(query, values);
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const getCurrentUser = async (user_id) => {
  const query = `
    SELECT user_id, CONCAT(firstname, " ", lastname) AS user, role
    FROM users
    WHERE user_id = ?
  `;
  const values = [user_id];

  try {
    const [[row]] = await pool.query(query, values);

    return row;
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};
