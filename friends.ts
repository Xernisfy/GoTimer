type Friend = {
  id: number;
  name: string;
  code: string;
  send_presents: boolean;
  receive_presents: boolean;
  comment: string;
};
async function get(url: string, format: "json" | "text"): Promise<any> {
  const response = await fetch(url);
  return await response[format]();
}

Deno.writeTextFile(
  "./friends.html",
  `<!doctype html>
<html>
  <head>
    <meta charset="utf8"/>
    <style>
      * {
        font-family: sans-serif;
      }

      button {
        height: 121px;
        width: 116px;
      }

      .true {
        color: green;
      }

      .false {
        color: red;
      }
    </style>
    <script src="https://kazuhikoarase.github.io/qrcode-generator/js/qrcode.js"></script>
    <script>
      function qr(code, button) {
        const qr = qrcode(1, "H");
        qr.addData(code.replace(/-/g, ''), "Numeric");
        qr.make();
        button.parentNode.innerHTML = qr.createImgTag(4);
      }
    </script>
  </head>
  <body>
    <table>
      <tr>
      <th>Code</th>
        <th>Name</th>
        <th>Kommentar</th>
      </tr>
${
    (await get("https://atlas.pokefans.net/api/pokefans/go-friends/", "json"))
      .codes.filter((f: Friend) =>
        f.send_presents && f.receive_presents && f.comment.includes("eschenk")
      ).sort((a: Friend, b: Friend) => a.comment > b.comment ? 1 : -1).map((
        friend: Friend,
      ) =>
        `      <tr>
        <td><button onclick="qr('${friend.code}', this)">Code</button></td>
        <td>${friend.name}</td>
        <td>${friend.comment}</td>
      </tr>`
      ).join("\n")
  }
    </table>
  </body>
</html>
`,
);
