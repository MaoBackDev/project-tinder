import { DataTypes } from "sequelize";

const Service = (sequelize) => {
  sequelize.define('Service', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price_total: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM('creado', 'solicitado', 'asignado', 'proceso', 'finalizado'),
      defaultValue: 'creado'
    }

  },{
    tableName: 'services'
  })
}

export default Service;