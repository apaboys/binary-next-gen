import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

import { Map } from 'immutable';
import newsReducer, { getArticles, getArticle } from '../NewsReducer';
import {
    UPDATE_NEWS_LIST,
    UPDATE_CURRENT_DAILY_REPORT,
} from '../../_constants/ActionTypes';

describe('NewsReducer', () => {
    it('should update current daily list with the new list', () => {
        const stateBefore = new Map({});
        const action = {
            type: UPDATE_CURRENT_DAILY_REPORT,
            current: { title: 'current title', description: 'current description' },
        };
        const actualState = newsReducer(stateBefore, action);
        const expectedState = new Map({
            current: {
                title: 'current title',
                description: 'current description',
            },
        });
        expect(expectedState).to.equal(actualState);
    });

    it('should update news list with the new list', () => {
        const stateBefore = new Map({});
        const action = {
            type: UPDATE_NEWS_LIST,
            articles: ['current title', 'current description'],
        };
        const expectedState = new Map({
            articles: ['current title', 'current description'],
        });
        const actualState = newsReducer(stateBefore, action);
        expect(expectedState).to.equal(actualState);
    });

    it('should return the same state when no news action type is given or news action type is wrong', () => {
        const stateBefore = new Map({});

        const action = {
            type: 'NON_EXISTING_TYPE',
        };
        const actualState = newsReducer(stateBefore, action);
        expect(actualState, stateBefore);
    });

    it('should fetch all articles ', () => {
        const state = {
            news: new Map({
                articles: ['article 1', 'article 2', 'article 3'],
            }),
        };
        const actualState = getArticles(state);
        const expectedState = ['article 1', 'article 2', 'article 3'];
        expect(expectedState).to.deep.equal(actualState);
    });

    it('should be able to fetch an article by index', () => {
        const state = {
            news: new Map({
                articles: ['article 1', 'article 2', 'article 3'],
            }),
        };
        const actualState = getArticle(state, 1);
        const expectedState = 'article 2';
        expect(expectedState).to.equal(actualState);
    });
});
