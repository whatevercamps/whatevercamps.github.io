"use strict";

const data = {
  nodes: [
    { id: 1, name: "React", family: 1 },
    { id: 2, name: "D3", family: 1 },
    { id: 3, name: "Javascript", family: 1 },
    { id: 4, name: "Angular", family: 1 },
    { id: 5, name: "UX", family: 2 },
    { id: 6, name: "Numpy", family: 3 },
    { id: 7, name: "Python", family: 3 },
    { id: 8, name: "Pandas", family: 3 },
    { id: 9, name: "Design", family: 2 },
    { id: 11, name: "API-Rest", family: 2 },
    { id: 12, name: "Django", family: 3 },
    { id: 13, name: "Java", family: 4 },
    { id: 14, name: "Back-end", family: 2 },
    { id: 15, name: "Front-end", family: 2 },
    { id: 16, name: "Bootstrap", family: 1 },
    { id: 17, name: "Scala", family: 5},
    { id: 18, name: "Play", family: 5},
    { id: 19, name: "SSR", family: 5},
    { id: 20, name: "Snowplow", family: 6},
    { id: 29, name: "DevOps", family: 7 },
    { id: 21, name: "AWS", family: 7},
    { id: 22, name: "RDS", family: 7},
    { id: 23, name: "S3", family: 7},
    { id: 24, name: "EC2", family: 7},
    { id: 25, name: "Lambda", family: 7},
    { id: 26, name: "Vue", family: 1 },
    { id: 27, name: "Nuxt", family: 1 },
    { id: 28, name: "Typescript", family: 1 },
  ],
  links: [
    { source: 3, target: 1 },
    { source: 3, target: 2 },
    { source: 3, target: 4 },

    { source: 16, target: 15 },
    { source: 3, target: 5 },

    { source: 9, target: 13 },
    { source: 9, target: 14 },

    { source: 11, target: 14 },
    { source: 14, target: 12 },

    { source: 15, target: 5 },
    { source: 15, target: 9 },

    { source: 7, target: 6 },
    { source: 7, target: 8 },
    { source: 7, target: 12 },

    { source: 17, target: 18 },
    { source: 14, target: 17 },
    { source: 14, target: 29 },

    { source: 29, target: 21 },
    { source: 21, target: 20 },
    { source: 21, target: 22 },
    { source: 21, target: 23 },
    { source: 21, target: 24 },
    { source: 21, target: 25 },

    { source: 1, target: 26 },
    { source: 27, target: 26 },
    { source: 3, target: 28 },
    { source: 19, target: 27 },
  ]
};

const height = 600;
const width = 600;

const drag = simulation => {
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3
    .drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
};

const simulation = d3
  .forceSimulation(data.nodes)
  .force(
    "link",
    d3
      .forceLink(data.links)
      .id(d => d.id)
      .strength(0.15)
  )
  .force("charge", d3.forceManyBody().strength(-50))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force(
    "collide",
    d3
      .forceCollide()
      .radius(50)
      .iterations(2)
  );

const isMobile = () => window?.innerWidth <= 720;
const graphContainerClass = () => isMobile() ? "#graphContainer-mobile" : "#graphContainer";

const svg = d3
  .select(graphContainerClass())
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);
svg.attr("id", "graph");
svg.style("overflow", "visible");

const link = svg
  .append("g")
  .attr("stroke", "#999")
  .attr("stroke-opacity", 0.6)
  .selectAll("line")
  .data(data.links)
  .join("line")
  .attr("stroke-width", 1);

const node = svg
  .append("g")
  .selectAll("g")
  .data(data.nodes)
  .join("g")
  .attr("class", "node")
  .append("circle")
  .attr("stroke", "#fff")
  .attr("stroke-width", 1)
  .attr("r", 20)
  .attr("fill", d => randomBaseColor(d.family))
  .call(drag(simulation));

// const node = svg
//   .append('g')
//   .selectAll('g')
//   .data(data.nodes)
//   .join('g')
//   .attr('class', 'node')
//   .append('circle')
//   .attr('stroke', '#fff')
//   .attr('stroke-width', 1)
//   .attr('fill', d => randomBaseColor(d.family))
//   .call(drag(simulation));

var linkText = svg
  .selectAll(".node")
  .append("text")
  .attr("class", "node-label")
  .text(d => d.name)
  .style("fill", "#eeeeee")
  .style("font-size", 18)
  .style("pointer-events", "none");

simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node.attr("cx", d => d.x).attr("cy", d => d.y);

  linkText
    .attr("x", function(d) {
      return d.x - 15;
    })
    .attr("y", function(d) {
      return d.y;
    });
});
