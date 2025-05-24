import { Experience as ExperienceType } from "@/types";
import { getTechIcon } from "@/utils/techIcons";

interface TableViewProps {
  experiences: ExperienceType[];
}

export const TableView: React.FC<TableViewProps> = ({ experiences }) => {
  if (experiences.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        <div className="flex flex-col bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg items-center">
          <p className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white mb-4">
            No experiences to showcase yet!
          </p>
          <p className="text-gray-700 dark:text-gray-300 max-w-md">
            Stay tuned as I continue to grow my professional journey.
            Exciting updates will be added here soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="p-4 text-left">Position</th>
            <th className="p-4 text-left">Company</th>
            <th className="p-4 text-left">Duration</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-left">Technologies</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((exp) => (
            <tr
              key={exp.id}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              <td className="p-4 font-semibold">{exp.position}</td>
              <td className="p-4">{exp.company}</td>
              <td className="p-4">{exp.duration}</td>
              <td className="p-4">{exp.location}</td>
              <td className="p-4">
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full flex items-center"
                    >
                      <span className="mr-1.5">{getTechIcon(tech)}</span>
                      {tech}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 