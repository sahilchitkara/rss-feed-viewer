var User = require('./../model/users');
/*
 * GET users listing.
 */




exports.logout=function(req, res){
    req.logout();
    res.redirect('/');
}

exports.create = function (req, res) {
    User.findOne({email:req.param('email')},function(err,user){
        if(err){
            res.send(404, 'Server Error');
        }else{
            if(user){
                alert('Email already exits');
                res.redirect('/login');
            }else{
                new User({email:req.param('email'),password:req.param('password')}).save(function(err,user){
                    if(err){
                        res.send(404,'Server Error');
                    }else{
                        alert('User Created');
                        res.redirect('/login');
                    }
                });
            }
        }
    });
};
