import {NetworkDefinitionType} from '../../types';

export const Archway: NetworkDefinitionType = {
  mainnet: {
    chain_name: 'archway',
    chain_id: 'constantine-1',
    pretty_name: 'Constantine',
    website: 'https://archway.io/',
    logo: require('../../assets/Logos/Archway.png'),
    git_repo: 'https://github.com/archway-network',
    network_type: 'testnet',
    slip44: 118,
    bech32_prefix: 'archway',
    symbol: 'CONST',
    display: 'const',
    denom: 'uconst',
    decimals: 6,
    coingeck_id: '',
    explorer: {
      provider: 'Archway',
      url: 'https://explorer.constantine-1.archway.tech/',
      tx_page:
        'https://explorer.constantine-1.archway.tech/transactions/${txHash}',
      account_page:
        'https://explorer.constantine-1.archway.tech/account/${accountAddress}',
    },
    api: {
      rpc: [
        {
          url: 'https://rpc.constantine-1.archway.tech',
          provider: 'Archway',
        },
      ],
      lcd: [
        {
          url: 'https://api.constantine-1.archway.tech',
          provider: 'EcoStake',
        },
      ],
      grpc: [
        {
          url: '',
          provider: '',
        },
      ],
    },
  },
  testnet: [
    {
      chain_name: 'archway',
      chain_id: 'constantine-1',
      pretty_name: 'Constantine',
      website: 'https://archway.io/',
      logo: require('../../assets/Logos/Archway.png'),
      git_repo: 'https://github.com/archway-network',
      network_type: 'testnet',
      slip44: 118,
      bech32_prefix: 'const',
      symbol: 'CONST',
      display: 'const',
      denom: 'uconst',
      decimals: 6,
      coingeck_id: '',
      explorer: {
        provider: 'Archway',
        url: 'https://explorer.constantine-1.archway.tech/',
        tx_page:
          'https://explorer.constantine-1.archway.tech/transactions/${txHash}',
        account_page:
          'https://explorer.constantine-1.archway.tech/account/${accountAddress}',
      },
      api: {
        rpc: [
          {
            url: 'https://rpc.constantine-1.archway.tech',
            provider: 'Archway',
          },
        ],
        lcd: [
          {
            url: 'https://api.constantine-1.archway.tech',
            provider: 'EcoStake',
          },
        ],
        grpc: [
          {
            url: '',
            provider: '',
          },
        ],
      },
    },
  ],
};
