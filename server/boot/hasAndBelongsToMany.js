'use strict';
var chalk = require('chalk');
var util = require('util');

module.exports = function hasAndBelongsToMany(server, done) {
  var Article = server.models.Article;
  var Employee = server.models.Employee;
  var ImageLink = server.models.ImageLink;

  if (process.env.POLYMORPHIC_HAS_AND_BELONGSTO_MANY) {
    demoHasAndBelongsToMany(done);
  } else {
    done();
  }
  function demoHasAndBelongsToMany(done) {
    var article1 = {name: 'Article 1'};
    var employee1 = {name: 'Employee 1'};
    var pictureArt = {url: 'url_of_picture_of_article_1'};
    var pictureEmp = {url: 'url_of_picture_of_employee_1'};

    Article.create(article1).then(function(article) {
      console.log('A new Article instance is created: \n' +
        chalk.green(util.inspect(article, 4)));
      return article.pictures.create(pictureArt);
    }).then(function(picArt) {
      console.log('A Picture instance of article 1 is created by method ' +
        chalk.blue('article.pictures.create()') + ': \n' +
        chalk.green(util.inspect(picArt, 4)));
      return ImageLink.find({where: {pictureId: picArt.id}});
    }).then(function(imglinkArt) {
      console.log('A ImageLink instance is created at the same time: \n' +
        chalk.green(util.inspect(imglinkArt, 4)) + '\n');
    }).then(function() {
      return Employee.create(employee1);
    }).then(function(employee) {
      console.log('A new Employee instance is created: \n' +
        chalk.green(util.inspect(employee, 4)));
      return employee.pictures.create(pictureEmp);
    }).then(function(picEmp) {
      console.log('A Picture instance of employee 1 is created by method ' +
        chalk.blue('employee.pictures.create()') + ': \n' +
        chalk.green(util.inspect(picEmp, 4)));
      return ImageLink.find({where: {pictureId: picEmp.id}});
    }).then(function(imgLinkEmp) {
      console.log('A ImageLink instance is created at the same time: \n' +
        chalk.green(util.inspect(imgLinkEmp, 4)) + '\n');
      done();
    }).catch(done);
  }
};
