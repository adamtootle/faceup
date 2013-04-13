var image = require('../lib/image')

exports.index = function(req, res, next) {
  return res.sendfile('public/index.html')
}

exports.img = function(req, res, next) {
  var data = {
    image: req.param('src', 'http://www.librarising.com/astrology/celebs/images2/QR/queenelizabethii.jpg'),
    overlay: req.param('overlay', 'mustache'),
    method: req.param('method', 'lambda')
  }
  req.metrics.track('img', {
    ip: req.headers['x-real-ip'],
    image: data.image,
    overlay: data.overlay,
    method: data.method
  })

  image.mash(data, function(err, image) {
    if (err) {
      console.log(err.stack || err)
      return res.sendfile('public/images/fail.png')
    }
    if (!image) {
      return res.sendfile('public/images/fail.png')
    }
    res.type('image/jpeg')
    res.send(image)
  })
};

exports.check = function(req, res, next) {
  var data = {
    image: req.param('src', 'http://www.librarising.com/astrology/celebs/images2/QR/queenelizabethii.jpg'),
    overlay: req.param('overlay', 'mustache'),
    method: req.param('method', 'lambda')
  }
  req.metrics.track('check', {
    ip: req.headers['x-real-ip'],
    image: data.image,
    method: data.method
  })

  image.mash(data, function(err, image) {
    if (err) {
      console.log(err.stack || err)
      return res.send({"has_face":"false"})
    }
    if (!image) {
      return res.send({"has_face":"false"})
    }
    return res.send({"has_face":"true"})
  })
};
