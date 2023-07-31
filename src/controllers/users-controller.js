const users = [
  { id: 1, name: "Jhon Doe", email: "jhon@gmail.com", password: "12345678" },
  { id: 2, name: "Jane Doe", email: "jane@gmail.com", password: "abcdefg" },
];

export const getUsers = (req, res) => {
  res.json(users);
};

const getUserById = (id) => {
  return users.find((user) => user.id === id);
};

export const getUserProfile = (req, res) => {
  const userId = parseInt(req.params.id);

  if (!userId) {
    return res.status(400).json({ error: "ID invalida" });
  }

  const user = getUserById(userId);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json(user);
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

  if (!email.includes("@") || password.length < 8) {
    return res.status(400).json({ error: "Invalid email or password." });
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

export const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.findIndex((user) => user.id === id);

  if (user === -1) {
    res.status(404).json({ error: "Usuario no encontrado" });
  }

  users.splice(user, 1);
  res.status(200).json({ message: "Usuario eliminado correctamente" });
};
