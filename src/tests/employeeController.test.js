const request = require('supertest');
const app = require('../app');
const { Employee } = require("../models");

describe('GET /api/employees/hierarchy/:id', () => {
  
  // Mock data to seed the database for tests
  const mockEmployees = [
    { id: 1, name: "John Doe", positionId: 1, positionName: "CTO", parentId: null },
    { id: 2, name: "Jane Smith", positionId: 2, positionName: "Senior Software Engineer", parentId: 1 },
    { id: 3, name: "Alice Johnson", positionId: 3, positionName: "Software Engineer", parentId: 2 },
    { id: 4, name: "Bob Brown", positionId: 4, positionName: "Junior Software Engineer", parentId: 3 },
    { id: 5, name: "Emma White", positionId: 2, positionName: "Senior Software Engineer", parentId: 1 },
    { id: 6, name: "Charlie Black", positionId: 3, positionName: "Software Engineer", parentId: 5 },
  ];

  beforeAll(async () => {
    // Synchronize and insert mock data
    await Employee.sync({ force: true });
    await Employee.bulkCreate(mockEmployees);
  });

  afterAll(async () => {
    await Employee.destroy({ where: {} });  // Clean up the database
  });

  test('should return hierarchy for the given employee id', async () => {
    const response = await request(app).get('/api/employees/hierarchy/1');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        name: "John Doe",
        positionId: 1,
        positionName: "CTO",
        child: expect.any(Array)
      })
    );
    expect(response.body.child.length).toBeGreaterThan(0);
  });

  test('should handle non-existent employee id gracefully', async () => {
    const response = await request(app).get('/api/employees/hierarchy/999');  // Non-existent ID

    expect(response.status).toBe(200);
    expect(response.body).toBeNull();  // Assuming we return `null` for non-existent employees
  });

  test('should return hierarchy for employees with children as nested objects', async () => {
    const response = await request(app).get('/api/employees/hierarchy/2');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 2,
        name: "Jane Smith",
        positionId: 2,
        positionName: "Senior Software Engineer",
        child: [
          expect.objectContaining({
            id: 3,
            name: "Alice Johnson",
            positionId: 3,
            positionName: "Software Engineer",
            child: [
              expect.objectContaining({
                id: 4,
                name: "Bob Brown",
                positionId: 4,
                positionName: "Junior Software Engineer",
                child: null
              })
            ]
          })
        ]
      })
    );
  });

  test('should return 500 for invalid input or server errors', async () => {
    jest.spyOn(Employee, 'findOne').mockImplementation(() => {
      throw new Error("Database error");
    });

    const response = await request(app).get('/api/employees/hierarchy/1');
    
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Error fetching employee hierarchy' });

    Employee.findOne.mockRestore();  // Restore original functionality
  });
});
