// https://cdn.fusioncharts.com/fusioncharts/latest/fusioncharts.js
// https://www.fusioncharts.com/dev/chart-attributes/pie2d

type Category = {
  label: string;
  value: number;
  category?: Array<Category>;
  showLabel?: number;
};

const data: { [name: string]: { [name: string]: number } } = {
  Tränke: {
    Trank: 0,
    Supertrank: 0,
    Hypertrank: 0,
    TopTrank: 0,
  },
  Beleber: {
    Beleber: 0,
    TopBeleber: 0,
  },
  Boni: {
    GlücksEi: 0,
    Rauch: 0,
    Sternenstück: 0,
  },
  Kamera: {
    Kamera: 1, // fix
  },
  PowerUps: {
    SofortTM: 0,
    LadeTM: 0,
    Sonderbonbon: 0,
    TopSofortTM: 0,
    TopLadeTM: 0,
  },
  Pässe: {
    RaidPass: 0,
    FernRaidPass: 0,
    PremiumKampfPass: 0,
    EXRaidPass: 0,
    Ticket: 0,
  },
  TeamRocket: {
    MysteriösesTeil: 0,
    RocketRadar: 0,
    SuperRocketRadar: 0,
  },
  Bälle: {
    Pokéball: 0,
    Superball: 0,
    Hyperball: 0,
  },
  Lockmodule: {
    Lockmodul: 0,
    GletscherLockmodul: 0,
    MoosLockmodul: 0,
    MagnetLockmodul: 0,
    RegenLockmodul: 0,
  },
  Futter: {
    Himmihbeere: 0,
    Nanabbeere: 0,
    Sananabeere: 0,
    GoldeneHimmihbeere: 0,
    SilberneSananabeere: 0,
    Knursp: 0,
  },
  Brutmaschinen: {
    EiBrutmaschineX: 1, // fix
    EiBrutmaschine: 0,
    SuperBrutmaschine: 0,
  },
  Entwicklung: {
    Sonnenstein: 0,
    KingStein: 0,
    Metallmantel: 0,
    Drachenhaut: 0,
    UpGrade: 0,
    SinnohStein: 0,
    EinallStein: 0,
  },
  Frei: {
    Frei: 0,
  },
};
const labelMargin = 10;

function createDataSource(obj: any): Array<Category> {
  return Object.keys(obj).map((p) => {
    if (typeof obj[p] === "number") {
      return {
        label: p,
        value: obj[p],
        showLabel: obj[p] > labelMargin ? 1 : 0,
      };
    } else {
      const source: Array<Category> = createDataSource(obj[p]);
      const sum = source.reduce((a, b) => a + b.value, 0);
      return {
        label: p,
        value: sum,
        category: source,
        showLabel: sum > labelMargin ? 1 : 0,
      };
    }
  }).filter((obj) => obj.category || (obj.value !== 0));
}

Deno.writeTextFileSync(
  "./items.html",
  `<!doctype html>
<html>
  <head>
    <style>
      html,
      body,
      #chart {
        height: 100%;
        margin: 0px;
      }
    </style>
    <script src="https://cdn.fusioncharts.com/fusioncharts/latest/fusioncharts.js"></script>
    <script src="https://cdn.fusioncharts.com/fusioncharts/latest/themes/fusioncharts.theme.fusion.js"></script>
  </head>
  <body>
    <div id="chart"></div>
    <script>
      FusionCharts.ready(() => {
        new FusionCharts({
          type: "multilevelpie",
          width: "100%",
          height: "100%",
          renderAt: "chart",
          dataFormat: "json",
          dataSource: {
            chart: {
              plottooltext: "$value $label ($percentValue)",
              theme: "fusion",
            },
            category: ${JSON.stringify(createDataSource({ Items: data }))}
          },
        }).render();
      });
    </script>
  </body>
</html>
`,
);
