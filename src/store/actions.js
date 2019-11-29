import Vue from "vue";

export default {
    async load_config({ commit })
    {
        const resp = await Vue.axios("config.json")

        console.log('action get config')

        await commit("init_config", resp.data)
    }
}