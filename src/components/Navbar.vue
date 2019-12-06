<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <!-- <div class="nav-icon" v-on:click="clickShowHideMenu">
      <b-button @click="clickShowHideMenu" class="bg-dark mr-2">
        <i class="fas fa-bars" />
      </b-button>
      <div></div>
    </div> -->

    <a class="navbar-brand" href="#">Vue-App</a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active"></li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  methods: {
    clickShowHideMenu() {
      this.$emit(this.$parent.showHideMenu());
    }
  }
};
</script>

<style>
.nav-icon {
  margin: 1em;
  width: 40px;
}

.nav-icon:after,
.nav-icon:before,
.nav-icon div {
  background-color: #000;
  border-radius: 3px;
  content: "";
  display: block;
  height: 3px;
  margin: 5px 0;
  transition: all 0.2s ease-in-out;
}
.nav-icon:hover:before {
  transform: translateY(12px) rotate(135deg);
}

.nav-icon:hover:after {
  transform: translateY(-12px) rotate(-135deg);
}

.nav-icon:hover div {
  transform: scale(0);
}
</style>
