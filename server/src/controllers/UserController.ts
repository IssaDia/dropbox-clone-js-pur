import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../infrastructure/database/models/User';
import { validationResult } from 'express-validator';

class UserController {
  constructor() {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  // Enregistrement de l'utilisateur
  async register(req: Request, res: Response): Promise<Response<any>> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, firstName, lastName, marketingConsent } = req.body;

      // Vérification si l'email existe déjà
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email déjà utilisé' });
      }

      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Création de l'utilisateur
      const user = await User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        marketingConsent,
      });

      const tokenPayload = {
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      const customToken = jwt.sign(tokenPayload, process.env.JWT_SECRET || 'secret', {
        expiresIn: '7d',
      });

      return res.status(201).json({
        message: 'Utilisateur enregistré avec succès',
        token: customToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          marketingConsent: user.marketingConsent,
        },
      });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement :', error);
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  }

  // Connexion de l'utilisateur
  async login(req: Request, res: Response): Promise<Response<any>> {
    try {
      const { email, password } = req.body;

      // Recherche de l'utilisateur par email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
      }

      // Vérification du mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
      }

      // Génération du token JWT
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        message: 'Connexion réussie',
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          marketingConsent: user.marketingConsent,
        },
      });
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  }
}

export default UserController;
