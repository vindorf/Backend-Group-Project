const isLoggedIn = (req,res,next)=>{
    if(!req.session.currentUser){
        return res.redirect('/login');
    }
 next();
};

const isIn = (req,res,next)=>{
    if(req.session.currentUser) {
        return res.redirect('/userProfile')
    }
    next();
}
//

const isLoggedOut = (req,res,next)=>{
    if(req.session.currentUser){
        return res.redirect('/');
    }
    next();
};

module.exports = {isLoggedIn, isIn, isLoggedOut};