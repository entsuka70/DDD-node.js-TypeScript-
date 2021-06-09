module.exports = function(app: any) {
    console.log('-----  Read routes/pair -----')
    const PairController = require('presentation/controller/PairController');

    app.route('/pair')
        .get(PairController.view)
        .post(PairController.create);

    app.route('/pair/:id')
        .post(PairController.update)
        .delete(PairController.delete);
}