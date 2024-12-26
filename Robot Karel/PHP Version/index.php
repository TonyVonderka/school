<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Robot Karel</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <h1>Robot Karel</h1>
    <div class="container">
      <div class="commands-container">
        <form id="commandsForm" method="POST">
          <textarea
            id="commands"
            placeholder="Enter commands here..."
          ></textarea>
          <button type="submit">Run Commands</button>
        </form>
        <h2 class="direction"></h2>
      </div>

      <div id="grid" class="grid"></div>
    </div>

    <script>
      const gridSize = 10;
      let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(""));
      let karel = { x: 0, y: 0, direction: "E" };

      const gridElement = document.getElementById("grid");
      const commandsForm = document.getElementById("commandsForm");

      function renderGrid() {
        gridElement.innerHTML = "";
        for (let y = 0; y < gridSize; y++) {
          for (let x = 0; x < gridSize; x++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.id = `${y + 1}'-'${x + 1}`;
            if (karel.x === x && karel.y === y) {
              cell.classList.add("karel");
              cell.textContent = "🤖";
            } else {
              cell.textContent = grid[y][x];
            }
            gridElement.appendChild(cell);
          }
        }
      }

      function moveKarel(steps = 1) {
        for (let i = 0; i < steps; i++) {
          switch (karel.direction) {
            case "N":
              karel.y = Math.max(0, karel.y - 1);
              break;
            case "E":
              karel.x = Math.min(gridSize - 1, karel.x + 1);
              break;
            case "S":
              karel.y = Math.min(gridSize - 1, karel.y + 1);
              break;
            case "W":
              karel.x = Math.max(0, karel.x - 1);
              break;
          }
        }
      }

      function turnLeft(times = 1) {
        const directions = ["N", "W", "S", "E"];
        for (let i = 0; i < times; i++) {
          const index = directions.indexOf(karel.direction);
          karel.direction = directions[(index + 1) % 4];
        }
      }

      function placeObject(item) {
        grid[karel.y][karel.x] = item;
      }

      function resetGrid() {
        grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(""));
        karel = { x: 0, y: 0, direction: "E" };
        renderGrid();
      }

      commandsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const commands = document
          .getElementById("commands")
          .value.split("\n")
          .map((cmd) => cmd.trim().toUpperCase());
        commands.forEach((command) => {
          const [action, param] = command.split(" ");
          switch (action) {
            case "KROK":
              moveKarel(Number(param) || 1);
              break;
            case "VLEVOBOK":
              turnLeft(Number(param) || 1);
              break;
            case "POLOZ":
              placeObject(param || "");
              break;
            case "RESET":
              resetGrid();
          }
        });
        renderGrid();
      });

      renderGrid();
    </script>
  </body>
</html>
