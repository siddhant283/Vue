export default {
  computed: {
    filteredNames: function () {
      return this.names.filter((name) => {
        return name.match(this.search);
      });
    },
  },
};
