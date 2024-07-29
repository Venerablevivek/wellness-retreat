const pool = require('../config/database.js');

exports.getRetreats = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM retreats');
      
      if(!result){
        return res.status(403).json({
          success:false,
          message:"No Retreat is present"
        });
      }

      return res.status(200).json({
        success:true,
        message:'Retreats Fetched Successfully',
        data:result.rows
      });

    } catch (err) {
      return res.status(500).json({ 
        success:false,
        message: err.message 
      });
    }
}

exports.getSingleRetreat = async (req, res) => {
  try {
    const {id}= req.params;
    const result = await pool.query(`SELECT * FROM retreats where id=${id}`);
    
    if(!result){
      return res.status(403).json({
        success:false,
        message:"No Retreat is present"
      });
    }

    return res.status(200).json({
      success:true,
      message:'Retreat Fetched Successfully',
      data:result.rows
    });

  } catch (err) {
    return res.status(500).json({ 
      success:false,
      message: err.message 
    });
  }
}
