"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";


function PromptCardList({data, handleTagClick}) {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map(post=>(
                <PromptCard
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

export default function Feed(){
    const [allPosts, setAllPosts] = useState([]);

    // Search states
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    async function fetchPosts() {
        const response = await fetch("/api/prompt")
        const data = await response.json()
        setAllPosts(data);
    }
    function handleSearchChange(e) {
        clearTimeout(searchTimeout)
        setSearchText(e.target.value)
        setSearchTimeout(
            setTimeout(()=>{
                const searchResult = filterPrompts(e.target.value)
                setSearchedResults(searchResult)
            }, 500)
        )
    }

    function filterPrompts(searchText) {
        const regex = new RegExp(searchText, "i");
        return allPosts.filter(
            item =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)

        )
    }

    function handleTagClick(tagName) {
        setSearchText(tagName)
        const searchResult = filterPrompts(tagName)
        setSearchedResults(searchResult)
    }
    useEffect(()=>{
        fetchPosts();
    }, [])

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input type="text" placeholder='Search for a tag or a username'
                value={searchText}
                onChange={handleSearchChange}
                required
                className='search_input peer'/>
            </form>

            {searchText ? (
                <PromptCardList data={searchedResults} handleTagClick={handleTagClick}/>
            ) : (
                <PromptCardList data={allPosts} handleTagClick={handleTagClick}/>
            )}
        </section>
        )
    }
