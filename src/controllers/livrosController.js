import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = async (req, res) => {
    try {
      const data = await livros.find().populate("autor").exec();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static listarLivroPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const livro = await livros.findById(id).populate("autor", "nome").exec();
      res.status(200).send(livro);
    } catch (err) {
      res
        .status(400)
        .send({ message: `${err.message} - Id do livro não localizado.` });
    }
  };

  static cadastrarLivro = async (req, res) => {
    let livro = new livros(req.body);
    try {
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (err) {
      res
        .status(500)
        .send({ message: `${err.message} - falha ao cadastrar livro.` });
    }
  };

  static atualizarLivro = async (req, res) => {
    const id = req.params.id;
    try {
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static excluirLivro = async (req, res) => {
    const id = req.params.id;
    try {
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro excluído com sucesso" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static listarLivroPorEditora = async (req, res) => {
    const editora = req.query.editora;
    try {
      const data = await livros.find({ editora: editora });
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
}

export default LivroController;
