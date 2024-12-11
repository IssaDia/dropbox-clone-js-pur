import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../infrastructure/database/models/User';


const UserController = {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name, surname } = req.body;

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email déjà utilisé' });
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer un nouvel utilisateur
      const user = await User.create({
        email,
        password: hashedPassword,
        name,
        surname,
      });

      return res.status(201).json({ message: 'Utilisateur enregistré avec succès', user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Trouver l'utilisateur par email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
      }

      // Générer un token JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

      return res.status(200).json({
        message: 'Connexion réussie',
        token,
        user: { id: user.id, email: user.email, name: user.name, surname: user.surname },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  },
};

export default UserController;
