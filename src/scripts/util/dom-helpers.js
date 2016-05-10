module.exports = {
  getById: id => document.getElementById(id),
  addClickHandler: function (id, handler) {
    let domElement = this.getById(id);

    if (domElement) {
      domElement.addEventListener('click', handler);
    }
  },
  moveNodesFromParentToParent: function (oldParent, newParent, filterPredicate) {
    let currentChild = oldParent.firstChild;

    while (currentChild) {
      let childToMove = currentChild;
      currentChild = currentChild.nextElementSibling;

      if (!(typeof filterPredicate === 'function' && !filterPredicate(childToMove))) {
        newParent.appendChild(childToMove);
      }
    }
  },
  moveSelectedItemsBetweenParents: function (oldParent, newParent) {
    this.moveNodesFromParentToParent(oldParent, newParent, node => node.selected);
  },
  getValuesFromSelect: function (selector) {
    let servicesSelect = this.getById(selector),
      currentChild = servicesSelect.firstChild,
      result = [];

    while (currentChild) {
      result.push(currentChild.value);
      currentChild = currentChild.nextElementSibling;
    }

    return result;
  },
  populateInput: function (id, text) {
    let input = this.getById(id);

    if (input) {
      input.value = text;
    }
  },
  retrieveTextFromInput: function (id) {
    let input = this.getById(id);
    return input ? input.value || '' : '';
  },
  showSavingStatus(label, delay = 500) {
    let originalText = label.textContent;
    label.textContent = 'Saving...';
    setTimeout(() => {
      label.textContent = originalText;
    }, delay);
  },
  serviceToOption: function (service) {
    let option = document.createElement('option');
    option.value = service.name;
    option.text = service.name;
    return option;
  },
  serviceToListItem: function (service) {
    let listItem = document.createElement('li');
    listItem.textContent = service.name;
    listItem.className = service.working ? 'success' : 'fail';
    return listItem;
  },
  populateList: function (selector, data, itemMapper) {
    let servicesSelect = this.getById(selector),
      fragment = document.createDocumentFragment();

    if (!servicesSelect) {
      return null;
    }

    data.map(itemMapper).forEach(option => fragment.appendChild(option));
    servicesSelect.appendChild(fragment);
    return servicesSelect;
  }
};
