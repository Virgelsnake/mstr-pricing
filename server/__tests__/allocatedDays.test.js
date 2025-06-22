const request = require('supertest');
const express = require('express');
const allocatedDayRoutes = require('../routes/allocatedDays');
const AllocatedDay = require('../models/AllocatedDay');

// Mock the auth middleware
jest.mock('../middleware/auth', () => (req, res, next) => {
  req.user = { id: 'testUserId' };
  next();
});

// Mock the AllocatedDay model
jest.mock('../models/AllocatedDay');

const app = express();
app.use(express.json());
app.use('/api/allocated-days', allocatedDayRoutes);

describe('Allocated Day API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/allocated-days', () => {
    it('should fetch all allocated days for a user', async () => {
      const mockDays = [
        {
          jurisdiction: { name: 'USA' },
          date: '2023-01-01',
        },
      ];
      const mockPopulate = jest.fn().mockResolvedValue(mockDays);
      AllocatedDay.find.mockReturnValue({ populate: mockPopulate });

      const res = await request(app).get('/api/allocated-days');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockDays);
      expect(AllocatedDay.find).toHaveBeenCalledWith({ user: 'testUserId' });
    });

    it('should return 500 on server error', async () => {
      const mockPopulate = jest.fn().mockRejectedValue(new Error('Server Error'));
      AllocatedDay.find.mockReturnValue({ populate: mockPopulate });

      const res = await request(app).get('/api/allocated-days');

      expect(res.statusCode).toEqual(500);
      expect(res.text).toBe('Server Error');
    });
  });

  describe('POST /api/allocated-days', () => {
    it('should allocate a new day', async () => {
      const newDayData = { jurisdiction: 'jurisdictionId', date: '2023-01-02' };
      const populatedDay = { ...newDayData, _id: 'dayId', user: 'testUserId', jurisdiction: { name: 'Testland' } };

      const mockDocument = {
        ...newDayData,
        user: 'testUserId',
        populate: jest.fn().mockResolvedValue(populatedDay),
      };
      const mockSave = jest.fn().mockResolvedValue(mockDocument);
      AllocatedDay.mockImplementation(() => ({
        save: mockSave,
      }));

      const res = await request(app).post('/api/allocated-days').send(newDayData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(populatedDay);
      expect(mockDocument.populate).toHaveBeenCalledWith('jurisdiction', 'name');
    });

    it('should return 500 on server error', async () => {
        AllocatedDay.mockImplementation(() => ({
            save: jest.fn().mockRejectedValue(new Error('Server Error')),
        }));

        const res = await request(app).post('/api/allocated-days').send({ jurisdiction: '1', date: '2023-01-01' });

        expect(res.statusCode).toEqual(500);
        expect(res.text).toBe('Server Error');
    });
  });
});
