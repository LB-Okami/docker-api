const contactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(req, res) {
    const { orderBy } = req.query;
    const contacts = await contactRepository.findAll(orderBy);

    res.json(contacts);
  }

  async show(req, res) {
    // Listar UM registro
    const { id } = req.params;
    const contact = await contactRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(contact);
  }

  async store(req, res) {
    // Criar um registro
    // eslint-disable-next-line prefer-destructuring
    const { name, email, phone, category_id } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Insira um nome para cadastro!' });
    }

    const contactExists = await contactRepository.findByEmail(email);

    if (contactExists) {
      return res.status(400).json({ error: 'Este e-mail já está em uso' });
    }

    const contact = await contactRepository.create({ name, email, phone, category_id });

    res.json(contact);
  }

  async update(req, res) {
    // Atualizar um registro
    const { id } = req.params;

    const { name, email, phone, category_id } = req.body;

    const contactExists = await contactRepository.findById(id);

    if (!contactExists) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Insira um nome para cadastro!' });
    }

    const contactByEmail = await contactRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return res.status(400).json({ error: 'Este e-mail já está em uso' });
    }

    const contact = await contactRepository.update(id, { name, email, phone, category_id });

    res.json(contact);
  }

  async delete(req, res) {
    // Apagar um registro
    const { id } = req.params;

    await contactRepository.delete(id);

    res.sendStatus(204);
  }
}

module.exports = new ContactController();
