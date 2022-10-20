<style module>
.button {
  width: 300px;
  margin: 2px;
  opacity: 0.7;
}
.button:hover {
  opacity: 1;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.styleObject {
  color: blue;
}
</style>

<template>
  <MDBContainer fluid :class="$style.container">
    <div class="display-1" :class="$style.styleObject">Bienvenue sur Localib</div>
  </MDBContainer>
  <MDBContainer fluid :class="$style.container">
    <button
      class="d-block p-3 bg-primary text-white"
      v-on:click="goToVehicules"
      :class="$style.button"
    >
      Gestion des véhicules
    </button>
    <button
      class="d-block p-3 bg-primary text-white"
      v-on:click="goToLocataires"
      :class="$style.button"
    >
      Gestion des locataires
    </button>
    <button
      class="d-block p-3 bg-primary text-white"
      v-on:click="goToLocations"
      :class="$style.button"
    >
      Gestion des locations
    </button>
    <button
      class="d-block p-3 bg-primary text-white"
      v-on:click="goToLouer"
      :class="$style.button"
    >
      Location de véhicules
    </button>
  </MDBContainer>
</template>

<script>
import { MDBContainer } from "mdb-vue-ui-kit";
export default {
  data() {
    return {};
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
