import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBolt,
  faBullseye,
  faChartLine,
  faLayerGroup,
  faLightbulb,
  faLineChart,
  faMagnifyingGlassChart,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <header
        id="header"
        className="bg-white border-b border-gray-200 py-4 px-6"
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
              <FontAwesomeIcon
                icon={
                  faLineChart
                }
                className="w-5 h-5 text-white"
              />
            </div>
            <span className="font-semibold text-gray-800 text-lg ml-2">
              SegmentSight
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href={
                "/auth/login"
              }
            >
              <span className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors cursor-pointer">
                Get
                Started
              </span>
            </Link>
          </div>
        </div>
      </header>

      <section
        id="hero"
        className="bg-gradient-to-r from-primary-50 to-blue-50 py-16 px-6"
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center md:items-stretch">
          <div className="md:w-1/2 mb-10 md:mb-0 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              AI-Powered
              SWOT
              Analysis
              for
              Strategic
              Decisions
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              SegmentSight
              helps
              product
              teams
              generate
              strategic
              insights
              for
              specific
              customer
              segments
              with
              AI-powered
              SWOT
              analysis
              and
              actionable
              recommendations.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href={
                  "/auth/login"
                }
              >
                <span className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-md text-center font-medium transition-colors cursor-pointer">
                  Get
                  Started
                  Free
                </span>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <Image
              src="/heroSection.png"
              alt="modern dashboard UI with SWOT analysis charts and AI insights, professional business analytics interface, clean design"
              fill
              className="object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      <section
        id="features"
        className="py-16 px-6 bg-white"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful
              Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              SegmentSight
              provides
              everything
              you
              need
              to
              make
              data-driven
              strategic
              decisions
              for
              your
              products
              and
              customer
              segments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              id="feature-1"
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <FontAwesomeIcon
                  icon={
                    faBolt
                  }
                  className="text-primary-600 w-6 h-6"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                AI-Powered
                Analysis
              </h3>
              <p className="text-gray-600">
                Our
                advanced
                AI
                analyzes
                market
                data
                to
                generate
                comprehensive
                SWOT
                insights
                tailored
                to
                your
                specific
                customer
                segments.
              </p>
            </div>

            <div
              id="feature-2"
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <FontAwesomeIcon
                  icon={
                    faBullseye
                  }
                  className="text-primary-600 w-6 h-6"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Segment
                Targeting
              </h3>
              <p className="text-gray-600">
                Generate
                insights
                for
                specific
                customer
                segments
                to
                understand
                their
                unique
                needs,
                pain
                points,
                and
                opportunities.
              </p>
            </div>

            <div
              id="feature-3"
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <FontAwesomeIcon
                  icon={
                    faLayerGroup
                  }
                  className="text-primary-600 w-6 h-6"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Comprehensive
                Reports
              </h3>
              <p className="text-gray-600">
                Get
                detailed
                reports
                covering
                SWOT
                analysis,
                marketing
                OKRs,
                market
                positioning,
                buyer
                personas,
                and
                more.
              </p>
            </div>

            <div
              id="feature-4"
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <FontAwesomeIcon
                  icon={
                    faChartLine
                  }
                  className="text-primary-600 w-6 h-6"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Competitive
                Analysis
              </h3>
              <p className="text-gray-600">
                Understand
                your
                position
                in
                the
                market
                and
                identify
                opportunities
                to
                differentiate
                from
                competitors.
              </p>
            </div>

            <div
              id="feature-5"
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <FontAwesomeIcon
                  icon={
                    faMagnifyingGlassChart
                  }
                  className="text-primary-600 w-6 h-6"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Comparison
                Tools
              </h3>
              <p className="text-gray-600">
                Compare
                insights
                across
                different
                segments,
                products,
                or
                time
                periods
                to
                identify
                trends
                and
                make
                better
                decisions.
              </p>
            </div>

            <div
              id="feature-6"
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <FontAwesomeIcon
                  icon={
                    faLightbulb
                  }
                  className="text-primary-600 w-6 h-6"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Strategic
                Recommendations
              </h3>
              <p className="text-gray-600">
                Get
                actionable
                recommendations
                to
                improve
                your
                product
                strategy
                based
                on
                AI-generated
                insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="py-16 px-6 bg-gray-50"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How
              It
              Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              SegmentSight
              makes
              it
              easy
              to
              generate
              strategic
              insights
              in
              just
              a
              few
              simple
              steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div
              id="step-1"
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Select
                Your
                Product
              </h3>
              <p className="text-gray-600">
                Choose
                the
                product
                or
                service
                you
                want
                to
                analyze
                from
                your
                dashboard.
              </p>
            </div>

            <div
              id="step-2"
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Define
                Your
                Segment
              </h3>
              <p className="text-gray-600">
                Specify
                the
                customer
                segment
                and
                business
                objective
                you
                want
                to
                focus
                on.
              </p>
            </div>

            <div
              id="step-3"
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Get
                Insights
              </h3>
              <p className="text-gray-600">
                Our
                AI
                generates
                comprehensive
                insights
                and
                recommendations
                for
                your
                specific
                needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="cta"
        className="py-16 px-6 bg-primary-600 text-white"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready
            to
            Transform
            Your
            Product
            Strategy?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join
            thousands
            of
            product
            managers
            using
            SegmentSight
            to
            make
            data-driven
            decisions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href={
                "/auth/login"
              }
            >
              <span className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-md text-center font-medium transition-colors cursor-pointer">
                Get
                Started
                Free
              </span>
            </Link>
          </div>
        </div>
      </section>
      <footer
        id="footer"
        className="bg-white border-t border-gray-200"
      >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
                <FontAwesomeIcon
                  icon={
                    faLineChart
                  }
                  className="w-5 h-5 text-white"
                />
              </div>
              <span className="text-xl font-bold text-gray-900">
                SegmentSight
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
                className="text-gray-400 hover:text-primary-600 transition-colors cursor-pointer"
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
                className="text-gray-400 hover:text-primary-600 transition-colors cursor-pointer"
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
