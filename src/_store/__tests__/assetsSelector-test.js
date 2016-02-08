import expect from 'expect';
import { assetsSelector } from '../baseSelectors';

describe('assetsSelector', () => {
    it('should equal empty list when no assets', () => {
        const actual = assetsSelector({
            assets: [],
        });
        expect(actual).toEqual([]);
    });

    it('should equal the full assets list', () => {
        const assetList = [
            { id: 1, name: 'Asset1' },
            { id: 2, name: 'Asset2' },
            { id: 3, name: 'Asset3' },
        ];
        const actual = assetsSelector({
            assets: assetList,
        });
        expect(actual).toEqual(assetList);
    });
});
