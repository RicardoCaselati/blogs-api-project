module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    display_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    tablename: 'users',
    underscored: true,
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      foreignKey: 'user_id',
      as: 'blogposts',
    })
  }

  return User;
};