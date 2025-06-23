const request = require('supertest');
const express = require('express');
const jurisdictionRoutes = require('../routes/jurisdictions');

// Mock the auth middleware
jest.mock('../middleware/authMiddleware', () => (req, res, next) => {
  req.user = { id: 'testUserId' };
  next();
});

const app = express();
app.use(express.json());

// Mock Firestore DB on request
const mockDb = {
  collection: jest.fn(),
  where: jest.fn(),
  get: jest.fn(),
  add: jest.fn(),
  doc: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

// Chaining mocks
mockDb.collection.mockReturnThis();
mockDb.where.mockReturnThis();
mockDb.doc.mockReturnThis();

app.use((req, res, next) => {
  req.db = mockDb;
  next();
});

app.use('/api/jurisdictions', jurisdictionRoutes);

describe('Jurisdiction API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/jurisdictions', () => {
    it('should fetch all jurisdictions for a user', async () => {
      const mockJurisdictions = [
        { id: 'usa', name: 'USA', daysAllowed: 180, userId: 'testUserId' },
      ];
      const snapshot = {
        empty: false,
        docs: mockJurisdictions.map(doc => ({ id: doc.id, data: () => doc })),
      };
      mockDb.get.mockResolvedValue(snapshot);

      const res = await request(app).get('/api/jurisdictions');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockJurisdictions);
      expect(mockDb.collection).toHaveBeenCalledWith('jurisdictions');
      expect(mockDb.where).toHaveBeenCalledWith('userId', '==', 'testUserId');
    });

    it('should return 500 on server error', async () => {
      mockDb.get.mockRejectedValue(new Error('Server Error'));
      const res = await request(app).get('/api/jurisdictions');
      expect(res.statusCode).toEqual(500);
      expect(res.text).toBe('Server Error');
    });
  });

  describe('POST /api/jurisdictions', () => {
    it('should create a new jurisdiction', async () => {
      const newJurisdiction = { name: 'Canada', daysAllowed: 180 };
      const newDocRef = { id: 'canada' };
      mockDb.add.mockResolvedValue(newDocRef);

      const res = await request(app).post('/api/jurisdictions').send(newJurisdiction);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ id: 'canada', ...newJurisdiction, userId: 'testUserId' });
      expect(mockDb.collection).toHaveBeenCalledWith('jurisdictions');
      expect(mockDb.add).toHaveBeenCalledWith({ ...newJurisdiction, userId: 'testUserId' });
    });
  });

  describe('PUT /api/jurisdictions/:id', () => {
    it('should update a jurisdiction', async () => {
        const mockJurisdiction = {
            userId: 'testUserId',
            name: 'UK',
            daysAllowed: 90,
        };
        const docSnapshot = {
            exists: true,
            data: () => mockJurisdiction,
        };
        mockDb.get.mockResolvedValue(docSnapshot);
        mockDb.update.mockResolvedValue();

        const res = await request(app).put('/api/jurisdictions/uk').send({ name: 'United Kingdom' });

        expect(res.statusCode).toEqual(200);
        expect(mockDb.collection).toHaveBeenCalledWith('jurisdictions');
        expect(mockDb.doc).toHaveBeenCalledWith('uk');
        expect(mockDb.update).toHaveBeenCalledWith({ name: 'United Kingdom' });
    });

    it('should return 404 if jurisdiction not found', async () => {
        const docSnapshot = { exists: false };
        mockDb.get.mockResolvedValue(docSnapshot);
        const res = await request(app).put('/api/jurisdictions/notfound').send({ name: 'Not Found' });
        expect(res.statusCode).toEqual(404);
    });

    it('should return 401 if user is not authorized', async () => {
        const mockJurisdiction = { userId: 'anotherUserId' };
        const docSnapshot = {
            exists: true,
            data: () => mockJurisdiction,
        };
        mockDb.get.mockResolvedValue(docSnapshot);
        const res = await request(app).put('/api/jurisdictions/unauthorized').send({ name: 'Unauthorized' });
        expect(res.statusCode).toEqual(401);
    });
  });

  describe('DELETE /api/jurisdictions/:id', () => {
    it('should delete a jurisdiction', async () => {
        const mockJurisdiction = { userId: 'testUserId' };
        const docSnapshot = {
            exists: true,
            data: () => mockJurisdiction,
        };
        mockDb.get.mockResolvedValue(docSnapshot);
        mockDb.delete.mockResolvedValue();

        const res = await request(app).delete('/api/jurisdictions/uk');

        expect(res.statusCode).toEqual(200);
        expect(res.body.msg).toBe('Jurisdiction removed');
        expect(mockDb.collection).toHaveBeenCalledWith('jurisdictions');
        expect(mockDb.doc).toHaveBeenCalledWith('uk');
        expect(mockDb.delete).toHaveBeenCalled();
    });
  });
});
