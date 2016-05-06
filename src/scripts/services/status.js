let ajax = require('../util/ajax'),
  Service = require('../models/service');

const BRANCHES = ['master', 'rel-1.38', 'rel-1.36', 'rel-1.34', 'rel-1.32', 'rel-1.30', 'rel-1.28'],
  PROJECTS = ['openui5', 'sapui5/sapui5.runtime', 'sapui5/sapui5.dist'],
  OK_STATUS = 'ALLOW',
  PROJECT_RESOURCE_BASE = 'http://veui5infra.dhcp.wdf.sap.corp:8080/databinding/proxy/https/git.wdf.sap.corp/access/?project=';

module.exports = {
  transformResult: function (result) {
    let transformedResult = result.map(rawResult => this.getBranchStates(JSON.parse(rawResult.substring(5)))),
      flatResult = Array.prototype.concat(...transformedResult);
    return flatResult;
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
      Promise.all(PROJECTS.map(projectName => ajax(PROJECT_RESOURCE_BASE + projectName).get()))
        .then(result => resolve(this.transformResult(result)))
        .catch(error => reject(error));
    });
  }
};
