module.exports = function (app: any) {
    console.log('-----  Read routes/team -----')
    const TeamController = require('presentation/controller/TeamController');

    app.route('/team')
        .get(TeamController.view);
    // .post(UserController.create);

    app.route('/team/:id')
        .post(TeamController.update);
    // .delete(UserController.delete);
}