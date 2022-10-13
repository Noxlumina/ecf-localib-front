<template>
  <MDBNavbar expand="lg" light style="background-color: #e3f2fd" container>
    <MDBNavbarBrand href="#">
      <img src="./assets/logo.png" height="50" alt="" loading="lazy" />
    </MDBNavbarBrand>
    <MDBNavbarToggler
      target="#navbarCenterAlignExample"
      @click="collapse6 = !collapse6"
    ></MDBNavbarToggler>
    <MDBCollapse id="navbarCenterAlignExample" v-model="collapse6">
      <MDBNavbarNav center class="mb-2 mb-lg-0">
        <MDBNavbarItem to="/" active> Accueil </MDBNavbarItem>
        <MDBNavbarItem to="/vehicules" active> Gestion des véhicules </MDBNavbarItem>
        <MDBNavbarItem to="/locataires" active> Gestion des locataires </MDBNavbarItem>
        <MDBNavbarItem to="/locations" active> Gestion locations </MDBNavbarItem>
        <MDBNavbarItem to="/louer" active> Location d'un véhicule </MDBNavbarItem>
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
  // MDBDropdown,
  // MDBDropdownToggle,
  // MDBDropdownMenu,
  // MDBDropdownItem
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
    // MDBDropdown,
    // MDBDropdownToggle,
    // MDBDropdownMenu,
    // MDBDropdownItem
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
