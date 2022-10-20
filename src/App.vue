<style module>
.logo {
  height: 50px;
  padding-left: 20px;
  opacity: 0.5;
}
.logo:hover {
  opacity: 1;
}
.background {
  background-color: rgba(31, 31, 136, 0.712);
  height: 100vh;
}
.nav {
  background-color: rgba(31, 31, 136, 0.712);
}
.navItem:hover {
  color: black;
}
.navItem {
  color: white;
  margin-left:5%;
  width:20vw;
}
</style>

<template>
  <div :class="$style.background">
    <MDBNavbar expand="lg" :class="[$style.nav]">
      <MDBNavbarBrand href="#">
        <img
          src="./assets/logo.png"
          alt="logo de localib"
          loading="lazy"
          :class="$style.logo"
        />
      </MDBNavbarBrand>
      <MDBNavbarToggler
        target="#navbarCenterAlignExample"
        @click="collapse6 = !collapse6"
      ></MDBNavbarToggler>
      <MDBCollapse id="navbarCenterAlignExample" v-model="collapse6">
        <MDBNavbarNav center class="mb-2 mb-lg-0 p-4">
          <MDBNavbarItem class="shadow-inner" to="/vehicules" active>
            <p :class="$style.navItem">Gestion des véhicules</p>
          </MDBNavbarItem>
          <MDBNavbarItem class="shadow-inner" to="/locataires" active
            ><p :class="$style.navItem">Gestion des locataires</p>
          </MDBNavbarItem>
          <MDBNavbarItem class="shadow-inner" to="/locations" active>
            <p :class="$style.navItem">Gestion locations</p>
          </MDBNavbarItem>
          <MDBNavbarItem class="shadow-inner" to="/louer" active>
            <p :class="$style.navItem">Location d'un véhicule</p>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
    <router-view />
  </div>
</template>

<script>
import {
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
} from "mdb-vue-ui-kit";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse,
  },
  setup() {
    const collapse6 = ref(false);
    const dropdown9 = ref(false);

    return {
      collapse6,
      dropdown9,
    };
  },
};
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>