import React from "react";
import { Expertise } from "@/types";

interface ModalContentProps {
  expertise: Expertise;
}

const ModalContent: React.FC<ModalContentProps> = ({ expertise }) => {
  if (!expertise) {
    return (
      <div className="p-6">
        <p className="text-gray-500 dark:text-gray-400">
          No expertise information available.
        </p>
      </div>
    );
  }

  if (!expertise.detailedInfo) {
    return (
      <div className="p-6">
        <p className="text-gray-700 dark:text-gray-300">
          {expertise.description}
        </p>
      </div>
    );
  }

  const { detailedInfo } = expertise;

  return (
    <div className="p-6 space-y-6">
      {/* Main Description */}
      <div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {expertise.description}
        </p>
      </div>

      {/* Technologies */}
      {detailedInfo.technologies.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {detailedInfo.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Key Skills */}
      {detailedInfo.keySkills.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Key Skills
          </h4>
          <ul className="space-y-2">
            {detailedInfo.keySkills.map((skill, index) => (
              <li
                key={index}
                className="flex items-center text-gray-700 dark:text-gray-300"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Notable Projects */}
      {detailedInfo.projects.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Notable Projects
          </h4>
          <div className="space-y-3">
            {detailedInfo.projects.map((project, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                  {project.name}
                </h5>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalContent;