import { useState } from "react";
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi";

const JobDetails = () => {
  const [editMode, setEditMode] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);

  const job = {
    title: "DISEÑADOR WEB (64035)",
    link: "https://www.empleosit.com.ar/display-job/64035/Dise%C3%B1ador-WEB.html",
    description:
      "Responsabilidades:\n-Construcción de sistemas eficientes y reutilizables en HTML y CSS + JS.\n-Trabajar con el equipo para la generación de nuevas Apps.\n-Identificar y comunicar mejores prácticas para la ingeniería front-end.\n-Diseño y revisión de código/",
    status: "rejected",
    date: "3/8/2022",
    company: "CyS",
    requirements:
      "-Tecnologías web abiertas HTML, CSS, JQUERY, JS. -Frameworks, Adobe XD, HTML 5 y CSS + JQuery y JScript, Drupal. GitHub\n-WAI-ARIA, y React (no excluyente).\n-Herramientas colaborativas (Mural, Miro, Drive).\n-Diseño centrado en las personas, WAI-ARIA y accesibilidad.",
    extra:
      "Beneficios\n-Revisión del sueldo\n-Canasta saludable\n-Descuentos en capacitaciones de la UTN\n-Horario: Lunes a Viernes de 9 a 17 o 10 a 18hs.\n-Trabajo en oficina 1 día en Parque Patricios y 4 remotos",
  };

  const checkValidLink = () => {
    const linkElement = document.querySelector("#editJobLink")?.textContent!;

    const pattern =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

    return pattern.test(linkElement);
  };

  const handleUpdate = () => {
    if (checkValidLink()) {
      console.log({
        title: document.querySelector("#editJobTitle")?.textContent,
        link: document.querySelector("#editJobLink")?.textContent,
        description: (
          document.querySelector("#editJobDescription") as HTMLElement
        ).innerText,
        status: (document.querySelector("#editJobStatus") as HTMLInputElement)
          .value,
        company: document.querySelector("#editJobCompany")?.textContent,
        requirements: (
          document.querySelector("#editJobRequirements") as HTMLElement
        ).innerText,
        extra:
          (document.querySelector("#editJobExtra") as HTMLElement).innerText ||
          null,
      });
      setEditMode((current) => !current);
      setInvalidLink(false);
    } else {
      setInvalidLink(true);
    }
  };

  const editable =
    "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";

  const nonEditable =
    "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";

  return (
    <div className="p-8 grid place-content-center items-center h-full">
      {editMode ? (
        <>
          <h3
            id="editJobTitle"
            contentEditable={editMode}
            className="text-center pb-4 border-0 border-b-2 border-gray-300"
          >
            {job.title}
          </h3>
          <small
            contentEditable={editMode}
            id="editJobLink"
            className="text-blue-600 border-0 border-b-2 border-gray-300"
          >
            {job.link}
          </small>
          <BiLinkExternal />
          {invalidLink && (
            <small className="text-red-600">Please insert a valid link</small>
          )}
        </>
      ) : (
        <a
          href={job.link}
          className="flex items-center text-3xl uppercase gap-2"
        >
          <h3 contentEditable={editMode} className="text-center">
            {job.title}
          </h3>
          <BiLinkExternal size={14} />
        </a>
      )}
      <div className="flex justify-between">
        <small className="text-gray-600 uppercase">
          by{" "}
          <span
            id="editJobCompany"
            contentEditable={editMode}
            className={editMode ? "border-0 border-b-2 border-gray-300" : ""}
          >
            {job.company}
          </span>
        </small>
        <small className="text-gray-500">Added: {job.date}</small>
      </div>
      {editMode ? (
        <select
          id="editJobStatus"
          className={`bg-transparent text-xs italic w-fit`}
        >
          <option value="success">Success</option>
          <option value="rejected">Rejected</option>
          <option value="processing">Processing</option>
          <option value="applied">Applied</option>
          <option value="later">Save for later</option>
        </select>
      ) : (
        <small className={`${job.status} pb-3`}>{job.status}</small>
      )}
      <hr />
      <div className="relative z-0 w-full">
        <p
          id="editJobDescription"
          contentEditable={editMode}
          className={`${
            editMode ? editable : nonEditable
          } pb-8 whitespace-pre-line`}
        >
          {job.description}
        </p>
      </div>
      <div className="relative z-0 w-full">
        <h4 className="text-xl uppercase underline">Requirements</h4>
        <p
          id="editJobRequirements"
          contentEditable={editMode}
          className={`${
            editMode ? editable : nonEditable
          } pb-8 whitespace-pre-line`}
        >
          {job.requirements}
        </p>
        {job.extra && (
          <>
            <h4 className="text-xl uppercase underline">Extras</h4>
            <p
              id="editJobExtra"
              contentEditable={editMode}
              className={`${
                editMode ? editable : nonEditable
              } whitespace-pre-line`}
            >
              {job.extra}
            </p>
          </>
        )}
      </div>
      <div className="flex justify-between py-8">
        {editMode ? (
          <button
            onClick={() => handleUpdate()}
            className="flex w-fit items-center gap-2 hover:gap-3 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg focus:ring-4 hover:bg-green-800 bg-green-900 focus:ring-green-800"
          >
            Done <AiOutlineCheck />
          </button>
        ) : (
          <button
            onClick={() => setEditMode((current) => !current)}
            className="flex w-fit items-center gap-2 hover:gap-3 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg focus:ring-4 hover:bg-blue-800 bg-blue-900 focus:ring-blue-800"
          >
            Edit <AiFillEdit />
          </button>
        )}
        <button className="flex w-fit items-center gap-2 hover:gap-3 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg hover:bg-red-800 focus:ring-4 bg-red-900 focus:ring-red-800">
          Delete <HiOutlineTrash />
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
