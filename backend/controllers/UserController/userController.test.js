import express from 'express';
import router from '../../routes/userRoutes';
import supertest from 'supertest';
import User from '../../models/user';
import cfg from '../../config';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const validUser = {
  userEmail: 'idiot@idiot.com',
  userName: 'billyBob',
  userPassword: 'bob1232394898'
};

describe ('Integration tests', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);
  
  beforeAll(() => {
    mongoose.connect(cfg.MONGOURI, { useNewURlParser: true });
  });
  
  afterEach(async () => {
    await User.deleteMany();
  });
  
  afterAll((done) => {
    mongoose.connection.close();
    done();
  });
  
  describe('Create user', () => {
    it('should save a user to the database', async () => {
      await request.post('/user').send(validUser)
      const user = await User.findOne({ email: validUser.userEmail });
      expect(user.email).toBe(validUser.userEmail);
    });
    
    it('should not allow duplicate email addresses', async () => {
      await request.post('/user').send(validUser);
      const res = await request.post('/user').send({ 
        userName: 'fuck', 
        userEmail: 'idiot@idiot.com',
        userPassword: 'fuckjavascript123'
      });
      expect(res.body.error).toBe('Email already exists, Try again');
      const users = await User.find({ email: validUser.userEmail });
      expect(users.length).toBe(1);
    });
    
    it('should only accept requests with all fields', async () => {
      const res = await request.post('/user').send({
        fuck: 'the police',
        poo: 'stinky',
        userEmail: 'stinky@poo.com',
        userPassword: 'helloWorld'
      });
      expect(res.body.error).toBe('Must provide email and password');
      
      const res2 = await request.post('/user').send({});
      expect(res2.body.error).toBe('Must provide email and password');
      
      const res3 = await request.post('/user').send({
        userPassword: 'woeifjqpwoeifjwef'
      });
      expect(res3.body.error).toBe('Must provide email and password');
      
      const user = await User.find({ email: 'stinky@poo.com'});
      expect(user.length).toBe(0);
    });
  
    it('should only accept passwords of eight or more characters', async () => {
      const res = await request.post('/user').send({
        userName: 'bigloser',
        userEmail: 'email@email.com',
        userPassword: 'badpass'
      });
      const newUser = await User.find({ email: 'email@email.com' });
      expect(res.status).toBe(422);
      expect(newUser.length).toBe(0);
    });
    
    it('should hash user passwords', async () => {
      await request.post('/user').send(validUser);
      const user = await User.find({ email: validUser.userEmail });
      expect(user.userPassword).not.toBe(validUser.userPassword);
    });
  });
  
  describe('Get user', () => {
    it('should retrieve user via accessToken', async () => {
      await request.post('/user').send(validUser);
      const user = await User.findOne({ email: validUser.userEmail });
      const token = jwt.sign({ userId: user._id }, cfg.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d",
      });
      const res = await request.get('/user').set(
        'Authorization',
        `Bearer ${token}`
      );
      expect(res.status).toBe(200);
      expect(res.body.user.password).toBe(user.password);
    });
    
    it('should reject expired tokens', async () => {
      await request.post('/user').send(validUser);
      const user = await User.findOne({ email: validUser.userEmail });
      const token = jwt.sign({ userId: user._id }, cfg.ACCESS_TOKEN_SECRET, {
        expiresIn: '50ms'
      });
      setTimeout(async () => {
        const res = await request.get('/user').set(
          'Authorization',
          `Bearer ${token}`
        ); 
        expect(res.status).toBe(402);
      }, 55);
    });

    it('should reject invalid tokens', async () => {
      const res = await request.get('/user').set(
        'Authorization',
        'Bearer fuckobob.com'
      );
      expect(res.status).toBe(402);
    });
  });
});