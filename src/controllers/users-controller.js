const users = [
  { id: 1, name: "Jhon Doe", email: "jhon@gmail.com", password: "12345678" },
  { id: 2, name: "Jane Doe", email: "jane@gmail.com", password: "abcdefg" },
];

export const getUsers = (req, res) => {
  res.json(users);
};

export const getUserById = (id) => {
  return users.find((user) => user.id === id);
};

export const createUser = (req, res) => {
  const { email, password, name } = req.params;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios." });
  }

  // Verificamos si el email ya existe en la lista de usuarios
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ error: "El email ya está registrado." });
  }

  // Generamos un nuevo ID para el usuario
  const id = users.length + 1;

  // Creamos el nuevo usuario
  const newUser = {
    id,
    name,
    email,
    password,
  };

  // Agregamos el nuevo usuario a la lista
  users.push(newUser);

  res.status(201).json(newUser);
};

// module.exports = { getUsers, getUserById };
// module.exports = { createUser };
