const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res,next)=>{
   // res.send('<form action="/test/post-username" method="POST"> <input type="text" name="username">    <button type="submit"> Send </button> </form>');
   res.render('GameBoard'); //(path.join(__dirname, '../views/pages', 'GameBoard'));
   console.log('Attempting to render Game Board');
});

/* router.post('/post-username', (req, res, next)=>{
   console.log('data: ', req.body.username);
   res.send('<h1>'+req.body.username+'</h1>');
}); */
module.exports = router;