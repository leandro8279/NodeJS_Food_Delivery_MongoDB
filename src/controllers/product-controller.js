const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/product-repository");

exports.get = async (req, res, next) => {
  try {
    const doc = await repository.get();
    res.status(200).send(doc);
  } catch (error) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
      error,
    });
  }
};
exports.post = async (req, res, next) => {
  const contract = new ValidationContract();
  contract.hasMinLen(
    req.body.title,
    3,
    "O título deve conter pelo menos 3 caracteres"
  );
  contract.hasMinLen(
    req.body.slug,
    3,
    "O título deve conter pelo menos 3 caracteres"
  );
  contract.hasMinLen(
    req.body.description,
    3,
    "O título deve conter pelo menos 3 caracteres"
  );

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }
  try {
    const doc = await repository.create({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      price: req.body.price,
      active: true,
      tags: req.body.tags,
    });
    res.status(201).send({
      message: "Produto cadastrado com sucesso!",
      data: doc,
    });
  } catch (_) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
    });
  }
};

exports.getBySlug = async (req, res, next) => {
  try {
    const doc = await repository.getBySlug(req.params.slug);
    res.status(200).send(doc);
  } catch (error) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
    });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const doc = await repository.getById(req.params.id);
    res.status(200).send(doc);
  } catch (_) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
    });
  }
};

exports.getByTag = async (req, res, next) => {
  try {
    const doc = await repository.getByTag(req.params.tag);
    res.status(200).send(doc);
  } catch (_) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
    });
  }
};

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({
      message: "Produto atualizado com sucesso! ",
    });
  } catch (error) {
    res.status(400).send({
      message: "Falha ao atualizar produto",
      data: error,
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.body.id);
    res.status(200).send({
      message: "Produto removido com sucesso! ",
    });
  } catch (error) {
    res.status(400).send({
      message: "Falha ao remover produto",
      data: error,
    });
  }
};
