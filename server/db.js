const db = {
  users: [
    {
      uid: "71a815d5-c428-4821-85f4-9bc92cefc91b",
      name: "kerolous",
      email: "kerolous@gmail.com",
      password: "123",
      age: 23,
      scopes: ["books.read", "books.list"],
    },
    {
      uid: "0ded106e-7462-4b93-a320-d0b173e17848",
      name: "destro",
      email: "destro@gmail.com",
      password: "123",
      age: 23,
      scopes: ["books.read", "books.list", "books.write", "books.update"],
    },
    {
      uid: "953",
      name: "kero",
      email: "kero@gmail.com",
      password: "123",
      age: 23,
      scopes: [
        "sessions.screens.interactions.read",
        "sessions.screens.interactions.write",
      ],
    },
  ],
};

export default db;
