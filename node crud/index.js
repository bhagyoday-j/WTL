const http = require("http");

const arr = [
  { id: 1, name: "Bhagyoday" },
  { id: 2, name: "Mahesh" }
];

const server = http.createServer((req, res) => {

  // CREATE
  if (req.url === "/create" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const data = JSON.parse(body);

      arr.push(data);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        message: "User created successfully",
        data: data
      }));
    });

    return;
  }

  // READ ALL
  if (req.url === "/read" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(arr));
  }

  // READ BY ID
  if (req.url.startsWith("/read/") && req.method === "GET") {
    const id = Number(req.url.split("/")[2]);

    const user = arr.find(item => item.id === id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("User not found");
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(user));
  }

  // UPDATE BY ID
  if (req.url.startsWith("/update/") && req.method === "PUT") {
    const id = Number(req.url.split("/")[2]);

    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const updatedData = JSON.parse(body);

      const index = arr.findIndex(item => item.id === id);

      if (index === -1) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        return res.end("User not found");
      }

      arr[index] = {
        ...arr[index],
        ...updatedData
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        message: "User updated successfully",
        data: arr[index]
      }));
    });

    return;
  }

  // DELETE BY ID
  if (req.url.startsWith("/delete/") && req.method === "DELETE") {
    const id = Number(req.url.split("/")[2]);

    const index = arr.findIndex(item => item.id === id);

    if (index === -1) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("User not found");
    }

    const deletedUser = arr.splice(index, 1);

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({
      message: "User deleted successfully",
      data: deletedUser[0]
    }));
  }

  // ROUTE NOT FOUND
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Route not found");
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});