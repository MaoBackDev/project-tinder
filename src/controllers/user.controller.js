import { User, Skill } from "../database/connectionDB.js";
import { Op } from "sequelize"; 

export const getUsers = async (req, res) => {
  const { skill } = req.query;
  try {
    const users = await User.findAll({
      where: {
        status: 'activo'
      },
      attributes: {
        exclude: ['password', 'status', 'createdAt', 'updatedAt']
      },
      include: {
        model: Skill,
        attributes: ['name'],
        through: { attributes: [] },
        where: {
          name: {
            [Op.substring]: `${skill}`
          }
        }
      }
    });
    res.status(200).json({
      ok: true,
      users
    })
  } catch (error) {
    res.status(500).json({message: error.massage})
  }
}

export const getUserById = async (req, res) => {
  const { id } = req.params;

  // select first_name, last_name, etc.... from users where id=id and stauts = 'activo'

  try {
    const user = await User.findOne({
      where: {
        id,
        status: 'activo'
      },
      attributes: {
        exclude: ['password', 'status', 'createdAt', 'updatedAt']
      },
      include: {
        model: Skill,
        attributes: ['name'],
        through: { attributes: [] }
      }
    });

    if(!user) return res.status(404).json({
      message: 'Usuario no encontrado'
    })

    res.status(200).json({
      ok: true,
      user
    })
  } catch (error) {
    res.status(500).json({message: error.massage})
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if(!user) return res.status(404).json({
      message: 'Usuario no encontrado'
    })

    user.set(req.body)
    await user.save();

    res.status(200).json({
      ok: true,
      message: 'El perfil ha sido actualizado'
    })
  } catch (error) {
    res.status(500).json({message: error.massage})
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if(!user) return res.status(404).json({
      message: 'Usuario no encontrado'
    })

    user.set(req.body)
    await user.save();

    res.status(200).json({
      ok: true,
      message: 'El perfil ha sido eliminado'
    })
  } catch (error) {
    res.status(500).json({message: error.massage})
  }
}

export const addSkills = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // name = 'creador de contenido"

  try {
    const user = await User.findByPk(id);

    if(!user) return res.status(404).json({
      message: 'Usuario no encontrado'
    })

    const [skill, created] = await Skill.findOrCreate({
      where: { name },
      defaults: { name }
    })

    if(!created) console.log('la habilidad ya existe')

    await skill.addUser(user)

    res.status(201).json({
      ok: true,
      message: 'Se ha agregado la habilidad.',
      skill
    })
  } catch (error) {
    res.status(500).json({message: error.massage})
  }
}