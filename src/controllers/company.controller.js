import { Company } from "../database/connectionDB.js"

export const getCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Company.findOne({
      where: {
        id,
        status: 'activo'
      },
      attributes: {
        exclude: ['password', 'status', 'createdAt', 'updatedAt']
      }
    });

    if(!company) return res.status(404).json({
      message: 'Compañía no encontrado'
    })

    res.status(200).json({
      ok: true,
      company
    })
  } catch (error) {
    res.status(500).json({message: error.massage})
  }
}

export const updatecompany = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Company.findByPk(id);
    if(!company) return res.status(404).json({
      message: 'Compañía no encontrada'
    })

    company.set(req.body)
    await company.save();

    res.status(200).json({
      ok: true,
      message: 'La compañía ha sido actualizado'
    })
  } catch (error) {
    res.status(500).json({message: error.massage})
  }
}

export const deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Company.findByPk(id);
    if(!company) return res.status(404).json({
      message: 'Compañía no encontrado'
    })

    company.set(req.body)
    await company.save();

    res.status(200).json({
      ok: true,
      message: 'La compañia ha sido eliminado'
    })
  } catch (error) {
    res.status(500).json({message: error.massage})
  }
}
