var editMode = false

module.exports = {
  toggleEditMode: function() {
    editMode = !editMode
  },
  isEditMode: function() {
    return editMode
  }
}