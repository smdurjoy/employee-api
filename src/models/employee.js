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
      allowNull: false,  // Ensuring employee must have a name
    },
    positionId: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Position is mandatory
    },
    positionName: {
      type: DataTypes.STRING,
      allowNull: false,  // Position name is mandatory
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,  // Parent (manager) is optional for the top-level employee
      defaultValue: null,  // Top-level employees will have `null` as parentId
    }
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
