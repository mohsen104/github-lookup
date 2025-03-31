"use client";
import { FormEvent, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IRepo, IUser } from "../types/user";
import { toast } from "react-toastify";

function SearchBar({ setData }: { setData: (data: IUser) => void }) {
  const [username, setUsername] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);

  const notifyWarning = (content: string) => toast.warn(content);
  const notifyError = (content: string) => toast.error(content);

  const fetchUser = async (username: string) => {
    if (!username.trim()) {
      notifyWarning("Please enter a username.");
      return;
    }

    try {
      setUsername("");
      setIsPending(true);

      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (!userResponse.ok && userResponse.status === 404) {
        setIsPending(false);
        notifyError("User not found.");
        return;
      }

      const [reposResponse, colorsResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}/repos`),
        fetch(
          `https://raw.githubusercontent.com/ozh/github-colors/master/colors.json`
        ),
      ]);

      const [userData, reposData, colorsData] = await Promise.all([
        userResponse.json(),
        reposResponse.json(),
        colorsResponse.json(),
      ]);

      const user: IUser = {
        login: userData.login,
        name: userData.name,
        bio: userData.bio,
        avatar_url: userData.avatar_url,
        html_url: userData.html_url,
        public_repos: userData.public_repos,
        languages: reposData.map((repo: IRepo) => repo.language),
        followers: userData.followers,
        repos: reposData
          .map((repo: IRepo) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            stargazers_count: repo.stargazers_count,
            language: repo.language || "Unknown",
            languageColor: colorsData[repo.language]?.color || "#F5F5F5",
            html_url: repo.html_url,
          }))
          .sort(
            (a: IRepo, b: IRepo) => b.stargazers_count - a.stargazers_count
          ),
      };

      setData(user);
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
      notifyError("An error occurred while fetching user data.");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchUser(username);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto max-w-xl">
      <div className="w-full px-4 py-3 flex items-center justify-center">
        <div className="bg-secondary w-full flex items-center pl-4 rounded-xl overflow-hidden">
          <IoIosSearch size={24} className="text-gray-500" />
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="Enter a Github username"
            className="focus:outline-0 w-full placeholder:text-gray-500 py-3 pl-2"
            maxLength={40}
          />
        </div>
      </div>
      <div className="w-full px-4 py-3 flex items-center justify-center">
        <button
          disabled={isPending}
          type="submit"
          className="font-bold text-lg text-white bg-primary rounded-full w-full py-2.5 cursor-pointer disabled:opacity-70"
        >
          {isPending ? (
            <div className="mx-auto size-7 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Search"
          )}
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
