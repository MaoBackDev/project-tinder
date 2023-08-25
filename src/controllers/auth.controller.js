import bcrypt from 'bcrypt';
import { User, Company } from '../database/connectionDB.js'


export const registerUser = async (req, res) => {

  const { email, password, first_name, last_name } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  // select * from users where email='mao@correo.com'
  try {
    const user = await User.findOne({
      where: { email }
    })
    if(user) return res.status(404).json({
      message: 'El usuario ya existe.'
    })

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hash,
    })

    return res.status(201).json({
      ok: true,
      user: newUser,
      message: 'El usuario fue creado.'
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const registerCompany = async (req, res) => {
  const { email, password, name, nit, address, phone } = req.body;

  // select * from users where email='mao@correo.com'
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    const company = await Company.findOne({
      where: { email }
    })
    if(company) return res.status(404).json({
      message: 'El usuario ya existe.'
    })

    const newCompany = await Company.create({
      name,
      nit,
      email,
      password: hash,
      address,
      phone
    })

    return res.status(201).json({
      ok: true,
      company: newCompany,
      message: 'El usuario fue creado.'
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const login = async (req, res) => {
  const { email, type } = req.body;
  const hash = req.body.password;
  let model;

  type === 'user' ? model = User : model = Company;

  try {
    const account = await model.findOne({
      where: {
        email,
        status: 'activo'
      }
    })
    if(!account) return res.status(400).json({
      message: 'Credenciales incorrectas.'
    })

    const validPassword = bcrypt.compareSync(hash, account.password);
    if(!validPassword) return res.status(400).json({
      message: 'Credenciales incorrectas.'
    })
    
    res.status(200).json({
      ok: true,
      uuid: account.id,
      message: 'inicio de sesión exitosa.'
    })
  } catch (error) {
    
  }



 
}

// export const loginCompany = (req, res) => {
//   res.send('register')
// }