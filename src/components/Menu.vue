<template>
  <li class="liStyle">
    <span v-if="!menus.BASLIK">
      <router-link :to="pagePath">
        <span class="liStyle">{{ menus.TANIM }}</span>
      </router-link>
    </span>
    <span v-else v-on:click="expand()">
      <span class="p-1">
        <i :class="menus.ICON"></i>
      </span>
      <span>{{ menus.TANIM }}</span>
      <span class="p-1">
        <i class="fas fa-angle-down"></i>
      </span>
    </span>
    <ul
      class="sub-folders"
      v-if="menus.MENU && menus.MENU.length > 0"
      v-show="menus.TANIM == 'Menü' ? true : showChildren"
    >
      <Menu v-for="menuItem in menus.MENU" :menus="menuItem" :key="menuItem.ID"></Menu>
    </ul>
    <!-- <div class="folder-empty" v-else v-show="showChildren">No Data</div> -->
  </li>
</template>
<script>
export default {
  data() {
    return { showChildren: false };
  },
  props: {
    menus: Object
  },
  name: "Menu",
  methods: {
    expand() {
      if (!this.menus.BASLIK) {
        return;
      }
      this.showChildren = !this.showChildren;
    }
  },
  computed: {
    pagePath() {
      return `/${this.menus.SAYFA}/List?menu_id=${this.menus.ID}`;
    }
  },
  created() {}
};
</script>

<style scoped>
li.liStyle {
  color: white !important;
  list-style: none;
}
a {
  color: white !important;
}
/* ul.folders {
  padding: 1rem;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  list-style: none
}
ul.folders > li:first-child {
  padding: 1rem 1rem 1rem 0
}
li.is-folder {
  padding: 1rem;
  border-left: 1px solid #d3d3d3;
  margin-bottom: 0.5rem
}
li.is-folder > span {
  padding: 0.5rem;
  border: 1px solid #d3d3d3;
  cursor: pointer;
  display:inline-block
}
li.is-leaf {
  padding: 0 0 0 1rem;
  color: #000;
}
ul.sub-folders {
  padding: 1rem 1rem 0 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  list-style: none
}
div.folder-empty {
  padding: 1rem 1rem 0 1rem;
  color: #000;
  opacity: 0.5
} */
</style>