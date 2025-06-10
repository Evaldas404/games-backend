import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Authorization problem (no token)",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err){
        return res.status(401).json({
      message: "Authorization problem (no token)",
    });
    }
   
     // req.body.userId = decoded.userId

    next();


  });
};

export default auth;
