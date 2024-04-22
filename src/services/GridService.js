import Api from '@/http/Api';
import store from '@/store';
export const searchPokemons = async (url) => {
    let next_url = ''
    await Api.callApi().get(url).then(response => {
         next_url = response.data.next;
         console.log(response.data.next)

        for (let item of response.data.results) {
            Api.callApi().get(`/pokemon/${item.name}`).then(res => {
                store.commit('storePokemons', res.data)
            }).catch(error => { })
        }

    }).catch(error => {

    })
    return next_url
}

export const getTypes = async() => {
    let types = [];
    await Api.callApi().get('/type/').then(response => {
        types = response.data.results
    }).catch(error => {

    })
    return types
}