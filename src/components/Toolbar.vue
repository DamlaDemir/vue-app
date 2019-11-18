<template>
  <div>
    <b-button-group v-show="getToolbarItems.length > 0">
      <b-button
        @click="navigate(item)"
        :variant="item.Css"
        v-for="(item, index) in getToolbarItems"
        v-bind:key="index"
        v-show="pageAuth(item.Type)"
      >
        <i :class="item.Icon" />
      </b-button>
    </b-button-group>
  </div>
</template>

<script>
import { ToolbarItemTypeEnum } from "@/common/enums/ToolbarItemTypeEnum";
export default {
  name: "Toolbar",
  data() {
    return {
      menu: {}
    };
  },
  props: {
    toolbarItems: {
      type: Array
    }
  },
  created() {},
  computed: {
    getToolbarItems() {
      return this.toolbarItems;
    }
  },
  methods: {
    pageAuth(item) {
      if (this.$route.fullPath.includes("Form")) {
        if (item === ToolbarItemTypeEnum.Remove) return false;
        else if (item === ToolbarItemTypeEnum.Edit) return false;
        else if (item === ToolbarItemTypeEnum.View) return false;
        else return true;
      } else if (this.$route.fullPath.includes("List"))
        if (item === ToolbarItemTypeEnum.Save) return false;
        else return true;
    },
    selectedRowsControl() {
      if (this.$parent.selectedRows.length > 1) {
        this.$parent.alertShowTime = 4;
        this.$parent.alertText = "Lütfen tek kayıt seçiniz";
        return false;
      } else if (this.$parent.selectedRows.length === 0) {
        this.$parent.alertShowTime = 4;
        this.$parent.alertText = "Lütfen kayıt seçiniz";
        return false;
      } else return true;
    },

    navigate(item) {
      debugger;
      console.log(this.$parent.menuId);

      switch (item.Type) {
        case ToolbarItemTypeEnum.Add:
          if (item.Path !== undefined)
            this.$router
              .push(`${item.Path}?menu_id=${this.$parent.menuId}`)
              .catch(err => {
                console.log(err);
              });
          break;
        case ToolbarItemTypeEnum.Edit:
          if (this.selectedRowsControl) {
            this.$router.push(
              `${item.Path}/${this.$parent.selectedRows[0]}?menu_id=${this.$parent.menuId}`
            );
          }
          break;
        case ToolbarItemTypeEnum.View:
          debugger;
          this.$store
            .dispatch("toolbar/importFormComponent", item.Path)
            .then(() => {
              this.$store.dispatch("toolbar/changeShowModal", true);
            });

          break;
        case ToolbarItemTypeEnum.Remove:
          if (this.selectedRowsControl) {
            this.$emit(this.$parent.removeFunction());
          }
          break;
        case ToolbarItemTypeEnum.Save:
          this.$emit(this.$parent.saveFunction());
          break;
        default:
        // code block
      }
    }
  }
};
</script>

<style></style>
