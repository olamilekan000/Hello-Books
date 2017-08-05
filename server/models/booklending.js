module.exports = (sequelize, DataTypes) => {
  const BookLending = sequelize.define('BookLending', {
    borrowDate: DataTypes.DATE,
    dueDate: DataTypes.DATE,
  });
  BookLending.associate = (models) => {
    BookLending.belongsTo(models.Books, {
      foreignKey: 'bookID',
      as: 'books',
    });
    BookLending.belongsTo(models.UserLogin, {
      foreignKey: 'usernameID',
      as: 'userLogin',
    });
  };
  return BookLending;
};
