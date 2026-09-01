(function () {
  const visitedCountries = ["USA", "Canada", "China", "Japan", "England"];

  // Open Margins palette.
  const OCEAN = "#f0ecf3";
  const LAND = "#fbfaf7";
  const VISITED = "#e8a77c";
  const STROKE = "#cfcabd";
  const EDGE = "#b9aec9";

  function initGlobe() {
    const mapContainer = document.getElementById("globe-container");
    const motionToggle = document.getElementById("globe-motion-toggle");
    if (!mapContainer || !window.d3) return;

    fetch("/js/world.json")
      .then((response) => response.json())
      .then((worldData) => {
        const width = mapContainer.clientWidth || 720;
        const height = 500;
        const sensitivity = 75;

        const projection = d3
          .geoOrthographic()
          .scale(250)
          .center([0, 0])
          .rotate([0, -30])
          .translate([width / 2, height / 2]);

        const initialScale = projection.scale();
        const pathGenerator = d3.geoPath().projection(projection);

        const svg = d3
          .select(mapContainer)
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", `0 0 ${width} ${height}`)
          .attr("role", "img")
          .attr("aria-label", "Rotating globe showing visited countries");

        svg
          .append("circle")
          .attr("fill", OCEAN)
          .attr("stroke", EDGE)
          .attr("stroke-width", "1")
          .attr("cx", width / 2)
          .attr("cy", height / 2)
          .attr("r", initialScale);

        const map = svg.append("g");

        map
          .append("g")
          .attr("class", "countries")
          .selectAll("path")
          .data(worldData.features)
          .enter()
          .append("path")
          .attr("d", (d) => pathGenerator(d))
          .attr(
            "fill",
            (d) =>
              visitedCountries.includes(d.properties.name) ? VISITED : LAND,
          )
          .style("stroke", STROKE)
          .style("stroke-width", 0.5);

        // Respect reduced motion by default, while allowing the reader to
        // explicitly start the globe with the adjacent control.
        const stillness = window.matchMedia("(prefers-reduced-motion: reduce)");
        let rotating = !stillness.matches;

        const updateMotionToggle = () => {
          if (!motionToggle) return;
          motionToggle.textContent = rotating
            ? motionToggle.dataset.pauseLabel
            : motionToggle.dataset.startLabel;
          motionToggle.setAttribute("aria-pressed", String(rotating));
        };

        motionToggle?.addEventListener("click", () => {
          rotating = !rotating;
          updateMotionToggle();
        });

        stillness.addEventListener("change", (event) => {
          if (event.matches) rotating = false;
          updateMotionToggle();
        });

        updateMotionToggle();

        d3.timer(() => {
          if (!rotating) return;
          const rotate = projection.rotate();
          const k = sensitivity / projection.scale();
          projection.rotate([rotate[0] - 1 * k, rotate[1]]);
          svg.selectAll("path").attr("d", (d) => pathGenerator(d));
        }, 200);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGlobe);
  } else {
    initGlobe();
  }
})();
