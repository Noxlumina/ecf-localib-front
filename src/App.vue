<template>
  <MDBNavbar expand="lg" dark  style="background-color: #4527a0">
    <MDBNavbarBrand href="#">
      <img src="./assets/logo.png" height="80" alt="" loading="lazy" />
    </MDBNavbarBrand>
    <MDBNavbarToggler
      target="#navbarCenterAlignExample"
      @click="collapse6 = !collapse6"
    ></MDBNavbarToggler>
    <MDBCollapse id="navbarCenterAlignExample" v-model="collapse6">
      <MDBNavbarNav center class="mb-2 mb-lg-0 p-4">
        <MDBNavbarItem class="shadow-inner" to="/" active> Accueil </MDBNavbarItem>
        <MDBNavbarItem class="shadow-inner" to="/vehicules" active> Gestion des véhicules </MDBNavbarItem>
        <MDBNavbarItem class="shadow-inner" to="/locataires" active> Gestion des locataires </MDBNavbarItem>
        <MDBNavbarItem class="shadow-inner" to="/locations" active> Gestion locations </MDBNavbarItem>
        <MDBNavbarItem class="shadow-inner" to="/louer" active> Location d'un véhicule </MDBNavbarItem>
      </MDBNavbarNav>
    </MDBCollapse>
  </MDBNavbar>
  <router-view />
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
