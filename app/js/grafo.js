sigma.classes.graph.addMethod('neighbors', function(nodeId) {
    var k,
        neighbors = {},
        index = this.allNeighborsIndex[nodeId] || {};

    for (k in index)
      neighbors[k] = this.nodesIndex[k];

    return neighbors;
  });

  sigma.neo4j.cypher(
    {url: 'http://107.170.99.162:7474', user: 'neo4j', password: 'DigitalOceanServer'},
    "match p=(b)-[r:Tweet]->(a) where size((b)-[:Tweet]->()) > 1 return p,labels(a) limit 500",
    {container: 'graph-container'},
     function(s){


      s.settings({
          edgeColor: 'default',
          defaultEdgeColor: '#6f6f73'
        });
      s.graph.nodes().forEach(function(node){
          if(node.neo4j_labels.indexOf("Conglomerado") > -1) {
              node.color = '#b62d17';
              node.size = 21;
          }else if(node.neo4j_labels.indexOf("Partido") > -1) {
              node.color = '#009000';
              node.size = 13;
          }else if(node.neo4j_labels.indexOf("Politico") > -1) {
              node.color = '#1360b3';
              node.size = 8;
          }else{
              node.color = '#ffff00';
              node.size = 2;
          }
        node.label = node.neo4j_data.nombre;

      });
      s.graph.nodes().forEach(function(n) {
        n.originalColor = n.color;
      });
      s.graph.edges().forEach(function(e) {
        e.originalColor = e.color;
      });

      s.bind('clickNode', function(e) {
        var nodeId = e.data.node.id,
            toKeep = s.graph.neighbors(nodeId);
        toKeep[nodeId] = e.data.node;

        s.graph.nodes().forEach(function(n) {
          if (toKeep[n.id])
            n.color = n.originalColor;
          else
            n.color = '#eee';
        });

        s.graph.edges().forEach(function(e) {
          if (toKeep[e.source] && toKeep[e.target])
            e.color = e.originalColor;
          else
            e.color = '#eee';
        });
        s.refresh();
      });

      s.bind('clickStage', function(e) {
        s.graph.nodes().forEach(function(n) {
          n.color = n.originalColor;
        });

        s.graph.edges().forEach(function(e) {
          e.color = e.originalColor;
        });

        // Same as in the previous event:
        s.refresh();
      });
      s.startForceAtlas2({worker: true, barnesHutOptimize: false});
      s.refresh();
    }
  );
