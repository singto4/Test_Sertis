module.exports = (sequelize, Sequelize) => {
    const Properties = sequelize.define(
      'properties',
      {
        name: {
          type: Sequelize.STRING,
          field: 'Name',
          primaryKey: true
        },
        status: {
          type: Sequelize.STRING,
          field: 'Status'
        },
        content: {
            type: Sequelize.STRING,
            field: 'Content'
        },
        category: {
            type: Sequelize.STRING,
            field: 'Category'
        },
        author: {
            type: Sequelize.STRING,
            field: 'Author'
        }

      },
      {
        timestamps: false,
        freezeTableName: true
      } 
    );
    return Properties;
};

  