const router=require('express').Router();
const passport=require('passport');

router.get('/login',(req,res)=>{
	res.render('login',{user:req.user});
})
router.get('/google',passport.authenticate('google',{
	scope:['profile'],
}))
router.get('/google/redirect',passport.authenticate('google',{failureRedirect:'/login'}),(req,res)=>{
	// res.send(req.user);
	res.redirect('/profile/')
})
router.get('/logout',(req,res)=>{
	req.logout();
	res.redirect('/');
})

module.exports=router;