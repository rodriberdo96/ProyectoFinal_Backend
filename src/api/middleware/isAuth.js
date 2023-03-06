const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/login.ejs')
}

module.exports = isAuth