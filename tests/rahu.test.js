/**
 * Tests for Rahu module
 */

const rahu = require('../src/rahu');

describe('Rahu Module', () => {
  beforeEach(() => {
    // Reset module before each test
    jest.resetModules();
  });

  test('should initialize correctly', () => {
    const result = rahu.initialize();
    expect(result).toBe(true);

    const config = rahu.getConfig();
    expect(config.initialized).toBe(true);
    expect(config.version).toBe('1.0.0');
  });

  test('should initialize with custom options', () => {
    const result = rahu.initialize({ debugMode: true });
    expect(result).toBe(true);

    const config = rahu.getConfig();
    expect(config.initialized).toBe(true);
    expect(config.debugMode).toBe(true);
  });

  test('should perform example task', () => {
    rahu.initialize();
    const result = rahu.performTask('example', { key: 'value' });
    
    expect(result).toBeDefined();
    expect(result.taskName).toBe('example');
    expect(result.status).toBe('completed');
    expect(result.parameters).toEqual({ key: 'value' });
  });

  test('should perform analyze task', () => {
    rahu.initialize();
    const result = rahu.performTask('analyze', { data: [1, 2, 3, 4, 5] });
    
    expect(result).toBeDefined();
    expect(result.taskName).toBe('analyze');
    expect(result.status).toBe('completed');
    expect(result.result.itemCount).toBe(5);
  });

  test('should throw error for unknown task', () => {
    rahu.initialize();
    expect(() => {
      rahu.performTask('nonexistent');
    }).toThrow('Unknown task: nonexistent');
  });

  test('should throw error if not initialized', () => {
    // Get a fresh instance of the module
    jest.resetModules();
    const freshRahu = require('../src/rahu');
    
    expect(() => {
      freshRahu.performTask('example');
    }).toThrow('Rahu module must be initialized before performing tasks');
  });
});