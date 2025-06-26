import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBrain,
  faCheckDouble,
  faCloudArrowUp,
  faFileLines,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <main id="main-content">
        <section
          id="hero-section"
          className="relative py-20 sm:py-24 lg:py-32"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center flex flex-col gap-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                AI-Powered
                Document
                <span className="text-[#0284c7]">
                  Processing
                </span>
              </h1>
              <p className="text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                Extract
                data
                from
                Document
              </p>

              <div className="mt-4 flex items-center justify-center gap-x-6">
                <Link
                  href={
                    "/uploadFile"
                  }
                  id="try-demo-btn"
                  className=" flex gap-2 items-center bg-[#0284c7] px-8 py-4 text-lg font-semibold text-white shadow-lg rounded-xl hover:bg-[#0369a1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0ea5e9] transition-all duration-200 transform hover:scale-105"
                >
                  <FontAwesomeIcon
                    icon={
                      faPlay
                    }
                    className="w-5 h-5 "
                  />
                  Try
                  Demo
                </Link>
                <Link
                  target="_blank"
                  href={
                    "https://github.com/saumay23/document-parser"
                  }
                  className="flex items-center text-lg font-semibold text-gray-900 hover:text-[#0284c7] transition-colors cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={
                      faGithub
                    }
                    className="w-5 h-5 mr-2"
                  />
                  View
                  on
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="py-16 bg-white/50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How
                It
                Works
              </h2>
              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                Three
                simple
                steps
                to
                transform
                your
                documents
                into
                structured
                data
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                id="step-1"
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#0ea5e9] to-[#0369a1] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon
                    icon={
                      faCloudArrowUp
                    }
                    className="w-5 h-5 text-white"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  1.
                  Upload
                  Document
                </h3>
                <p className="text-gray-600">
                  Drag
                  and
                  drop
                  or
                  browse
                  to
                  upload
                  your
                  PDF,
                  DOCX,
                  or
                  image
                  files.
                  Supports
                  multiple
                  formats
                  and
                  batch
                  processing.
                </p>
              </div>

              <div
                id="step-2"
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#0ea5e9] to-[#0369a1] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon
                    icon={
                      faBrain
                    }
                    className="w-5 h-5 text-white"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  2.
                  AI
                  Processing
                </h3>
                <p className="text-gray-600">
                  Our
                  AI
                  engine
                  extracts
                  key
                  data
                  points
                  including
                  dates,
                  amounts,
                  vendor
                  information,
                  and
                  line
                  items
                  with
                  high
                  accuracy.
                </p>
              </div>

              <div
                id="step-3"
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#0ea5e9] to-[#0369a1] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon
                    icon={
                      faCheckDouble
                    }
                    className="w-5 h-5 text-white"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  3.
                  Review
                  &
                  Export
                </h3>
                <p className="text-gray-600">
                  Review
                  extracted
                  data,
                  make
                  edits
                  if
                  needed,
                  and
                  export
                  to
                  your
                  preferred
                  format
                  or
                  integrate
                  with
                  your
                  existing
                  systems.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer
        id="footer"
        className="bg-white border-t border-gray-200"
      >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0ea5e9] to-[#0369a1] rounded-lg flex items-center justify-center mr-3">
                <FontAwesomeIcon
                  icon={
                    faFileLines
                  }
                  className="w-5 h-5 text-white"
                />
              </div>
              <span className="text-xl font-bold text-gray-900">
                DocProcessor
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-sm text-gray-600">
                Built
                by{" "}
                <span className="font-medium text-gray-900">
                  Saumay
                  Killa
                </span>
              </div>
              <Link
                target="_blank"
                href={
                  "https://www.linkedin.com/in/saumaykilla/"
                }
                className="text-gray-400 hover:text-[#0284c7] transition-colors cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={
                    faLinkedin
                  }
                  className="w-5 h-5 "
                />
              </Link>
              <Link
                target="_blank"
                href={
                  "https://github.com/saumay23"
                }
                className="text-gray-400 hover:text-[#0284c7] transition-colors cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={
                    faGithub
                  }
                  className="w-5 h-5 "
                />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
