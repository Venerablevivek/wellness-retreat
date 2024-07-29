const pool = require('../config/database.js');

exports.bookRetreat = async (req, res) => {
    try {
      console.log(req.body.formData);

        const { 
            user_id, 
            user_name, 
            user_email, 
            user_phone, 
            retreat_id, 
            retreat_title,
            retreat_location,
            retreat_price,
            retreat_duration,
            payment_details, 
            booking_date 
        } = req.body.formData;

        if(!user_id || !user_name || !user_email ||!user_phone || !payment_details || !booking_date){
          return res.status(404).json({
            success:false,
            message:'All fields are Mandatory'
          })
        }


      // Check if the retreat is already booked by the user
      const checkBooking = await pool.query(
        'SELECT * FROM bookings WHERE user_id = $1 AND retreat_id = $2',
        [user_id, retreat_id]
      );
  
      if (checkBooking.rows.length > 0) {
        return res.status(400).json({ 
          success:false,
          message: 'Retreat already booked by this user' 
        });
      }
  
      // Insert new booking
      const result = await pool.query(
        `INSERT INTO bookings (user_id, user_name, user_email, user_phone, retreat_id, retreat_title,
          retreat_location,
          retreat_price,
          retreat_duration, payment_details, booking_date)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING*`,
        [user_id, user_name, user_email, user_phone, retreat_id, retreat_title, retreat_location, retreat_price, retreat_duration, payment_details, booking_date]
      );
  
      return res.status(200).json({
        success:true,
        message:'Retreat Booked Successfully',
        data:result.rows[0]
      })
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  exports.getAllBookings = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM bookings');
      
      if(!result){
        return res.status(403).json({
          success:false,
          message:"No Booking is present"
        });
      }

      return res.status(200).json({
        success:true,
        message:'All Bookings Fetched Successfully',
        data:result.rows
      });

    } catch (err) {
      return res.status(500).json({ 
        success:false,
        message: err.message 
      });
    }
  }