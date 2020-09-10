const express=require('express');
const path=require('path');
const authRoutes=require('./routes/auth-routes');
const keys=require('./config/keys');
const mongoose=require('mongoose');
const passportSetup=require('./config/passport-setup');
const cookieSession=require('cookie-session');
const passport=require('passport');
const profileRoutes=require('./routes/profile-routes');

const app=express();
mongoose.connect(keys.mongodb.dbURI,()=>console.log('Connected to database'));
app.use(cookieSession({
	maxAge:24*60*60*1000,
	keys:[keys.session.cookieKey]
}))
app.use(passport.initialize());
app.use(passport.session());


app.set("view engine",'ejs');

app.use("/auth",authRoutes);
app.use("/profile",profileRoutes);
app.get("/",(req,res)=>{
	res.render('home',{user:req.user});
});


const PORT=process.env.PORT || 8000
app.listen(PORT,()=>console.log(`Server Started on port ${PORT}`))