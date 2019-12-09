<template>
  <div id="demo" :class="[{ collapsed: collapsed }]">
    <Modal :modalShow="showModal">
      <keep-alive>
        <component ref="formComp" :is="this.$store.state.toolbar.formComponent"></component>
      </keep-alive>
    </Modal>
    <navbar />
    <div class="demo">
      <div class="toolbar mt-2">
        <Toolbar :toolbarItems="toolbar" style="padding-left:50%" />
      </div>
      <!-- <h1>
        vue-sidebar-menu
        <a
          style="color: #000;text-transform: uppercase;font-size: 14px;font-weight: 400;"
          href="https://github.com/yaminncco/vue-sidebar-menu"
        >
          Github
        </a>
      </h1>
      <p>A vue.js sidebar menu component</p>
      <div>
        Select theme:
        <select v-model="selectedTheme">
          <option
            v-for="(theme, index) in themes"
            :key="index"
            :value="theme.input"
          >
            {{ theme.name }}
          </option>
        </select>
      </div>
      <hr style="margin: 50px 0px;border: 1px solid #e3e3e3;" />-->
      <slot />
      <sidebar-menu
        :menu="menu"
        :collapsed="collapsed"
        :theme="selectedTheme"
        :show-one-child="true"
        @toggle-collapse="onToggleCollapse"
        @item-click="onItemClick"
      />
    </div>
  </div>
</template>

<script>
const separator = {
  template: `<hr style="border-color: rgba(0, 0, 0, 0.1); margin: 20px;">`
};
import { SidebarMenu } from "vue-sidebar-menu";
import Toolbar from "@/components/Toolbar";
import Navbar from "@/components/Navbar";
import { ToolbarItemTypeEnum } from "@/common/enums/ToolbarItemTypeEnum";
import Modal from "@/components/Modal";

export default {
  name: "CustomLayout",
  components: {
    SidebarMenu,
    Modal,
    Toolbar,
    Navbar
  },
  data() {
    return {
      menu: [
        {
          header: true,
          title: "Operations",
          hiddenOnCollapse: true
        },
        {
          title: "Permit Operations",
          icon: "fa fa-download",
          child: [
            {
              href: "/Permit/List?menu_id=12",
              title: "Permit",
              icon: "fa fa-code"
            }
          ]
        },
        {
          title: "User Operations",
          icon: "fa fa-download",
          child: [
            {
              href: "/User/List?menu_id=5",
              title: "User",
              icon: "fa fa-code"
            }
          ]
        },
        {
          header: true,
          title: "Example",
          hiddenOnCollapse: true
        },
        {
          href: "/Permit/List?menu_id=5",
          title: "Permit",
          icon: "fa fa-download"
        },
        {
          href: "/events",
          title: "Events",
          icon: "fa fa-bell"
        },
        {
          href: "/styling",
          title: "Styling",
          icon: "fa fa-palette"
        },
        {
          component: separator
        },
        {
          header: true,
          title: "Example",
          hiddenOnCollapse: true
        },
        {
          href: "/disabled",
          title: "Disabled page",
          icon: "fa fa-lock",
          disabled: true
        },
        {
          title: "Badge",
          icon: "fa fa-cog",
          badge: {
            text: "new",
            class: "vsm--badge_default"
          }
        },
        {
          href: "/page",
          title: "Dropdown Page",
          icon: "fa fa-list-ul",
          child: [
            {
              href: "/page/sub-page-1",
              title: "Sub Page 01",
              icon: "fa fa-file-alt"
            },
            {
              href: "/page/sub-page-2",
              title: "Sub Page 02",
              icon: "fa fa-file-alt"
            }
          ]
        },
        {
          title: "Multiple Level",
          icon: "fa fa-list-alt",
          child: [
            {
              title: "page"
            },
            {
              title: "Level 2 ",
              child: [
                {
                  title: "page"
                },
                {
                  title: "Page"
                }
              ]
            },
            {
              title: "Page"
            },
            {
              title: "Another Level 2",
              child: [
                {
                  title: "Level 3",
                  child: [
                    {
                      title: "Page"
                    },
                    {
                      title: "Page"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      collapsed: false, //Menü başlangıçta kapalı bir şekilde mi açılsın
      themes: [
        {
          name: "Default theme",
          input: ""
        },
        {
          name: "White theme",
          input: "white-theme"
        }
      ],
      selectedTheme: "default-theme",
      showModal: false,
      selectedRows: [],
      saveFunction: Function,
      removeFunction: Function
    };
  },
  methods: {
    onToggleCollapse(collapsed) {
      console.log(collapsed);
      this.collapsed = collapsed;
    },
    onItemClick() {
      console.log("onItemClick");
      // console.log(event)
      // console.log(item)
    },
    showHideMenu() {
      this.menuShow = !this.menuShow;
    },
    getFormData(name, url) {
      let form;
      //düzenleme ve görüntüle sayfaları açılırken ilgili kayda göre açılması için
      switch (this.lastOperation) {
        case ToolbarItemTypeEnum.Edit:
        case null:
          form = this.$children.find(child => {
            return child.$options.name === name;
          });
          if (this.$route.params.id !== undefined) {
            // let list = require(`@/data/${url}.json`); //apiden ilgili kaydın  çekilmesi
            const requestData = {
              id: this.$route.params.id
            };
            this.$ApiService
              .post(url, requestData)
              .then(res => {
                debugger;
                form.formData = res.data;
                this.$infoHelper.showToast(
                  this,
                  "success",
                  `Başarılı`,
                  "Veriler başarılı bir şekilde getirildi."
                );
              })
              .catch(error => {
                this.$infoHelper.showToast(
                  this,
                  "danger",
                  `${error.response.status} Hatası`,
                  error.response.statusText
                );
              });
            // form.formData = list.filter(
            //   x => x.id == parseInt(this.$route.params.id)
            // )[0];
          }
          break;
        case ToolbarItemTypeEnum.View:
          form = this.$refs["formComp"];
          if (this.selectedRows[0] !== undefined) {
            let list = require(`@/data/${url}.json`);
            form.formData = list.filter(
              x => x.id == parseInt(this.selectedRows[0])
            )[0];
          }
          break;
        default:
          break;
      }
    }
  },
  computed: {
    toolbar() {
      //her sayfa geçişinde ilgili menüye göre kullanıcının haklarına bakılması ve toolbarın tekrardan oluşturulması
      let toolbar = [];
      let roleMenus = this.$store.state.toolbar.roleMenus;
      if (this.menuId != undefined && Object.keys(roleMenus).length > 0) {
        let t = roleMenus.filter(x => x.MENU_ID === parseInt(this.menuId))[0];
        if (t.MENU_AUTH.length > 0)
          toolbar = t.MENU_AUTH.sort((x, y) => x.Sequence - y.Sequence);
      }
      return toolbar;
    },
    menuId() {
      return this.$route.query.menu_id;
    },
    lastOperation() {
      return this.$store.state.toolbar.lastOperation;
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600");
body,
html {
  margin: 0;
  padding: 0;
}
body {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 18px;
  background-color: #f2f4f7;
  color: #262626;
}
#demo {
  padding-left: 350px;
}
#demo.collapsed {
  padding-left: 50px;
}
.demo {
  padding: 50px;
}
.container {
  max-width: 900px;
}
pre {
  font-family: Consolas, monospace;
  color: #000;
  background: #fff;
  border-radius: 2px;
  padding: 15px;
  line-height: 1.5;
  overflow: auto;
}
</style>
