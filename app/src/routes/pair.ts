module.exports = function (app: any) {
    console.log('-----  Read routes/pair -----')
    const PairController = require('presentation/controller/PairController');

    app.route('/pair')
        .get(PairController.view);
    // 仕様変更により不要
    // TODO:利用には修正必要
    // .post(PairController.create);

    app.route('/pair/:id')
        .post(PairController.update);
    // 仕様変更により不要
    // TODO:利用には修正必要
    // .delete(PairController.delete);
}