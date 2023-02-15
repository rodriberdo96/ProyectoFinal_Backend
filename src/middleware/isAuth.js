const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/products')
}

module.exports = isAuth