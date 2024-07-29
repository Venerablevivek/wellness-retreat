module.exports = (sequelize, DataTypes) => {
  const Retreat = sequelize.define('Retreat', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    date: DataTypes.DATE,
    location: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    type: DataTypes.STRING,
    condition: DataTypes.STRING,
    image: DataTypes.STRING,
    tag: DataTypes.STRING,
  }, {});
  Retreat.associate = function(models) {
    // associations can be defined here
    Retreat.hasMany(models.Booking, { foreignKey: 'retreat_id' });
  };
  return Retreat;
};
