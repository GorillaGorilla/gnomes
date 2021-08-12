const { setBehaviourTreeForGnome, absolute } = require("./behaviour");
const Chance = require("chance");

const chance = new Chance();

const randomCardinal = (gnome = {}) => {
  const directions = {
    0: [1, 0], //north
    1: [-1, 0], //south
    2: [0, 1], //east
    3: [0, -1], //west
  };
  const direction = directions[Math.floor(Math.random() * 4)];
  gnome.direction = direction;
  return direction;
};

class Gnome {
  constructor(strength, team, id, brain = randomCardinal) {
    this.id = id;
    this.los = 4;
    this.strength = strength;
    this.team = team;
    this.direction = [0, 0];
    this.position = [0, 0];
    this.lastPosition = [0, 0];
    this.moveSpeed = 1;
    this.brain = { step: brain };
    this.name = chance.name();
    this.inPlay = true;
  }

  update(environment) {
    this.currentEnvironment = environment;
    this.brain.step();
    this.moveToPos = this.moveTo();
  }

  moveTo() {
    this.lastPosition = [...this.position];
    const destinationY =
      this.position[0] + absolute(this.direction[0]) * this.moveSpeed;
    const destinationX =
      this.position[1] + absolute(this.direction[1]) * this.moveSpeed;
    return [destinationY, destinationX];
  }

  setBehaviourTree(tree) {
    this.brain = setBehaviourTreeForGnome(this, tree);
  }

  getGnomesFromEnvironment() {
    if (!this.currentEnvironment) {
      return [];
    }

    return (
      this.currentEnvironment
        .flat()
        .filter(el => typeof el !== "string")
        .filter(g => g.id !== this.id) || []
    );
  }
}

let gnomeCount = 0;

const newGnome = (strength, team) => {
  const g = new Gnome(strength, team, gnomeCount);
  gnomeCount++;
  return g;
};

module.exports = {
  randomCardinal,
  Gnome,
  newGnome,
};

const obj = {
  status: {
    timestamp: "2021-04-13T18:07:49.460Z",
    error_code: 0,
    error_message: null,
    elapsed: 30,
    credit_count: 1,
    notice: null,
    total_count: 4674,
  },
  data: [
    {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      slug: "bitcoin",
      num_market_pairs: 9544,
      date_added: "2013-04-28T00:00:00.000Z",
      tags: [
        "mineable",
        "pow",
        "sha-256",
        "store-of-value",
        "state-channels",
        "coinbase-ventures-portfolio",
        "three-arrows-capital-portfolio",
        "polychain-capital-portfolio",
        "binance-labs-portfolio",
        "arrington-xrp-capital",
        "blockchain-capital-portfolio",
        "boostvc-portfolio",
        "cms-holdings-portfolio",
        "dcg-portfolio",
        "dragonfly-capital-portfolio",
        "electric-capital-portfolio",
        "fabric-ventures-portfolio",
        "framework-ventures",
        "galaxy-digital-portfolio",
        "huobi-capital",
        "alameda-research-portfolio",
        "a16z-portfolio",
        "1confirmation-portfolio",
        "winklevoss-capital",
        "usv-portfolio",
        "placeholder-ventures-portfolio",
        "pantera-capital-portfolio",
        "multicoin-capital-portfolio",
        "paradigm-xzy-screener",
      ],
      max_supply: 21000000,
      circulating_supply: 18681687,
      total_supply: 18681687,
      platform: null,
      cmc_rank: 1,
      last_updated: "2021-04-13T18:07:02.000Z",
      quote: {
        USD: {
          price: 63519.40504322713,
          volume_24h: 65914497068.90555,
          percent_change_1h: 0.15178788,
          percent_change_24h: 5.96322244,
          percent_change_7d: 8.95923497,
          percent_change_30d: 6.30156786,
          percent_change_60d: 33.3392705,
          percent_change_90d: 82.59117534,
          market_cap: 1186649643443.7908,
          last_updated: "2021-04-13T18:07:02.000Z",
        },
      },
    },
    {
      id: 1027,
      name: "Ethereum",
      symbol: "ETH",
      slug: "ethereum",
      num_market_pairs: 6208,
      date_added: "2015-08-07T00:00:00.000Z",
      tags: [
        "mineable",
        "pow",
        "smart-contracts",
        "ethereum",
        "coinbase-ventures-portfolio",
        "three-arrows-capital-portfolio",
        "polychain-capital-portfolio",
        "binance-labs-portfolio",
        "arrington-xrp-capital",
        "blockchain-capital-portfolio",
        "boostvc-portfolio",
        "cms-holdings-portfolio",
        "dcg-portfolio",
        "dragonfly-capital-portfolio",
        "electric-capital-portfolio",
        "fabric-ventures-portfolio",
        "framework-ventures",
        "hashkey-capital-portfolio",
        "kinetic-capital",
        "huobi-capital",
        "alameda-research-portfolio",
        "a16z-portfolio",
        "1confirmation-portfolio",
        "winklevoss-capital",
        "usv-portfolio",
        "placeholder-ventures-portfolio",
        "pantera-capital-portfolio",
        "multicoin-capital-portfolio",
        "paradigm-xzy-screener",
      ],
      max_supply: null,
      circulating_supply: 115453986.0615,
      total_supply: 115453986.0615,
      platform: null,
      cmc_rank: 2,
      last_updated: "2021-04-13T18:07:02.000Z",
      quote: {
        USD: {
          price: 2311.7910259563014,
          volume_24h: 26471944211.523533,
          percent_change_1h: 1.24818383,
          percent_change_24h: 8.62265045,
          percent_change_7d: 9.52900221,
          percent_change_30d: 24.36696064,
          percent_change_60d: 26.9847187,
          percent_change_90d: 115.42805179,
          market_cap: 266905488887.8596,
          last_updated: "2021-04-13T18:07:02.000Z",
        },
      },
    },
    {
      id: 1839,
      name: "Binance Coin",
      symbol: "BNB",
      slug: "binance-coin",
      num_market_pairs: 578,
      date_added: "2017-07-25T00:00:00.000Z",
      tags: [
        "marketplace",
        "centralized-exchange",
        "payments",
        "binance-smart-chain",
        "alameda-research-portfolio",
        "multicoin-capital-portfolio",
      ],
      max_supply: 170532785,
      circulating_supply: 154532785,
      total_supply: 170532785,
      platform: null,
      cmc_rank: 3,
      last_updated: "2021-04-13T18:06:10.000Z",
      quote: {
        USD: {
          price: 557.6242048194179,
          volume_24h: 10457736225.857357,
          percent_change_1h: -0.92924916,
          percent_change_24h: -2.81125341,
          percent_change_7d: 41.94538323,
          percent_change_30d: 109.02244471,
          percent_change_60d: 307.04778083,
          percent_change_90d: 1328.83966552,
          market_cap: 86171221354.15506,
          last_updated: "2021-04-13T18:06:10.000Z",
        },
      },
    },
    {
      id: 52,
      name: "XRP",
      symbol: "XRP",
      slug: "xrp",
      num_market_pairs: 663,
      date_added: "2013-08-04T00:00:00.000Z",
      tags: [
        "medium-of-exchange",
        "enterprise-solutions",
        "binance-chain",
        "arrington-xrp-capital",
        "galaxy-digital-portfolio",
        "a16z-portfolio",
        "pantera-capital-portfolio",
      ],
      max_supply: 100000000000,
      circulating_supply: 45404028640,
      total_supply: 99990831162,
      platform: null,
      cmc_rank: 4,
      last_updated: "2021-04-13T18:07:03.000Z",
      quote: {
        USD: {
          price: 1.86780642477643,
          volume_24h: 27966738531.22442,
          percent_change_1h: 1.94659292,
          percent_change_24h: 37.97656338,
          percent_change_7d: 88.98541531,
          percent_change_30d: 321.03770289,
          percent_change_60d: 220.90983499,
          percent_change_90d: 521.01117058,
          market_cap: 84805936404.52504,
          last_updated: "2021-04-13T18:07:03.000Z",
        },
      },
    },
    {
      id: 825,
      name: "Tether",
      symbol: "USDT",
      slug: "tether",
      num_market_pairs: 11977,
      date_added: "2015-02-25T00:00:00.000Z",
      tags: [
        "store-of-value",
        "payments",
        "stablecoin",
        "stablecoin-asset-backed",
        "solana-ecosystem",
      ],
      max_supply: null,
      circulating_supply: 45388521921.24685,
      total_supply: 46846290993.53494,
      platform: {
        id: 1027,
        name: "Ethereum",
        symbol: "ETH",
        slug: "ethereum",
        token_address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      },
      cmc_rank: 5,
      last_updated: "2021-04-13T18:06:16.000Z",
      quote: {
        USD: {
          price: 1.00089767270521,
          volume_24h: 128814170515.76369,
          percent_change_1h: 0.10016284,
          percent_change_24h: 0.00598865,
          percent_change_7d: -0.06085687,
          percent_change_30d: 0.09514328,
          percent_change_60d: 0.02360914,
          percent_change_90d: 0.11640753,
          market_cap: 45429265958.50537,
          last_updated: "2021-04-13T18:06:16.000Z",
        },
      },
    },
  ],
};

