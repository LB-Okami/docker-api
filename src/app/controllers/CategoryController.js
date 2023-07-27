const categoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(req, res) {
    const categories = await categoryRepository.findAll();

    res.json(categories);
  }

  async show(req, res) {
    // Listar UM registro
    const { id } = req.params;
    const category = await categoryRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    res.json(category);
  }

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Insira um nome para cadastro!' });
    }

    const category = await categoryRepository.create({ name });

    res.json(category);
  }

  async update(req, res) {
    // Atualizar um registro
    const { id } = req.params;

    const { name } = req.body;

    const categoryExists = await categoryRepository.findById(id);

    if (!categoryExists) {
      return res.status(400).json({ error: 'Categoria não encontrada' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Insira um nome para categoria!' });
    }

    const categoryByName = await categoryRepository.findByName(name);

    if (categoryByName && categoryByName.id !== id) {
      return res.status(400).json({ error: 'Este nome já está em uso' });
    }

    const category = await categoryRepository.update(id, { name });

    res.json(category);
  }

  async delete(req, res) {
    // Apagar um registro
    const { id } = req.params;

    await categoryRepository.delete(id);

    res.sendStatus(204);
  }
}

module.exports = new CategoryController();
