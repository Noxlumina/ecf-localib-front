<template>
  <div>
    <MDBBtn color="success" v-on:click="show" v-if="!isEditing">Ajouter un véhicule</MDBBtn>
    <div v-else>
      <MDBBtn color="danger" v-on:click="hide">Fermer le formulaire</MDBBtn>
      <h1>Ajout d'un nouveau véhicule</h1>
    </div>
    <form v-if="isEditing">
      <!-- 2 column grid layout with text inputs for the first and last names -->
      <MDBRow class="mb-4">
        <MDBCol>
          <MDBInput type="text" label="Immatriculation" id="immatriculation" v-model="immatriculation" />
        </MDBCol>
        <MDBCol>
          <MDBInput type="text" label="Marque" id="marque" v-model="marque" />
        </MDBCol>
        <MDBCol>
          <MDBInput type="text" label="Modèle" id="modele" v-model="modele" />
        </MDBCol>
      </MDBRow>
      <MDBRow class="mb-4">
        <MDBCol>
          <MDBInput type="text" label="Etat" id="etat" v-model="etat" />
        </MDBCol>
        <MDBCol>
          <MDBInput type="number" label="Prix" id="prix" v-model="prix" />
        </MDBCol>
        <MDBCol>
          <label>Disponibilité &nbsp;</label>
          <MDBRadio label="true" value="true" v-model="disponibilite" inline name="inlineRadioOptions" />
          <MDBRadio label="false" value="false" v-model="disponibilite" inline name="inlineRadioOptions" />
        </MDBCol>
        <MDBCol>
          <div>Type du véhicule: {{ type }}</div>
          <select v-model="type">
            <option disabled value="">---type---</option>
            <option>voiture</option>
            <option>motocycle</option>
            <option>utilitaire</option>
            <option>camion</option>
          </select>
        </MDBCol>
      </MDBRow>
      <!-- Submit button -->
      <MDBBtn color="success" @click="addVehicule()">Ajout du nouveau véhicule</MDBBtn>
    </form>
  </div>
  <div v-if="!isEditing">
    <input type="search" class="form-control" placeholder="Type query" aria-label="Search" v-model="search" />
    <MDBBtn outline="primary"> Recherche </MDBBtn>
  </div>
  <MDBTable captionTop v-if="!isEditing">
    <caption>
      <h1>Tableau des véhicules</h1>
    </caption>
    <thead>
      <tr>
        <th scope="col">Immatriculation</th>
        <th scope="col">Marque</th>
        <th scope="col">Modèle</th>
        <th scope="col">Etat</th>
        <th scope="col">Prix(à la journée)</th>
        <th scope="col">Disponibilité</th>
        <th scope="col">Type</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="vehicule of vehicules" :key="vehicule.immatriculation">
        <th scope="row">{{ vehicule.immatriculation }}</th>
        <td>{{ vehicule.modele }}</td>
        <td>{{ vehicule.marque }}</td>
        <td>{{ vehicule.etat }}</td>
        <td>{{ vehicule.prix }}</td>
        <td>{{ vehicule.disponibilite }}</td>
        <td>{{ vehicule.type }}</td>
        <td>
          <MDBBtn color="warning">
            <router-link :to="{ name: 'Vehicule', params: { id: vehicule.id } }">Modifier</router-link>
          </MDBBtn>
        </td>
        <td>
          <MDBBtn color="danger" v-on:click="removeItem(vehicule.id)">Supprimer</MDBBtn>
        </td>
      </tr>
    </tbody>
  </MDBTable>
</template>

<script>
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBTable, MDBRadio } from "mdb-vue-ui-kit";
import { ref } from "vue";
import axios from "axios";

export default {
  data() {
    return {
      vehicules: [],
      isEditing: false,
      selected: null,
    };
  },
  /*
  *méthode permettant de récupérer toutes les données des véhicules
  */
  async created() {
    try {
      const res = await axios.get(`http://localhost:3000/vehicules`);
      this.vehicules = res.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    /*
    *méthodes relatives à l'affichage conditionnel
    */
    show() {
      this.isEditing = true;
    },
    hide() {
      this.isEditing = false;
    },
    /*
        *méthode permettant d'ajouter un véhicule
        */
    async addVehicule() {
      const res = await axios.post(`http://localhost:3000/vehicules`, {
        id: this.id,
        immatriculation: this.immatriculation,
        modele: this.modele,
        marque: this.marque,
        etat: this.etat,
        prix: this.prix,
        disponibilite: this.disponibilite,
        type: this.type,
      });
      console.log(res);
      this.vehicules = [...this.vehicules, res.data];
      this.immatriculation = "";
      this.modele = "";
      this.marque = "";
      this.etat = "";
      this.prix;
      this.disponibilite = true;
      this.isEditing = false;
    },
    /*
    *méthode permettant de supprimer un véhicule en fonction de son id
    */
    removeItem(id) {
      axios.delete(`http://localhost:3000/vehicules/${id}`);
      this.vehicules = this.vehicules.filter((vehicule) => vehicule.id !== id);
    },
  },
  name: "Vehicules",
  components: {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBTable,
    MDBRadio,
  },
  setup() {
    const immatriculation = ref("");
    const modele = ref("");
    const marque = ref("");
    const etat = ref("");
    const prix = ref();
    const disponibilite = ref(true);
    const type = ref("");

    return {
      immatriculation,
      modele,
      marque,
      etat,
      prix,
      disponibilite,
      type,
    };
  },
};
</script>