const obj2 = {
  status: {
    timestamp: "2021-04-13T18:41:50.767Z",
    error_code: 0,
    error_message: null,
    elapsed: 21,
    credit_count: 1,
    notice: null,
  },
  data: {
    1: {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      slug: "bitcoin",
      num_market_pairs: 9544,
      date_added: "2013-04-28T00:00:00.000Z",
      tags: [
        "mineable",
        "pow",
        "sha-256",
        "store-of-value",
        "state-channels",
        "coinbase-ventures-portfolio",
        "three-arrows-capital-portfolio",
        "polychain-capital-portfolio",
        "binance-labs-portfolio",
        "arrington-xrp-capital",
        "blockchain-capital-portfolio",
        "boostvc-portfolio",
        "cms-holdings-portfolio",
        "dcg-portfolio",
        "dragonfly-capital-portfolio",
        "electric-capital-portfolio",
        "fabric-ventures-portfolio",
        "framework-ventures",
        "galaxy-digital-portfolio",
        "huobi-capital",
        "alameda-research-portfolio",
        "a16z-portfolio",
        "1confirmation-portfolio",
        "winklevoss-capital",
        "usv-portfolio",
        "placeholder-ventures-portfolio",
        "pantera-capital-portfolio",
        "multicoin-capital-portfolio",
        "paradigm-xzy-screener",
      ],
      max_supply: 21000000,
      circulating_supply: 18681750,
      total_supply: 18681750,
      is_active: 1,
      platform: null,
      cmc_rank: 1,
      is_fiat: 0,
      last_updated: "2021-04-13T18:41:05.000Z",
      quote: {
        USD: {
          price: 63340.03497102094,
          volume_24h: 66559843438.73527,
          percent_change_1h: 0.18947083,
          percent_change_24h: 5.75202786,
          percent_change_7d: 8.44989019,
          percent_change_30d: 5.97154641,
          percent_change_60d: 32.93836863,
          percent_change_90d: 81.74354921,
          market_cap: 1183302698319.8704,
          last_updated: "2021-04-13T18:41:05.000Z",
        },
      },
    },
  },
};
