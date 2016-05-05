let ajax = require('../util/ajax');
const BRANCHES = ['rel-1.28', 'rel-1.30', 'rel-1.32', 'rel-1.34', 'rel-1.36', 'rel-1.38', 'master'],
  PROJECTS = ['openui5', 'sapui5/sapui5.runtime', 'sapui5/sapui5.dist'],
  PROJECT_RESOURCE_BASE = '/databinding/proxy/https/git.wdf.sap.corp/access/?project=';

let aResult = [];

module.exports = {
  fetch: () => ajax('https://fuelo.net/api/price?key=2aa197c518fe4da&fuel=gasoline').get(),
  getBranchStates: function (jsonResult, projectName) {
    let branchState = new Map();

    BRANCHES.forEach(currentBranch => {
      let branchName = BRANCHES[currentBranch];
      let oProjectBranch = jsonResult[projectName]['local']['refs/heads/' + branchName];
      if (oProjectBranch) {
        let value = oProjectBranch['permissions']['submit']['rules']['global:Registered-Users']['action'];
        branchState.set(branchName, value);
        aResult.push({
          project: projectName,
          branch: branchName,
          state: branchState[branchName]
        });
      }
    });

    return branchState;
  },
  transformResults: function (stringResults) {
    let projectMap = new Map();

    stringResults.forEach(sProject => {
        projectMap[sProject] = this.getBranchStates(JSON.parse(sProject.substring(5)));
      }
    );
  },
  getProjectStates: function () {
    return new Promise((resolve, reject) => {
      Promise.all(PROJECTS.map(projectName => ajax(PROJECT_RESOURCE_BASE + projectName).get()))
        .then(result => {
          resolve(this.transformResults(result));
        })
        .catch(error => reject(error));
    });
  }
};
