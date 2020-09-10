const passport=require('passport')
const GoogleStrategy=require('passport-google-oauth20');
const keys=require('./keys')
const User=require('../models/user-model')

passport.serializeUser((user,cb)=>{
	cb(null,user.id);
})
passport.deserializeUser((id,cb)=>{
	User.findById(id).then((user)=>{
		cb(null,user);
	})
})

passport.use(new GoogleStrategy({
	clientID:keys.google.clientID,
	clientSecret:keys.google.clientSecret,
	callbackURL:"http://127.0.0.1:8000/auth/google/redirect"
},(accessToken,refreshToken,profile,cb)=>{
	console.log(profile.photos);
	User.findOne({googleId:profile.id}).then((currentUser)=>{
		if(currentUser){
			console.log(`User already exists ${currentUser}`)
			cb(null,currentUser);
		}
		else{
			new User({
				username:profile.displayName,
				googleId:profile.id,
				thumbnail:profile._json.picture
			}).save().then((user)=>{
				console.log(`new user created ${user}`)
				cb(null,user);
			})
		}
	})
}))