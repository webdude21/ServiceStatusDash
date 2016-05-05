let ajax = require('../util/ajax'),
  Service = require('../models/service');

const BRANCHES = ['rel-1.28', 'rel-1.30', 'rel-1.32', 'rel-1.34', 'rel-1.36', 'rel-1.38', 'master'],
  PROJECTS = ['openui5', 'sapui5/sapui5.runtime', 'sapui5/sapui5.dist'],
  OK_STATUS = 'ALLOW',
  PROJECT_RESOURCE_BASE = 'http://veui5infra.dhcp.wdf.sap.corp:8080/databinding/proxy/https/git.wdf.sap.corp/access/?project=';

module.exports = {
  transformResult: function (result) {
    let transformedResult = result.map(projectJsonResult => this.getBranchStates(JSON.parse(projectJsonResult.substring(5)))),
      flatResult = [].concat.apply([], transformedResult);
    return flatResult;
  },
  getStatus: projectBranch => projectBranch['permissions']['submit']['rules']['global:Registered-Users']['action'] === OK_STATUS,
  getBranchStates: function (branchInfo) {
    let projectName = Object.keys(branchInfo)[0],
      project = branchInfo[projectName];

    return BRANCHES.map(currentBranch => {
      let projectBranch = project['local'][`refs/heads/${currentBranch}`];
      if (projectBranch) {
        return new Service(`${currentBranch}::${projectName}`, this.getStatus(projectBranch));
      } else {
        return null;
      }
    });
  },
  getProjectStates: function () {
    return new Promise((resolve, reject) => {
      Promise.all(PROJECTS.map(projectName => ajax(PROJECT_RESOURCE_BASE + projectName).get()))
        .then(result => resolve(this.transformResult(result)))
        .catch(error => reject(error));
    });
  }
};
