<template>
  <MDBBtn color="primary" v-on:click="goToLocataires()"> Retour </MDBBtn>
  <h1>Modificaton des informations du locataires</h1>
  <form>
    <!-- 2 column grid layout with text inputs for the first and last names -->
    <MDBRow class="mb-4">
      <MDBCol>
        <MDBInput type="text" label="Nom" id="nom" v-model="locataire.nom" />
      </MDBCol>
      <MDBCol>
        <MDBInput type="text" label="Prénom" id="prenom" v-model="locataire.prenom" />
      </MDBCol>
    </MDBRow>
    <MDBRow class="mb-4">
      <MDBCol>
        <MDBInput type="email" label="Adresse email" id="email" v-model="locataire.email" />
      </MDBCol>
      <MDBCol>
        <MDBInput type="password" label="Password" id="password" v-model="locataire.password" />
      </MDBCol>
    </MDBRow>
    <!-- Submit button -->
    <MDBBtn color="success" @click="updateAndRedirect(locataire)"> Valider la modification </MDBBtn>
  </form>
  <router-view />
</template>

<script>
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-vue-ui-kit";
import { ref } from "vue";
import axios from "axios";

export default {
  /*
  *champ recevant les valeur d'un locataire
  */
  data() {
    return { locataire: [], };
  },
  /*
 *méthode se lançant à l'initialisation, et récupérant les donnée d'un locataire à partir de son id
 */
  async created() {
    try {
      const res = await axios.get('http://localhost:3000/locataires/' + this.$route.params.id)
      this.locataire = res.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    /*
    *redirection vers locataires
    */
    goToLocataires() {
      this.$router.push("/locataires");
    },
  /*
  *méthode permettant de faire la mise à jour et la redirection
  */
  updateAndRedirect(data) {
    this.update(data);
    this.goToLocataires();

  },
    /*
 *méthode permettant de modifier les données d'un locataire
 */
    async update(data) {
      try {
        await axios.put('http://localhost:3000/locataires/' + this.$route.params.id, {
          id: data.id,
          nom: data.nom,
          prenom: data.prenom,
          email: data.email
        })
          .then((response) => console.log(response))

      } catch (error) {
        console.error(error);

      }
    },
  },
  name: "Locataire",
  components: {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
  },
  setup() {
    const nom = ref("");
    const prenom = ref("");
    const email = ref("");
    const password = ref("");

    return {
      nom,
      prenom,
      email,
      password,
    };
  },
};
</script>
