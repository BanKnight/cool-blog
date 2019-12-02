import Vue from "vue"

Vue.prototype.$title = function (text)
{
    document.title = text;
}