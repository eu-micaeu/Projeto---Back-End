const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {

  try {

    const { username, password } = req.body;

    const user = await User.create({ username, password });

    res.status(201).json(user);

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};

exports.login = async (req, res) => {

  const { username, password } = req.body;

  try {

    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {

      return res.status(401).json({ error: 'Invalid credentials' });

    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

exports.updateUser = async (req, res) => {

  const { id } = req.params;

  const { username, password } = req.body;

  try {

    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ error: 'User not found' });

    if (username) user.username = username;

    if (password) {

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

    }

    await user.save();

    res.json(user);

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};

exports.deleteUser = async (req, res) => {

  const { id } = req.params;

  try {

    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.destroy();
    
    res.json({ message: 'User deleted' });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
  
};
