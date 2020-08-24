const VuexStoreRegister = {
  install: function(vue) {
    vue.mixin({
      $registerModuleFlag: false,
      $modules: [],
      $isVuex: false,
      beforeCreate() {
        // 是否自动注册Vuex 是否已经注册过 Vuex
        if (this.$options.$isVuex && !this.$options.$registerModuleFlag) {
          const $_modules = this.$options.$modules.length
            ? this.$options.$modules
            : '';
          const $_name = this.$options.name
            ? this.$options.name.toLocaleLowerCase()
            : '';
          var modules = $_modules || $_name;
          const { modulesList } = this.$store.state;
          console.log('modulesList: ', modulesList[modules], modules);
          if (Object.prototype.toString.call(modules) === '[object Array]') {
            modules.forEach((moduleName) => {
              // eslint-disable-next-line no-unused-expressions
              if (modulesList[moduleName]) {
                this.$store.registerModule(moduleName, modulesList[moduleName]);
              }
            });
          } else {
            // eslint-disable-next-line no-unused-expressions
            modulesList[modules]
              ? this.$store.registerModule($_name, modulesList[modules])
              : '';
          }
        }
      }
    });
  }
};
module.exports = VuexStoreRegister;
