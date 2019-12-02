import Vue from "vue"
import config from "../../config"
import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://api.github.com/graphql';

const client = new GraphQLClient(endpoint, {
    headers: {
        authorization: `bearer ${config.token}`,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
});

const github = {}

github.get_issues = function (after)
{
    const query = `query($owner:String!,$name:String!,$first:Int!,$after:String){
        repository(owner: $owner, name: $name) {
          issues(orderBy: {field: CREATED_AT, direction: DESC}, labels: ["development"], states: [OPEN],first:$first,after:$after) {
            nodes {
              title
              createdAt
              number
              labels(first:10)
              {
                nodes{
                  name
                }
              }
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
      }
      `;

    const variables = {
        owner: config.user,
        name: config.repo,
        first: 10,
        after: after
    }

    return client.request(query, variables)
}

github.get_issue = function (number)
{
    const query = `query ($owner: String!, $name: String!,$number:Int!) {
        repository(owner: $owner, name: $name) {
          issue(number: $number) {
            title
            createdAt
            number
            bodyHTML
            labels(first: 10) {
              nodes {
                name
              }
            }
            comments(first: null) {
              totalCount
            }
          }
        }
      }
      `

    const variables = {
        owner: config.user,
        name: config.repo,
        number: number,
    }

    return client.request(query, variables)
}


Vue.prototype.$github = github
