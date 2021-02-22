type userObj = { id: string; email: string; password: string };

export class GenericInMemoryDao {
  private static instance: GenericInMemoryDao;
  users: userObj[] = [];

  constructor() {
    // console.log('Created new instance of GenericInMemoryDao');
  }

  static getInstance(): GenericInMemoryDao {
    if (!GenericInMemoryDao.instance) {
      GenericInMemoryDao.instance = new GenericInMemoryDao();
    }

    return GenericInMemoryDao.instance;
  }

  addUser(user: userObj) {
    return this.users.push({ ...user, id: 1 + this.users.length + '' }) + '';
  }

  getUsers() {
    return this.users;
  }

  getUserById(userId: string) {
    return this.users.find((user: { id: string }) => userId === user.id);
  }

  putUserById(user: any) {
    const objIndex = this.users.findIndex(
      (obj: { id: any }) => obj.id === user.id
    );

    const updatedUsers = [
      ...this.users.slice(0, objIndex),
      user,
      ...this.users.slice(objIndex + 1),
    ];

    this.users = updatedUsers;
    return `${user.id} updated via put`;
  }

  patchUserById(userid: string) {
    const objIndex = this.users.findIndex(
      (obj: { id: any }) => obj.id === userid
    );

    let currentUser = this.users[objIndex];

    for (let i in this.users) {
      if (i !== 'id') {
        currentUser[i] = this.users[i];
      }
    }

    this.users = [
      ...this.users.slice(0, objIndex),
      currentUser,
      ...this.users.slice(objIndex + 1),
    ];

    return `${userid} patched`;
  }

  removeUserById(userId: string) {
    const objIndex = this.users.findIndex(
      (obj: { id: any }) => obj.id === userId
    );

    this.users.splice(objIndex, 1);
    return `${userId} removed`;
  }
}
