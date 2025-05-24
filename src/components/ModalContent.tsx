import { Expertise } from "@/types";

interface ModalContentProps {
  expertise: Expertise;
}

const ModalContent: React.FC<ModalContentProps> = ({ expertise }) => {
  if (!expertise.detailedInfo) {
    return <p className="text-gray-600 dark:text-gray-400">{expertise.description}</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          Technologies
        </h4>
        <div className="flex flex-wrap gap-2">
          {expertise.detailedInfo.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          Key Skills
        </h4>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
          {expertise.detailedInfo.keySkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          Notable Projects
        </h4>
        <div className="space-y-4">
          {expertise.detailedInfo.projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"
            >
              <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                {project.name}
              </h5>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalContent; 