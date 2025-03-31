import { IoIosArrowRoundForward, IoIosStarOutline } from "react-icons/io";
import { IRepo } from "../types/user";

function RepoItem({ repo }: { repo: IRepo }) {
  return (
    <div
      key={repo.id}
      className="border-1 border-gray-100 rounded-2xl w-full p-4 flex flex-col justify-between gap-4 h-full"
    >
      <div className="font-bold flex items-center justify-between">
        <p className="text-primary">{repo.name}</p>
        <p className="flex items-center gap-1">
          <IoIosStarOutline size={16} />
          {repo.stargazers_count}
        </p>
      </div>
      <p className="text-sm text-gray-500">{repo.description}</p>
      <div className="font-bold flex items-center justify-between">
        <p className="flex items-center gap-1 text-sm">
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
  );
}

export default RepoItem;
