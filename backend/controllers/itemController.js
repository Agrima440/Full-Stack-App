import Item from '../models/Item.js';

export const createItem = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;
    if (!firstName || !lastName || !email || !phoneNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const item = await Item.create({
      user: req.user._id,
      firstName,
      lastName,
      email,
      phoneNumber,
    });
    return res.status(201).json(item);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getItems = async (req, res) => {
  try {
    let items;
    if (req.user.role === 'admin') {
      items = await Item.find().sort({ createdAt: -1 });
    } else {
      items = await Item.find({ user: req.user._id }).sort({ createdAt: -1 });
    }
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phoneNumber } = req.body;
    const item = await Item.findOne({ _id: id, user: req.user._id });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    item.firstName = firstName;
    item.lastName = lastName;
    item.email = email;
    item.phoneNumber = phoneNumber;
    await item.save();
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findOneAndDelete({ _id: id, user: req.user._id });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
