import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res) => {
    try {
      const data = await autores.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static listarAutorPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const autor = await autores.findById(id);
      res.status(200).send(autor);
    } catch (err) {
      res
        .status(400)
        .send({ message: `${err.message} - Id do autor não localizado.` });
    }
  };

  static cadastrarAutor = async (req, res) => {
    let autor = new autores(req.body);
    try {
      await autor.save();
      res.status(201).send(autor.toJSON());
    } catch (err) {
      res
        .status(500)
        .send({ message: `${err.message} - falha ao cadastrar autor.` });
    }
  };

  static atualizarAutor = async (req, res) => {
    const id = req.params.id;
    try {
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static excluirAutor = async (req, res) => {
    const id = req.params.id;
    try {
        await autores.findByIdAndDelete(id);
        res.status(200).send({ message: "Autor excluído com sucesso" });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
  }
}

export default AutorController;
