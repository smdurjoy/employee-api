'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    positionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    positionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    }
  },
  {
    indexes: [
      {
        name: 'idx_employee_id',
        unique: true,
        fields: ['id'],
      },
      {
        name: 'idx_employee_parentId',
        fields: ['parentId'],
      },
    ],
  });

  // Define relationships: an employee can have multiple children (subordinates)
  Employee.associate = function(models) {
    // An employee can have multiple subordinates (children)
    Employee.hasMany(models.Employee, { foreignKey: 'parentId', as: 'children' });
    
    // An employee can have one parent (manager)
    Employee.belongsTo(models.Employee, { foreignKey: 'parentId', as: 'parent' });
  };

  return Employee;
};
