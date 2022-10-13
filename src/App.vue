<template>
  <MDBNavbar expand="lg" light style="background-color: #e3f2fd" container>
    <MDBNavbarBrand href="#">
      <img src="./assets/logo.png" height="50" alt="logo de localib" loading="lazy" />
    </MDBNavbarBrand>
    <!-- Toggle button -->
    <MDBNavbarToggler
      target="#navbarCenterAlignExample"
      @click="collapse6 = !collapse6"
    ></MDBNavbarToggler>
    <!-- Collapsible wrapper -->
    <MDBCollapse id="navbarCenterAlignExample" v-model="collapse6">
      <MDBNavbarNav center class="mb-2 mb-lg-0">
        <!-- Center links -->
        <MDBNavbarItem to="/" active> Accueil </MDBNavbarItem>
        <MDBNavbarItem to="gestiondesvehicules" active>
          Gestion des véhicules
        </MDBNavbarItem>
        <MDBNavbarItem to="gestiondeslocataires" active>
          Gestion des locataires</MDBNavbarItem
        >
        <MDBNavbarItem to="gestiondeslocations" active>
          Gestion des locations</MDBNavbarItem
        >
        <MDBNavbarItem to="louerunvehicule" active>
          Location de véhicules
        </MDBNavbarItem>
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
