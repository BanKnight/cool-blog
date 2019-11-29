import Vue from "vue"
import store from "../store"
import GitHub from "github-api";

const github = new GitHub()
let issues = null

Vue.prototype.$github = github
Vue.prototype.issues = function ()
{
    if (issues == null)
    {
        issues = github.getIssues(store.state.config.user, store.state.config.repo)
    }

    return issues
}
