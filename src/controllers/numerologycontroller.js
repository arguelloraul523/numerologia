const NumerologyProfile = require('../models/NumerologyProfile');

const calculate = async (req, res) => {
  // TODO Fase 3: implementar algoritmos de suma y reducción numerológica
  res.status(501).json({ message: 'Endpoint pendiente de implementación (Fase 3)' });
};

const getProfile = async (req, res) => {
  try {
    const profile = await NumerologyProfile.findOne({ usuario_id: req.userId });
    if (!profile) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener perfil', detalle: error.message });
  }
};

module.exports = { calculate, getProfile };