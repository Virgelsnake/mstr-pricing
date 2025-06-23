const request = require('supertest');
const express = require('express');
const allocatedDayRoutes = require('../routes/allocatedDays');

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
  doc: jest.fn(),
  add: jest.fn(),
};

// Chaining mocks
mockDb.collection.mockReturnThis();
mockDb.where.mockReturnThis();
mockDb.doc.mockReturnThis();

app.use((req, res, next) => {
  req.db = mockDb;
  next();
});

app.use('/api/allocated-days', allocatedDayRoutes);

describe('Allocated Day API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/allocated-days', () => {
    it('should fetch all allocated days for a user', async () => {
      const mockDays = [
        { id: 'day1', userId: 'testUserId', jurisdictionId: 'usa', date: '2023-01-01' },
      ];
      const snapshot = {
        empty: false,
        docs: mockDays.map(doc => ({ id: doc.id, data: () => doc })),
      };
      mockDb.get.mockResolvedValue(snapshot);

      const res = await request(app).get('/api/allocated-days');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockDays);
      expect(mockDb.collection).toHaveBeenCalledWith('allocatedDays');
      expect(mockDb.where).toHaveBeenCalledWith('userId', '==', 'testUserId');
    });

    it('should return an empty array if no days are found', async () => {
        const snapshot = {
            empty: true,
            docs: []
        };
        mockDb.get.mockResolvedValue(snapshot);

        const res = await request(app).get('/api/allocated-days');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
    });

    it('should return 500 on server error', async () => {
      mockDb.get.mockRejectedValue(new Error('Server Error'));

      const res = await request(app).get('/api/allocated-days');

      expect(res.statusCode).toEqual(500);
      expect(res.text).toBe('Server Error');
    });
  });

  describe('POST /api/allocated-days', () => {
    it('should allocate a new day', async () => {
      const newDayData = { jurisdictionId: 'usa', date: '2023-01-02' };
      const jurisdictionDoc = {
          exists: true,
          data: () => ({ name: 'USA' })
      };
      const newDocRef = { id: 'newDayId' };

      // Mock the jurisdiction fetch
      mockDb.get.mockResolvedValue(jurisdictionDoc);
      // Mock the allocated day creation
      mockDb.add.mockResolvedValue(newDocRef);

      const res = await request(app).post('/api/allocated-days').send(newDayData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
          id: 'newDayId',
          userId: 'testUserId',
          jurisdictionId: 'usa',
          jurisdictionName: 'USA',
          date: '2023-01-02'
      });
      expect(mockDb.collection).toHaveBeenCalledWith('jurisdictions');
      expect(mockDb.doc).toHaveBeenCalledWith('usa');
      expect(mockDb.collection).toHaveBeenCalledWith('allocatedDays');
      expect(mockDb.add).toHaveBeenCalledWith(expect.objectContaining({
          userId: 'testUserId',
          jurisdictionId: 'usa',
          date: '2023-01-02'
      }));
    });

    it('should return 404 if jurisdiction not found', async () => {
        const jurisdictionDoc = { exists: false };
        mockDb.get.mockResolvedValue(jurisdictionDoc);

        const res = await request(app).post('/api/allocated-days').send({ jurisdictionId: 'nonexistent', date: '2023-01-01' });

        expect(res.statusCode).toEqual(404);
        expect(res.body.msg).toBe('Jurisdiction not found');
    });

    it('should return 500 on server error', async () => {
      const jurisdictionDoc = {
          exists: true,
          data: () => ({ name: 'USA' })
      };
      mockDb.get.mockResolvedValue(jurisdictionDoc);
      mockDb.add.mockRejectedValue(new Error('Server Error'));

      const res = await request(app).post('/api/allocated-days').send({ jurisdictionId: 'usa', date: '2023-01-01' });

      expect(res.statusCode).toEqual(500);
      expect(res.text).toBe('Server Error');
    });
  });
});
