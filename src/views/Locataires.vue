<template>
  <div>
    <MDBBtn color="success" v-on:click="show" v-if="!isEditing">Ajouter un locataire</MDBBtn>
    <div v-else>
      <MDBBtn color="danger" v-on:click="hide">Fermer le formulaire</MDBBtn>
      <h1>Ajout d'un nouveau locataire</h1>
    </div>

    <form v-if="isEditing">
      <!-- 2 column grid layout with text inputs for the first and last names -->
      <MDBRow class="mb-4">
        <MDBCol>
          <MDBInput type="text" label="Nom" id="nom" v-model="nom" />
        </MDBCol>
        <MDBCol>
          <MDBInput type="text" label="Prénom" id="prenom" v-model="prenom" />
        </MDBCol>
      </MDBRow>
      <MDBRow class="mb-4">
        <MDBCol>
          <MDBInput type="email" label="Adresse email" id="email" v-model="email" />
        </MDBCol>
        <MDBCol>
          <MDBInput type="password" label="Password" id="password" v-model="password" />
        </MDBCol>
      </MDBRow>
      <!-- Submit button -->
      <MDBBtn color="success" @click="addLocataire()">
        Ajout d'un nouveau locataire
      </MDBBtn>
    </form>
  </div>
  <div v-if="!isEditing">
    <input type="search" class="form-control" placeholder="Type query" aria-label="Search" v-model="search" />
    <MDBBtn outline="primary"> Recherche </MDBBtn>
  </div>

  <MDBTable captionTop v-if="!isEditing">
    <caption>
      <h1> Tableau des locataires</h1>
    </caption>
    <thead>
      <tr>
        <th scope="col">#locataire</th>
        <th scope="col">Nom</th>
        <th scope="col">Prénom</th>
        <th scope="col">Email</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="locataire of locataires" :key="locataire.id">
        <th scope="row">{{ locataire.id }}</th>
        <td>{{ locataire.nom }}</td>
        <td>{{ locataire.prenom }}</td>
        <td>{{ locataire.email }}</td>
        <td>
          <MDBBtn color="warning">
            <router-link :to="{ name: 'Locataire', params: { id: locataire.id } }">Modifier</router-link>
          </MDBBtn>
        </td>
        <td>
          <MDBBtn color="danger" v-on:click="removeItem(locataire.id)">Supprimer</MDBBtn>
        </td>
      </tr>
    </tbody>
  </MDBTable>
  <router-view />
</template>

<script>
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBTable } from "mdb-vue-ui-kit";
import { ref } from "vue";
import axios from "axios";
export default {
  data() {
    //donnée utilisé pour l'affichage conditionnel
    return { locataires: [], isEditing: false };
  },
  /*
  *méthode permettant de récupérer tous les locataires lors de l'initialisation de la page
  */ 
  async created() {
    try {
      const res = await axios.get(`http://localhost:3000/locataires`);
      this.locataires = res.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    /*
    *méthode permettant de cacher du contenu
    */
    show() {
      this.isEditing = true;
    },
     /*
    *méthode permettant de montrer du contenu
    */
    hide() {
      this.isEditing = false;
    },
    /*
    *méthode permettant d'ajouter un locataire
    */
    async addLocataire() {
      const res = await axios.post(`http://localhost:3000/locataires`, {
        id: this.id,
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
      });
      this.locataires = [...this.locataires, res.data];
      this.nom = "";
      this.prenom = "";
      this.email = "";
      this.isEditing = false;
    },
    /*
    *méthode permettant de supprimer un locataire en fonction de son id
    */
    removeItem(id) {
      axios.delete(`http://localhost:3000/locataires/${id}`);
      this.locataires = this.locataires.filter((locataire) => locataire.id !== id);
    },
  },
  name: "Locataires",
  components: {
    MDBTable,
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
