export default {
  setPermission(state, payload) {
    state.permissionFlag = payload;
  },
  setFormData(state, payload) {
    state.formData = payload;
  },
}