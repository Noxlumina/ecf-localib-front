<style module>
.form {
  background-color: rgb(231, 231, 241);
}
.row {
  width: 100%;
  margin-bottom: 1%;
}
.tableBorder {
  border: 2px solid back;
}
.titre {
  text-decoration: underline;
  color: rgba(31, 31, 136, 0.712);
}
.searchBar {
  width: 70vw;
}
.button {
  width: 120px;
}
.searchDiv {
  display: flex;
}
.cardDiv {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.card {
  width: 300px;
  height: 200px;
  margin: 1%;
}
</style>

<template>
  <!-- <form :class="$style.form" @submit.prevent="addLocation()"> -->
  <form :class="$style.form">
    <h1 :class="[$style.titre, $style.form]">Commencer une location</h1>
    <div v-if="!isEditingVehicule">
      <h2 :class="$style.titre">Choix du véhicule</h2>
      <MDBRow :class="$style.row">
        <MDBCol>
          <div>Marque : {{ marque }}</div>
          <select v-model="marque">
            <option disabled value="">---type---</option>
            <option
              v-for="vehicule of vehicules"
              :key="vehicule._id"
              v-show="vehicule.disponibilite == true"
            >
              {{ vehicule.marque }}
            </option>
          </select>
        </MDBCol>
        <MDBCol>
          <div>Modèle : {{ modele }}</div>
          <select v-model="modele">
            <option disabled value="">---type---</option>
            <option
              v-for="vehicule of vehicules"
              :key="vehicule._id"
              v-show="vehicule.marque == marque"
            >
              {{ vehicule.modele }}
            </option>
          </select>
        </MDBCol>
        <MDBCol>
          <div>Immatriculation : {{ immatriculation }}</div>
          <select v-model="immatriculation">
            <option disabled value="">---type---</option>
            <option
              v-for="vehicule of vehicules"
              :key="vehicule._id"
              v-show="vehicule.marque == marque && vehicule.modele == modele"
            >
              {{ vehicule.immatriculation }}
            </option>
          </select>
        </MDBCol>
        <MDBBtn color="success" @:click="getByImmatriculation(immatriculation)"
          >Je choisie ce véhicule</MDBBtn
        >
      </MDBRow>
    </div>

    <MDBTable captionTop v-else :class="$style.form">
      <caption :class="$style.form">
        <h2 :class="$style.titre">Véhicule choisi</h2>
      </caption>
      <thead>
        <tr>
          <th scope="col"></th>
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
        <tr>
          <th>
            <img
              v-bind:src="vehiculechoisi.photo"
              alt="photo de vehicule"
              :class="$style.photo"
            />
          </th>
          <th scope="row">{{ vehiculechoisi.immatriculation }}</th>
          <td>{{ vehiculechoisi.modele }}</td>
          <td>{{ vehiculechoisi.marque }}</td>
          <td>{{ vehiculechoisi.etat }}</td>
          <td>{{ vehiculechoisi.prix }}</td>
          <td>{{ vehiculechoisi.disponibilite }}</td>
          <td>{{ vehiculechoisi.type }}</td>
        </tr>
      </tbody>
    </MDBTable>

    <div v-if="!isEditingLocataire">
      <MDBRow :class="$style.row">
        <h2 :class="$style.titre">Choix du locataire</h2>
        <MDBCol>
          <div>Nom du locataire : {{ nom }}</div>
          <select v-model="nom">
            <option disabled value="">---type---</option>
            <option v-for="locataire of locataires" :key="locataire.email">
              {{ locataire.nom }}
            </option>
          </select>
        </MDBCol>
        <MDBCol>
          <div>Email : {{ email }}</div>
          <select v-model="email">
            <option disabled value="">---type---</option>
            <option
              v-for="locataire of locataires"
              :key="locataire._id"
              v-show="locataire.nom == nom"
            >
              {{ locataire.email }}
            </option>
          </select>
        </MDBCol>
      </MDBRow>
      <MDBBtn color="success" @:click="getByEmail(email)">Je choisie ce locataire</MDBBtn>
    </div>

    <MDBTable captionTop v-if="isEditingLocataire" :class="$style.form">
      <caption :class="$style.form">
        <h1 :class="$style.titre">Locataire choisi</h1>
      </caption>
      <thead>
        <tr>
          <th scope="col" :class="$style.tableBorder">#locataire</th>
          <th scope="col">Nom</th>
          <th scope="col">Prénom</th>
          <th scope="col">Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{{ locatairechoisi._id }}</th>
          <td>{{ locatairechoisi.nom }}</td>
          <td>{{ locatairechoisi.prenom }}</td>
          <td>{{ locatairechoisi.email }}</td>
        </tr>
      </tbody>
    </MDBTable>

    <h2 :class="$style.titre">Choix des dates</h2>
    <MDBRow :class="$style.row">
      <MDBCol> <Datepicker v-model="date"></Datepicker> </MDBCol>
      <MDBCol>
        <MDBInput
          type="date"
          label="Date de fin"
          id="datedefin"
          v-model="modele"
          invalidFeedback="Remplissez le champ Date de fin"
          validFeedback="Tout semble ok!"
          validationEvent="input"
          required
        />
      </MDBCol>
    </MDBRow>
    <!-- <MDBBtn color="success" type="submit">Enregistrer la location</MDBBtn> -->
  </form>
</template>

<script>
import { MDBRow, MDBCol, MDBBtn, MDBTable } from "mdb-vue-ui-kit";
import { ref } from "vue";
import axios from "axios";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
// Lazy load the component we want to pass

export default {
  data() {
    return {
      vehicules: [],
      vehicule: "",
      locataires: [],
      locataire: "",
      selected: null,
      date: null,
      vehiculechoisi: "",
      locatairechoisi: "",
      isEditingVehicule: false,
      isEditingLocataire: false,
    };
  },
  computed: {},
  watch: {
    immatriculation(newImmatriculation, oldImmatriculation) {
      if (newImmatriculation != oldImmatriculation) {
        // this.getAnswer()
      }
    },
  },
  /*
   *méthode permettant de récupérer toutes les données des véhicules
   */
  async created() {
    try {
      // const res = await axios.get(`http://localhost:3000/vehicules`);
      const res1 = await axios.get(`http://localhost:5000/vehicules`);
      this.vehicules = res1.data;
      const res2 = await axios.get(`http://localhost:5000/locataires`);
      this.locataires = res2.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    /*
     *méthode permettant d'ajouter un véhicule
     */
    async addLocataireLocation() {
      // const res = await axios.post(`http://localhost:3000/vehicules`, {
      const res = await axios.post(`http://localhost:5000/vehicule`, {
        // id: this.id,
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
     *méthode permettant d'ajouter un véhicule
     */
    async addVehiculeLocation() {
      // const res = await axios.post(`http://localhost:3000/vehicules`, {
      const res = await axios.post(`http://localhost:5000/vehicule`, {
        // id: this.id,
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
    async getByImmatriculation(imma) {
      try {
        const res = await axios.get(`http://localhost:5000/immat/${imma}`);
        this.vehiculechoisi = res.data;
        console.log(this.vehiculechoisi);
      } catch (error) {
        console.log(error);
      }
      this.isEditingVehicule = true;
    },
    async getByEmail(email) {
      try {
        const res = await axios.get(`http://localhost:5000/email/${email}`);
        this.locatairechoisi = res.data;
        console.log(this.locatairechoisi);
      } catch (error) {
        console.log(error);
      }
      this.isEditingLocataire = true;
    },
  },
  name: "Louer",
  components: {
    MDBRow,
    MDBCol,
    MDBBtn,
    Datepicker,
    MDBTable,
  },
  setup() {
    //vehicules
    const immatriculation = ref("");
    const modele = ref("");
    const marque = ref("");
    const etat = ref("");
    const prix = ref();
    const disponibilite = ref(true);
    const type = ref("");
    //locataires
    const nom = ref("");
    const prenom = ref("");
    const email = ref("");
    const password = ref("");

    return {
      //vehicules
      immatriculation,
      modele,
      marque,
      etat,
      prix,
      disponibilite,
      type,
      //locataires
      nom,
      prenom,
      email,
      password,
    };
  },
};
</script>
