import { fetchData } from '../api';

global.fetch = jest.fn(); // TODO:この行なんのために

describe('fetchData', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    });

    test('should fetch data successfully', async () => {
        const mockData = { data: 'Sample data'};
        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData),
        });

        const data = await fetchData('https://api.example.com/data');
        expect(fetch).toHaveBeenCalledWith('https://api.example.com/data');
        expect(data).toEqual(mockData);
    });

    test('should handle fetch error', async () => {
        (fetch as jest.Mock).mockRejectedValue(new Error('Network Error'));

        await expect(fetchData('https://api.example.com/data')).rejects.toThrow('Network Error');
        expect(fetch).toHaveBeenCalledWith('https://api.example.com/data');
    })
})
