module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    user_id: DataTypes.INTEGER,
    user_name: DataTypes.STRING,
    user_email: DataTypes.STRING,
    user_phone: DataTypes.STRING,
    retreat_id: DataTypes.INTEGER,
    retreat_title: DataTypes.STRING,
    retreat_location: DataTypes.STRING,
    retreat_price: DataTypes.DECIMAL,
    retreat_duration: DataTypes.INTEGER,
    payment_details: DataTypes.TEXT,
    booking_date: DataTypes.DATE
  }, {});
  Booking.associate = function(models) {
    // associations can be defined here
    Booking.belongsTo(models.Retreat, { foreignKey: 'retreat_id' });
  };
  return Booking;
};
