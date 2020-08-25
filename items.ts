// https://cdn.fusioncharts.com/fusioncharts/latest/fusioncharts.js

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
    TopTrank: 14,
  },
  Beleber: {
    Beleber: 77,
    TopBeleber: 35,
  },
  Boni: {
    GlücksEi: 16,
    Rauch: 19,
    Sternenstück: 8,
  },
  Kamera: {
    Kamera: 1,
  },
  PowerUps: {
    SofortTM: 8,
    LadeTM: 7,
    Sonderbonbon: 2,
  },
  Pässe: {
    RaidPass: 0,
    FernRaidPass: 0,
    PremiumKampfPass: 3,
    EXRaidPass: 0,
  },
  TeamRocket: {
    MysteriösesTeil: 2,
    RocketRadar: 0,
  },
  Bälle: {
    Pokéball: 18,
    Superball: 54,
    Hyperball: 86,
  },
  Lockmodule: {
    Lockmodul: 20,
    GletscherLockmodul: 1,
    MoosLockmodul: 1,
    MagnetLockmodul: 1,
  },
  Beeren: {
    Himmihbeere: 18,
    Nanabbeere: 0,
    Sananabeere: 45,
    GoldeneHimmihbeere: 12,
    SilberneSananabeere: 17,
  },
  Brutmaschinen: {
    EiBrutmaschineX: 1,
    EiBrutmaschine: 2,
    SuperBrutmaschine: 16,
  },
  Entwicklung: {
    Sonnenstein: 2,
    KingStein: 2,
    Metallmantel: 1,
    Drachenhaut: 2,
    UpGrade: 3,
    SinnohStein: 6,
    EinallStein: 2,
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
      const value = source.reduce((a, b) => a + b.value, 0);
      return {
        label: p,
        value: value,
        category: source,
        showLabel: value > labelMargin ? 1 : 0,
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
