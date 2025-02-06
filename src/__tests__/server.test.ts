import { connect } from '../server';
import db from '../config/db';


jest.mock('../config/db');

describe('connect DB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, "authenticate")
          .mockRejectedValueOnce(new Error("There was an error connecting to the database"));
        const consoleSpy = jest.spyOn(console, 'log');

        await connect();

        expect(consoleSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            "There was an error connecting to the database"
          )
        );
    })
})