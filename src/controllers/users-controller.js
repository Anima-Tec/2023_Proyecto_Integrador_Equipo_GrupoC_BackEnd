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
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ error: "email, password and name son valores necesarios" });
  }

  const newUser = { id: users.lenght + 1, name, email, password };
  users.push(newUser);
  res.status(201).json(newUser);
};

// module.exports = { getUsers, getUserById };
// module.exports = { createUser };
