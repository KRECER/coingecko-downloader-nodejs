const ChainIdEnum = {
    eth : 1,
    bsc : 2,
    plg : 3,
    ftm : 4,
    arbi : 5,
    avax : 6,
    xdai : 7,
    celo : 8,
    mriver : 9,
    harm : 10,
    heco : 11,
    sol : 12,
  
    okex : 13,
    cro : 14,
    boba : 15,
    kcc : 16,
    opt : 17,
    near : 18,
    terra : 19,
  
    rinkeby : 100,
    bundle : 0,
};

const ChainNameEnum = {
    1: 'ethereum',
    2: 'binance-smart-chain',
    3: 'polygon-pos',
    4: 'fantom',
    5: 'arbitrum-one',
    6: 'avalanche-network',
    7: 'xdai',
    8: 'celo',
    9: 'moonriver',
    10: 'harmony-shard-0',
    12: 'solana',
    13: 'okexchain',
    14: 'cronos',
    15: 'boba-network',
    16: 'kucoin-community-chain',
};

const selectors = {
    tokenTableRow: 'table.sort.table.mb-0.text-sm.text-lg-normal.table-scrollable tbody tr',
    tokenTableRowLogo: 'img.mr-0.tw-max-h-5.tw-w-5.tw-overflow-hidden',
    tokenTableRowLink: 'a.tw-hidden.font-bold.tw-items-center.tw-justify-between',
    tokenDetailsAddress: 'i[data-address]',
    pagination: 'ul.pagination .page-item.next',
};

export { 
    ChainIdEnum,
    ChainNameEnum,
    selectors,
}