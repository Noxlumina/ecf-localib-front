<template>
    <MDBBtn color="primary" v-on:click="goToVehicules()"> Retour </MDBBtn>
    <h1>Modificaton des informations du véhicules</h1>
    <form>
        <!-- 2 column grid layout with text inputs for the first and last names -->
        <MDBRow class="mb-4">
            <MDBCol>
                <MDBInput type="text" label="Immatriculation" id="immatriculation" v-model="vehicule.immatriculation" />
            </MDBCol>
            <MDBCol>
                <MDBInput type="text" label="Marque" id="marque" v-model="vehicule.marque" />
            </MDBCol>
            <MDBCol>
                <MDBInput type="text" label="Modèle" id="modele" v-model="vehicule.modele" />
            </MDBCol>
        </MDBRow>
        <MDBRow class="mb-4">
            <MDBCol>
                <MDBInput type="text" label="Etat" id="etat" v-model="vehicule.etat" />
            </MDBCol>
            <MDBCol>
                <MDBInput type="number" label="Prix" id="prix" v-model="vehicule.prix" />
            </MDBCol>
            <MDBCol>
                <label>Disponibilité &nbsp;</label>
                <MDBRadio label="true" value="true" v-model="vehicule.disponibilite" inline name="inlineRadioOptions" />
                <MDBRadio label="false" value="false" v-model="vehicule.disponibilite" inline
                    name="inlineRadioOptions" />
            </MDBCol>
            <MDBCol>
                <div>Type du véhicule: {{ type }}</div>
                <select v-model="vehicule.type">
                    <option disabled value="">---type---</option>
                    <option>voiture</option>
                    <option>motocycle</option>
                    <option>utilitaire</option>
                    <option>camion</option>
                </select>
            </MDBCol>
        </MDBRow>
        <!-- Submit button -->
        <MDBBtn color="success" v-click="updateAndRedirect(vehicule)">Valider la modification</MDBBtn>
    </form>
    <router-view />
</template>
  
<script>
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBRadio } from "mdb-vue-ui-kit";
import axios from "axios";
import { ref } from "vue";


export default {

    data() {
        return { vehicule: [] };
    },
    async created() {
        try {
            const res = await axios.get('http://localhost:3000/vehicules/' + this.$route.params.id)
            this.vehicule = res.data;
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        goToVehicules() {
            this.$router.push("/vehicules");
        },
        /*
        *méthode permettant de faire la mise à jour et la redirection
        */
        updateAndRedirect(data) {
            this.update(data);
            this.goToVehicules();
        }
    },
    /*
 *méthode permettant de modifier les données d'un véhicule, mais problème non reconnu comme une fonction à nouveau
 */
    async update(data) {
        try {
            await axios.put('http://localhost:3000/vehicules/' + this.$route.params.id, {
                id: data.id,
                immatriculation: data.immatriculation,
                modele: data.modele,
                marque: data.marque,
                etat: data.etat,
                prix: data.prix,
                disponibilite: data.disponibilite,

            })
                .then((response) => console.log(response))

        } catch (error) {
            console.error(error);
        }
    },
    name: "Vehicule",
    components: {
        MDBRow,
        MDBCol,
        MDBInput,
        MDBBtn, MDBRadio
    },
  setup() {
    const immatriculation = ref("");
    const modele = ref("");
    const marque = ref("");
    const etat = ref("");
    const prix = ref("");
    const disponibilite = ref("");


    return {
        immatriculation,
        modele,
        marque,
        etat,
        prix,
        disponibilite
    };
  },
};
</script>