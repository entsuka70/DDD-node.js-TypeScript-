module.exports = function (app: any) {
    console.log('-----  Read routes/userIssue -----')
    const UserIssueController = require('presentation/controller/UserIssueController');

    app.route('/userissue')
        // viewではクエリパラメータを受け取る
        .get(UserIssueController.view)
    // .post(UserIssueController.create);

    app.route('/userissue/user')
        // viewではクエリパラメータを受け取る
        .get(UserIssueController.user)

    app.route('/userissue/:id/user/:user_id/issue/:issue_id')
        .post(UserIssueController.update)
    //     .delete(UserIssueController.delete);
}