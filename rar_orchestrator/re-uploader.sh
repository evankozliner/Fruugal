zip -r solr-conf.zip solr

# Delete collection
curl -X POST -u "$RAR_USERNAME":"$RAR_PASSWORD" "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/$RAR_CLUSTER_ID/solr/admin/collections" -d "action=DELETE&name=example_collection&wt=json"

# Delete config
curl -X DELETE -u "$RAR_USERNAME":"$RAR_PASSWORD" "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/$RAR_CLUSTER_ID/config/example_config"

# Upload config
curl -X POST -H "Content-Type: application/zip" -u "$RAR_USERNAME":"$RAR_PASSWORD" "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/$RAR_CLUSTER_ID/config/example_config" --data-binary @solr-conf.zip

# create collection
curl -X POST -u "$RAR_USERNAME":"$RAR_PASSWORD" "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/$RAR_CLUSTER_ID/solr/admin/collections" -d "action=CREATE&name=example_collection&collection.configName=example_config"

# Upload docs
curl -X POST -H "Content-Type: application/json" -u "$RAR_USERNAME":"$RAR_PASSWORD" "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/$RAR_CLUSTER_ID/solr/example_collection/update" --data-binary @data/data-$1.json

rm solr-conf.zip
