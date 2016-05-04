/**
 * Service class to hold the name and status of a service
 */
class Service {
  constructor(name = 'service', working = true) {
    this.name = name;
    this.working = working;
  }
}

module.exports = Service;
