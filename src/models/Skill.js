import { DataTypes } from "sequelize";

const Skill = (sequelize) => {
  sequelize.define('Skill', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }

  },{
    tableName: 'skills',
    timestamps: false
  })
}

export default Skill;