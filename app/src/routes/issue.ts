module.exports = function (app: any) {
    console.log('-----  Read routes/issue -----')
    const IssueController = require('presentation/controller/IssueController');

    app.route('/issue')
        .get(IssueController.view)
        .post(IssueController.create);

    app.route('/issue/:id')
        .post(IssueController.update)
        .delete(IssueController.delete);
}