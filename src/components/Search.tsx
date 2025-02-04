import React, { useState } from 'react';
import { fetchSearchList } from '@/features/webtoon/webtoonActions';
import { useAppDispatch } from '@/features/hooks';
import { getSearchWebtoonInfoParam } from '@/types';

/**
 * 웹툰 검색 컴포넌트
 * @returns
 */
export function Search() {
    /**
     * 입력값
     */
    const [param, setParam] = useState<getSearchWebtoonInfoParam>({ keyword: '' });
    const dispatch = useAppDispatch();
    /**
     * set 파라미터
     * @param e
     */
    const setKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParam({
            keyword: e.target.value,
        });
    };

    /**
     * 웹툰 검색
     */
    const search = () => {
        dispatch(fetchSearchList(param));
    };

    const handleEnter = (e: any) => {
        if (e.key === 'Enter') {
            search();
        }
    };

    return (
        <div className="browse-banner bg-zinc-700/50 rounded-lg">
            <div id="body" className="relative items-center text-center flex mx-auto justify-center">
                <div className="flex flex-col mt-16">
                    <h1 className="text-white text-2xl font-semibold">Find the webtoons you're looking for!</h1>
                    <div className=" flex space-x-2 mt-3.5  text-center items-center mx-auto bg-zinc-900/90 border border-zinc-700/20 px-4 rounded-lg">
                        <div className="absolute justify-center space-x-4 mr-4">
                            <button
                                onClick={() => {
                                    search();
                                }}
                            >
                                oo
                            </button>
                            <i className="fa-solid fa-search text-[17px] mt-1"></i>
                        </div>
                        <input
                            className="bg-zinc-700/20 navbar-input px-6 border !w-[18rem] lg:!w-[32rem] border-zinc-700/10"
                            placeholder="Search Webtoon"
                            onChange={setKeyword}
                            onKeyDown={handleEnter}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
