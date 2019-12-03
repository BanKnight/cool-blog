import Vue from "vue"
import config from "../../config"
import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://cors-anywhere.herokuapp.com/https://api.github.com/graphql';

const client = new GraphQLClient(endpoint, {
    headers: {
        authorization: `bearer ${config.token}`,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
});

const github = {}
const labels = [process.env.NODE_ENV == "development" ? process.env.NODE_ENV : "cool"]

github.get_issues = function (after)
{
    const query = `query($owner:String!,$name:String!,$first:Int!,$after:String,$labels:[String!]){
        repository(owner: $owner, name: $name) {
          issues(orderBy: {field: CREATED_AT, direction: DESC}, labels: $labels, states: [OPEN],first:$first,after:$after) {
            nodes {
              title
              createdAt
              number
              labels(first:$first)
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
        first: config.page,
        after: after,
        labels
    }

    return client.request(query, variables)
}

github.get_issue = function (number)
{
    const query = `query ($owner: String!, $name: String!,$first:Int!,$number:Int!) {
        repository(owner: $owner, name: $name) {
          issue(number: $number) {
            title
            createdAt
            number
            bodyHTML
            labels(first: $first) {
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
        first: config.page,
    }

    return client.request(query, variables)
}
/**
 * 参考链接：https://help.github.com/en/github/searching-for-information-on-github/searching-on-github
 * return:
 * {
  "data": {
    "search": {
      "issueCount": 1,
      "pageInfo": {
        "endCursor": "Y3Vyc29yOjE=",
        "hasNextPage": false
      },
      "nodes": [
        {
          "title": "test-issues",
          "bodyText": "this is a test\nthis is a test3\nlet help = 3",
          "number": 2
        }
      ]
    }
  }
}
 */
github.search = function (keyword, last)
{
    const label_filters = []

    for (let one of labels)
    {
        label_filters.push(`label:${one}`)
    }

    const query = `query($first:Int!,$after:String){
        search(query: "${keyword} repo:${config.user}/${config.repo} ${label_filters.join(" ")} author:${config.user}", type: ISSUE,first: $first, after: $after) {
          issueCount
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            ... on Issue {
              title
              createdAt
              number
              labels(first: $first) {
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
      }`

    const variables = {
        first: config.page,
        after: last,
    }
    return client.request(query, variables)
}

github.attach_comment = function (el, id)
{
    const utterances = document.createElement('script');
    utterances.type = 'text/javascript';
    utterances.async = true;
    utterances.setAttribute('issue-number', id);
    utterances.setAttribute('theme', 'github-light');
    utterances.setAttribute('repo', `${config.user}/${config.repo}`);
    utterances.crossorigin = 'anonymous';
    utterances.src = 'https://utteranc.es/client.js';

    // 找到对应容器插入，我这里用的是 comment
    el.appendChild(utterances);
}


Vue.prototype.$github = github
