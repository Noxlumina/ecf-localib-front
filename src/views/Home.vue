<template>
  <MDBContainer :style="container">
    <div class="display-1" :style="styleObject">Bienvenue sur Localib</div>
  </MDBContainer>
</template>

<script>
import { MDBContainer } from "mdb-vue-ui-kit";
export default {
  data() {
    return {
      container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      },
      styleObject: {
        color: "blue",
      },
    };
  },
  methods: {
    /*
    *méthodes de redirection non utilisé car doublon avec la navbar
    */
    goToVehicules() {
      this.$router.push("/vehicules");
    },
    goToLocataires() {
      this.$router.push("/locataires");
    },
    goToLocations() {
      this.$router.push("/locations");
    },
    goToLouer() {
      this.$router.push("/louer");
    },
  },
  name: "Home",
  components: {
    MDBContainer,
  },
};
</script>
