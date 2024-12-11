const { User } = require('../models');

const apiLogger = async (req, res, next) => {
  const startTime = Date.now();
  
  // Store the original end function
  const originalEnd = res.end;
  
  // Override the end function
  res.end = function() {
    const duration = Date.now() - startTime;
    
    // Log the API call
    console.log({
      timestamp: new Date(),
      userId: req.user?.user_id,
      username: req.user?.username,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`
    });
    
    // Call the original end function
    originalEnd.apply(res, arguments);
  };
  
  next();
};

module.exports = apiLogger; 