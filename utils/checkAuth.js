import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  // if utilize insomnia than it would unnecessary word "Bearer" before token itself so we remove it using regExp
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  // console.log(token);

  if (token) {
    try {
      const decoded = jwt.verify(token, 'whateverYouWant');
      req.userId = decoded._id;
      req.token = token;
    } catch (error) {
      return res.status(403).json({
        message: 'No access',
      });
    }
  } else {
    return res.status(403).json({
      message: 'No access',
    });
  }
  // res.send(token);

  next();
};
