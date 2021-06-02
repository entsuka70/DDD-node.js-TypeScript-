module.exports = function(app: any) {
    console.log('-----  Read routes/user -----')
    const UserController = require('presentation/controller/UserController');

    app.route('/user')
        .get(UserController.getAll);

}