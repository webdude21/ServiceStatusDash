(function (request) {

  request('http://meanestblog.herokuapp.com/api/articles')
  .get()
  .then();

}(servicedash.request));
