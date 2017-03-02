# Notes
This folder provides a mechanism to make RAR queries through a seperate server, scrape new articles, and put those articles onto the RAR server. 

The justification for a new server to make RAR requests from is that we will have 2 RAR clusters to manage in the future: One that is updating and another that is serving requests. 

# RAR commands

## Create
`curl -X POST -u "$RAR_USERNAME":"$RAR_PASSWORD" "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters" -d ""`

## Status
`curl -u "$RAR_USERNAME":"$RAR_PASSWORD" "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/$RAR_CLUSTER_ID"`


## Upload config
`curl -X POST -H "Content-Type: application/zip" -u "$RAR_USERNAME":"$RAR_PASSWORD" "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/$RAR_CLUSTER_ID/config/example_config" --data-binary @{/path_to_file}/cranfield-solr-config.zip`

## Create Collection
`curl -X POST -u "$RAR_USERNAME":"$RAR_PASSWORD" "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/$RAR_CLUSTER_ID/solr/admin/collections" -d "action=CREATE&name=example_collection&collection.configName=example_config"`

## Add documents
`curl -X POST -H "Content-Type: application/json" -u "$RAR_USERNAME":"$RAR_PASSWORD" "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/$RAR_CLUSTER_ID/solr/example_collection/update" --data-binary @{/path_to_file}/cranfield-data.json`


## Delete Cluster
`curl -i -X DELETE -u "$RAR_USERNAME":"$RAR_PASSWORD" "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/$RAR_CLUSTER_ID"`

## List clusters
`curl -u "$RAR_USERNAME":"$RAR_PASSWORD" "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters"`

## List configs
`curl -u "$RAR_USERNAME":"$RAR_PASSWORD" "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/$RAR_CLUSTER_ID/config"`


## Standard SOLR query
`curl -H "Content-Type: application/json" -X POST -u "$RAR_USERNAME":"$RAR_PASSWORD" "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/$RAR_CLUSTER_ID/solr/example_collection/select?q=trump&wt=json&fl=id,title"`

## Delete conf
`curl -X DELETE -u "$RAR_USERNAME":"$RAR_PASSWORD" "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/$RAR_CLUSTER_ID/config/example_config"`

## Delete Collection
`curl -X POST -u "$RAR_USERNAME":"$RAR_PASSWORD" "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/$RAR_CLUSTER_ID/solr/admin/collections" -d "action=DELETE&name=example_collection&wt=json"`
