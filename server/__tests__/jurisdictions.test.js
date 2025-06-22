const request = require('supertest');
const express = require('express');
const jurisdictionRoutes = require('../routes/jurisdictions');
const Jurisdiction = require('../models/Jurisdiction');

// Mock the auth middleware
jest.mock('../middleware/auth', () => (req, res, next) => {
  req.user = { id: 'testUserId' };
  next();
});

// Mock the Jurisdiction model
jest.mock('../models/Jurisdiction');

const app = express();
app.use(express.json());
app.use('/api/jurisdictions', jurisdictionRoutes);

describe('Jurisdiction API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/jurisdictions', () => {
    it('should fetch all jurisdictions for a user', async () => {
      const mockJurisdictions = [{ name: 'USA', daysAllowed: 180 }];
      Jurisdiction.find.mockResolvedValue(mockJurisdictions);

      const res = await request(app).get('/api/jurisdictions');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockJurisdictions);
      expect(Jurisdiction.find).toHaveBeenCalledWith({ user: 'testUserId' });
    });

    it('should return 500 on server error', async () => {
      Jurisdiction.find.mockRejectedValue(new Error('Server Error'));
      const res = await request(app).get('/api/jurisdictions');
      expect(res.statusCode).toEqual(500);
      expect(res.text).toBe('Server Error');
    });
  });

  describe('POST /api/jurisdictions', () => {
    it('should create a new jurisdiction', async () => {
      const newJurisdiction = { name: 'Canada', daysAllowed: 180 };
      const savedJurisdiction = { ...newJurisdiction, _id: '1', user: 'testUserId' };

      const mockSave = jest.fn().mockResolvedValue(savedJurisdiction);
      Jurisdiction.mockImplementation(() => ({ save: mockSave }));

      const res = await request(app).post('/api/jurisdictions').send(newJurisdiction);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(savedJurisdiction);
    });
  });

  describe('PUT /api/jurisdictions/:id', () => {
    it('should update a jurisdiction', async () => {
      const mockJurisdiction = {
        _id: '1',
        name: 'UK',
        daysAllowed: 90,
        user: { toString: () => 'testUserId' },
      };
      Jurisdiction.findById.mockResolvedValue(mockJurisdiction);
      Jurisdiction.findByIdAndUpdate.mockResolvedValue({ ...mockJurisdiction, name: 'United Kingdom' });

      const res = await request(app).put('/api/jurisdictions/1').send({ name: 'United Kingdom' });

      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toBe('United Kingdom');
    });

    it('should return 404 if jurisdiction not found', async () => {
      Jurisdiction.findById.mockResolvedValue(null);
      const res = await request(app).put('/api/jurisdictions/1').send({ name: 'Not Found' });
      expect(res.statusCode).toEqual(404);
    });

    it('should return 401 if user is not authorized', async () => {
      const mockJurisdiction = {
        _id: '1',
        name: 'UK',
        daysAllowed: 90,
        user: { toString: () => 'anotherUserId' },
      };
      Jurisdiction.findById.mockResolvedValue(mockJurisdiction);
      const res = await request(app).put('/api/jurisdictions/1').send({ name: 'Unauthorized' });
      expect(res.statusCode).toEqual(401);
    });
  });

  describe('DELETE /api/jurisdictions/:id', () => {
    it('should delete a jurisdiction', async () => {
      const mockJurisdiction = {
        _id: '1',
        name: 'UK',
        daysAllowed: 90,
        user: { toString: () => 'testUserId' },
      };
      Jurisdiction.findById.mockResolvedValue(mockJurisdiction);
      Jurisdiction.findByIdAndDelete.mockResolvedValue({});

      const res = await request(app).delete('/api/jurisdictions/1');

      expect(res.statusCode).toEqual(200);
      expect(res.body.msg).toBe('Jurisdiction removed');
    });
  });
});
