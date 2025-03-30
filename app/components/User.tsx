import { IoGitBranchOutline } from "react-icons/io5";
import { IUser } from "../types/user";
import { MdGroups } from "react-icons/md";
import { IoIosArrowRoundForward, IoIosStarOutline, IoLogoGithub } from "react-icons/io";

function User({ user }: { user: IUser | null }) {
  return (
    <div className="w-full px-4 py-3">
      <div className="flex flex-col items-center justify-center text-center">
        <img
          src={user?.avatar_url}
          alt={user?.name}
          className="size-40 rounded-full"
        />
        <h2 className="text-xl font-bold pt-4">{user?.name}</h2>
        <h3 className="text-gray-500">@{user?.login}</h3>
        <p className="text-sm text-gray-500 py-2">{user?.bio}</p>
        <div className="flex items-center justify-center gap-5 text-gray-800 text-sm font-bold">
          <p className="flex items-center gap-1">
            <MdGroups size={20} />
            {user?.followers} followers
          </p>
          <p className="flex items-center gap-1">
            <IoGitBranchOutline size={16} /> {user?.public_repos} repositories
          </p>
        </div>
        <a
          href={user?.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded-md bg-black px-3 py-2 text-white mt-5"
        >
          <IoLogoGithub size={24} className="text-white" />
          View Profile
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8 container mx-auto">
        {user?.repos.map((repo) => (
          <div
            className="border-1 border-gray-100 rounded-2xl w-full p-4 flex flex-col justify-between gap-4 h-full"
            key={repo.id}
          >
            <div className="font-bold flex items-center justify-between">
              <p>{repo.name}</p>
              <p className="flex items-center gap-1">
                <IoIosStarOutline size={16} />
                {repo.stargazers_count}
              </p>
            </div>
            <p className="text-sm text-gray-500">{repo.description}</p>
            <div className="font-bold flex items-center justify-between">
              <p className="flex items-center gap-1">
                <span
                  style={{ backgroundColor: repo.languageColor }}
                  className="size-4 rounded-full"
                ></span>
                {repo.language}
              </p>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                <IoIosArrowRoundForward size={24} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
