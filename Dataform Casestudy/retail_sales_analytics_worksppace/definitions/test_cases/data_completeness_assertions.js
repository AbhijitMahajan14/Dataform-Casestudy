// Define the assertion function
function columnCountAssertion(ctx) {
    return async (stagingTable, targetTable) => {
      // Get the column counts for the staging and target tables
      const stagingColumns = await ctx.bigquery.query(`SELECT COUNT(*) AS count FROM \`${stagingTable}\``);
      const targetColumns = await ctx.bigquery.query(`SELECT COUNT(*) AS count FROM \`${targetTable}\``);
  
      // Compare the column counts
      const stagingCount = stagingColumns[0].count;
      const targetCount = targetColumns[0].count;
  
      if (stagingCount !== targetCount) {
        throw new Error(`Column count mismatch between ${stagingTable} (${stagingCount} columns) and ${targetTable} (${targetCount} columns)`);
      }
    };
  }
  
  // Export the assertion
  module.exports = {
    assertions: [
      {
        // Define your assertion name
        name: 'columnCountAssertion',
        // Define the assertion function
        assertion: columnCountAssertion,
        // Define the parameters for the assertion function
        params: {
          stagingTable: 'dataform_poc.retail_sales_analytics_staging',
          targetTable: 'dataform_poc.retail_sales_analytics'
        }
      }
    ]
  };
  