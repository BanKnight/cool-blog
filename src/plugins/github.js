import Vue from "vue"
import config from "../../config"
import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://api.github.com/graphql';

const client = new GraphQLClient(endpoint, {
    headers: {
        authorization: `bearer ${config.tokenA}${config.tokenB}`,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
});

function req(query = {}, variables = {}) {
    return client.request(query, variables)
}

Vue.prototype.api = {
    get_issues(page) {
        const query = `query {
            repository(owner: "ChenJiaH", name: "blog") {
              issues(orderBy: {field: CREATED_AT, direction: DESC}, labels: null, first: 10, after: ${archives.cursor}) {
                nodes {
                  title
                  createdAt
                  number
                  comments(first: null) {
                    totalCount
                  }
                }
                pageInfo {
                  endCursor
                  hasNextPage
                }
              }
            }
          }`;


    }
}
