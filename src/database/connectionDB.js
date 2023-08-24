import { Sequelize } from "sequelize";
import userModel from '../models/User.js';
import companyModel from '../models/Company.js';
import skillModel from '../models/Skill.js';
import serviceModel from '../models/Service.js';


const sequelize = new Sequelize(
  process.env.POSTGRES_URL
)

userModel(sequelize);
companyModel(sequelize);
skillModel(sequelize);
serviceModel(sequelize);

const { User, Company, Skill, Service } = sequelize.models;

User.belongsToMany(Skill, { through: 'users_skills' });
Skill.belongsToMany(User, { through: 'users_skills' });

Company.hasMany(Service, {
  foreignKey: 'company_id',
  sourceKey: 'id'
})
Service.belongsTo(Company, {
  foreignKey: 'company_id',
  targetKey: 'id'
})

User.hasMany(Service, {
  foreignKey: 'user_id',
  sourceKey: 'id'
})
Service.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id'
})


export {
  sequelize,
  User,
  Company,
  Skill,
  Service
}