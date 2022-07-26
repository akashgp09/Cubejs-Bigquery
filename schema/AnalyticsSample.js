// cube(`Transactions`, {
//   sql: `SELECT
//     (SUM (total_transactions_per_user) / COUNT(fullVisitorId) ) AS avg_total_transactions_per_user
//     FROM (
//     SELECT
//     fullVisitorId,
//     SUM (totals.transactions) AS total_transactions_per_user
//     FROM
//     \`bigquery-public-data.google_analytics_sample.ga_sessions_*\`
//     WHERE
//     _TABLE_SUFFIX BETWEEN '20170701' AND '20170731'
//     AND totals.transactions IS NOT NULL
//     GROUP BY
//     fullVisitorId )
//     `,
// });
// WHERE
// _TABLE_SUFFIX BETWEEN '20170701'
// AND '20170731'

// SELECT
//   (SUM (total_transactions_per_user) / COUNT(fullVisitorId) ) AS avg_total_transactions_per_user
// FROM (
//   SELECT
//     fullVisitorId,
//     SUM (totals.transactions) AS total_transactions_per_user
//   FROM
//     `bigquery-public-data.google_analytics_sample.ga_sessions_*`
//   WHERE
//     _TABLE_SUFFIX BETWEEN '20170701'
//     AND '20170731'
//     AND totals.transactions IS NOT NULL
//   GROUP BY
//     fullVisitorId )

// // WHERE
// // _TABLE_SUFFIX BETWEEN '20170701'
// // AND '20170731'

// // FORMAT_TIMESTAMP('%Y%m%d', TIMESTAMP(${from}))
// const callback = (FILTER_PARAMS) => {
//   console.log(FILTER_PARAMS);
// };

// WHERE ${FILTER_PARAMS.GA_Sessions.date.filter(
//   (from, to) =>
//     `_TABLE_SUFFIX >= FORMAT_TIMESTAMP('%Y%m%d', TIMESTAMP(${from})) AND _TABLE_SUFFIX <= FORMAT_TIMESTAMP('%Y%m%d', TIMESTAMP(${to}))`
// )}
cube(`GA_Sessions`, {
  sql: `
      SELECT *
      FROM    \`bigquery-public-data.google_analytics_sample.ga_sessions_*\`
    `,

  measures: {
    countFullVisitorId: {
      sql: `fullVisitorId`,
      type: `count`,
    },
    totalTransactionRevenue: {
      sql: `totals.transactionRevenue`,
      type: `sum`,
    },
    totalTransactions: {
      sql: `totals.transactions`,
      type: `sum`,
    },
    totalVisits: {
      sql: `totals.visits`,
      type: `sum`,
    },
    totalPageViews: {
      sql: `totals.pageviews`,
      type: `sum`,
    },
    avgRevenueByUserPerVisit: {
      sql: `${CUBE.totalTransactionRevenue} / ${CUBE.totalVisits}`,
      type: `number`,
    },
  },

  dimensions: {
    fullVisitorId: {
      sql: `fullVisitorId`,
      type: `string`,
    },
    transactionRevenue: {
      sql: `totals.transactionRevenue`,
      type: `number`,
    },
    transactions: {
      sql: `totals.transactions`,
      type: `number`,
    },
    visits: {
      sql: `totals.visits`,
      type: `number`,
    },
    tableSuffix: {
      sql: `PARSE_TIMESTAMP('%Y%m%d',\`_TABLE_SUFFIX\`)`,
      type: `time`,
    },
  },
});

