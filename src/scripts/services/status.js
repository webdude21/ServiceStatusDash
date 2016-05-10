let ajax = require('../util/ajax'),
  Service = require('../models/service'),
  storage = require('../services/storage');

const BRANCHES = ['master', 'rel-1.38', 'rel-1.36', 'rel-1.34', 'rel-1.32', 'rel-1.30', 'rel-1.28'],
  PROJECTS = ['openui5', 'sapui5/sapui5.runtime', 'sapui5/sapui5.dist'],
  OK_STATUS = 'ALLOW';

module.exports = {
  transformResult: function (result) {
    let transformedResult = result.map(rawResult => this.getBranchStates(JSON.parse(rawResult.substring(5))));
    return Array.prototype.concat(...transformedResult);
  },
  getStatus: projectBranch => projectBranch['permissions']['submit']['rules']['global:Registered-Users']['action'] === OK_STATUS,
  getBranchStates: function (branchInfo) {
    let projectName = Object.keys(branchInfo)[0],
      project = branchInfo[projectName];

    return BRANCHES.map(currentBranch => {
      let projectBranch = project['local'][`refs/heads/${currentBranch}`];
      return projectBranch ? new Service(`${projectName}->${currentBranch}`, this.getStatus(projectBranch)) : null;
    });
  },
  fetchServices: function () {
    return new Promise((resolve, reject) => {
      storage.loadOptions()
        .then(({ serviceAddress }) => {
          if (serviceAddress) {
            return Promise.all(PROJECTS.map(projectName => ajax(`${serviceAddress}?project=${projectName}`).get()));
          }

          return reject('No service address is provided');
        })
        .then(result => resolve(this.transformResult(result)))
        .catch(error => reject(error));
    });
  }
};
