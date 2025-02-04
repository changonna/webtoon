import { createSlice } from '@reduxjs/toolkit';
import { fetchWebtoonList, fetchSearchList } from './webtoonActions';
import { RootState } from '@/features/store';
import { webtoonInfo, webtoons, webtoonState } from '@/types';

const initialWebtoonInfo: webtoonInfo = {
    totalWebtoonCount: 0,
    naverWebtoonCount: 0,
    kakaoWebtoonCount: 0,
    kakaoPageWebtoonCount: 0,
    updatedWebtoonCount: 0,
    createdWebtoonCount: 0,
    lastUpdate: null,
    webtoons: [],
};

const initialState: webtoonState = {
    service: ['naver', 'kakao', 'kakaoPage'],
    weeks: [
        { key: 'mon', value: '월' },
        { key: 'tue', value: '화' },
        { key: 'wed', value: '수' },
        { key: 'thu', value: '목' },
        { key: 'fri', value: '금' },
        { key: 'sat', value: '토' },
        { key: 'sun', value: '일' },
    ],
    weekWebtoon: initialWebtoonInfo,
    allWebtoons: [],
    naverWebtoons: [],
    kakaoWebtoons: [],
    kakaoPageWebtoons: [],
    error: '',
    searchParam: {
        page: 1,
        perPage: 50,
        service: 'naver',
        updateDay: 'mon',
    },
    loading: false,
    searchService: 'ALL',
};

/**
 * 웹툰 slice
 */
const webtoonSlice = createSlice({
    name: 'webtoon',
    initialState,
    reducers: {
        /**
         * searchParam 설정
         * @param state
         * @param action
         */
        setsearchParam: (state, action) => {
            state.searchParam = action.payload;
        },
        /**
         * searchParam 서비스 설정
         * @param state
         * @param action
         */
        setSearchParamService: (state, action) => {
            state.searchParam.service = action.payload;
        },
        /**
         * searchParam 요일 설정
         * @param state
         * @param action
         */
        setSearchParamUpdateDay: (state, action) => {
            state.searchParam.updateDay = action.payload;
        },
        /**
         * searchParam 다음 페이지 설정
         * @param state
         */
        setPage: (state, action) => {
            state.searchParam.page = action.payload;
        },
        /**
         * searchParam 다음 페이지 설정
         * @param state
         */
        setNextPage: (state) => {
            state.searchParam.page += 1;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setsearchService: (state, action) => {
            state.searchService = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWebtoonList.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWebtoonList.fulfilled, (state, action) => {
                if (state.searchParam.page > 1) {
                    state.weekWebtoon = { ...state.weekWebtoon, ...action.payload };
                } else {
                    state.weekWebtoon = action.payload;
                }
                state.loading = false;
            })
            .addCase(fetchWebtoonList.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchSearchList.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSearchList.fulfilled, (state, action) => {
                let all = action.payload.webtoons;
                let naver: webtoons[] = [];
                let kakao: webtoons[] = [];
                let kakaoPage: webtoons[] = [];

                all.forEach((webtoon: webtoons) => {
                    if (webtoon.service === 'naver') {
                        naver.push(webtoon);
                    } else if (webtoon.service === 'kakao') {
                        kakao.push(webtoon);
                    } else if (webtoon.service === 'kakaoPage') {
                        kakaoPage.push(webtoon);
                    }
                });

                state.allWebtoons = all;
                state.naverWebtoons = naver;
                state.kakaoWebtoons = kakao;
                state.kakaoPageWebtoons = kakaoPage;
                state.loading = false;
            })
            .addCase(fetchSearchList.rejected, (state) => {
                state.loading = false;
            });
    },
});

/**
 * 웹툰 목록
 * @param state
 * @returns
 */
export const weekWebtoon = (state: RootState) => state.webtoon.weekWebtoon;

/**
 * 검색 목록
 * @param state
 * @returns
 */
export const allWebtoons = (state: RootState) => state.webtoon.allWebtoons;

/**
 * 검색 목록
 * @param state
 * @returns
 */
export const naverWebtoons = (state: RootState) => state.webtoon.naverWebtoons;

/**
 * 검색 목록
 * @param state
 * @returns
 */
export const kakaoWebtoons = (state: RootState) => state.webtoon.kakaoWebtoons;

/**
 * 검색 목록
 * @param state
 * @returns
 */
export const kakaoPageWebtoons = (state: RootState) => state.webtoon.kakaoPageWebtoons;

/**
 * 요일 목록
 * @param state
 * @returns
 */
export const weeks = (state: RootState) => state.webtoon.weeks;

/**
 * 서비스 목록
 * @param state
 * @returns
 */
export const serviceList = (state: RootState) => state.webtoon.service;

/**
 * 검색 파라미터 목록
 * @param state
 * @returns
 */
export const searchParam = (state: RootState) => state.webtoon.searchParam;

export const loading = (state: RootState) => state.webtoon.loading;

export const searchService = (state: RootState) => state.webtoon.searchService;

export const webtoonActions = webtoonSlice.actions;

export default webtoonSlice.reducer;
