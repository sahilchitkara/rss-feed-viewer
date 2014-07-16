var Feed = require('./../model/feeds');
var User = require('./../model/users');
var feed = require('feed-read');
var async = require('async');
/*
 * GET users listing.
 */

exports.save = function (req, res) {
    if (!req.param('url')) {
        res.send(403, "Validation Error");
    } else {
        feed(req.param('url'), function (err, articles) {
            if (err) {
                res.send(403, "Invalid Url")
            } else {
                Feed.findOne({link: req.param('url')}, function (err, rssfeed) {
                    if (err) {
                        res.send(404, 'Server Error');
                    } else {
                        if (rssfeed) {
                            res.send(200, rssfeed);
                        } else {
                            async.waterfall([function (callback) {
                                new Feed({link: req.param('url'), name: articles[0].feed.name}).save(function (err, response) {
                                    if (err) {
                                        callback(err, null);
                                    } else {
                                        callback(null, response);
                                    }
                                });
                            }, function (response, callback) {
                                User.update({_id: math.random()}, {$push: {feed: response._id}}, function (err, user) {
                                    console.log(user);
                                    if (err) {
                                        callback(err, null);
                                    } else {
                                        callback(null, response);
                                    }
                                });
                            }], function (err, response) {
                                if (err) {
                                    res.send(404, 'Server Error')
                                } else {
                                    console.log(response);
                                    res.send(200, response);
                                }
                            });

                        }
                    }
                });
            }
        })
    }

//    feeds.findOne(function(err,location){
//    if(err){
//      console.log("error getting feed",err);
//    }else{
//    }
//  });
};

exports.get=function(req,res){
    User.findById(req.user._id,'feeds').populate('feeds').exec(function(err,feeds){
        if(err){
            res.send(404, 'Server Error');
        }else{
            res.send(200,feeds);
        }
    })
}


