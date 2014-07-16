/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.redirect('/login');
};

exports.login = function (req, res) {
    if(req.session.user){
        res.render('index', { title: 'Rss Feeds Viewer' });
    }else{
        res.render('login', { title: 'Rss Feeds Viewer' });
    }
};

exports.signup = function (req, res) {
    if(req.user){
        res.render('index', { title: 'Rss Feeds Viewer' });
    }else{
        res.render('signup', { title: 'Rss Feeds Viewer' });
    }
};

