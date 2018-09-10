import API from "./_helpers/api";
import Vue from "vue";

export default {
    state: {
        current: {
            district: null
        },
        districts: [],
        districtSearchResults: []
    },
    mutations: {
        setCurrentDistrict(state, payload) {
            const district = state.districtSearchResults.find(r => r.value === payload.district);
            console.log(district);
            state.current.district = district;
        },
        setDistricts(state, payload) {
            state.districts = payload;
        },
        setDistrictSearchResults(state, payload) {
            state.districtSearchResults = payload;
        }
    },
    actions: {
        async getDistricts({ commit }, data) {
            const districts = await API.get('/api/vote/district.json', data).then((request) => {

                Vue.i18n.add('en', {vote: request.data.i18n.en})
                Vue.i18n.add('fr', {vote: request.data.i18n.fr})
                Vue.i18n.add('nl', {vote: request.data.i18n.nl})

                return request.data.data
            });

            commit('setDistricts',districts);
        },
        filterDistricts({commit, state}, queryString){

            const districts = state.districts.map(m => {
                m.value = m.code + " " + Vue.i18n.translate('vote.' + m.name);
                return m;
            });
            
            const createDistrictFilter = function(queryString) {
                return (district) => {
                    return (district.value.toLowerCase().includes(queryString.toLowerCase()))
                }
            };
            
            const results = queryString ? districts.filter(createDistrictFilter(queryString)) : districts;
            commit('setDistrictSearchResults',results);
        },
        
        getElection(data) {
          console.log(data);
          // return electoral lists and candidates for a given district
        }
    },
    getters: {
        districts: state => {
            return state.districts;
        },
        districtSearchResults: state => {
            return state.districtSearchResults;
        }
    }
  
};