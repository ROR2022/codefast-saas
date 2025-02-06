import ButtonLink from "@/components/ButtonLink";

export default function Home() {
  return (
    <main>
      <section className="bg-base-200">
        <div className="flex justify-between items-center py-2 px-8 max-w-3xl mx-auto">
          <div>CodeFastSaaS</div>
          <div className="space-x-4 max-md:hidden">
            <a className="link link-hover">Pricing</a>
            <a className="link link-hover">FAQ</a>
          </div>
          <div>
            <ButtonLink linkTo="dashboard" />
          </div>
        </div>
      </section>
      <section className="text-center py-32 px-8 max-w-3xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">
          Collect customer feedback to build better products
        </h1>
        <div className="opacity-80 mb-16">
          Create a feedback board in minutes, prioritize features, and buil
          products your customers will love.
        </div>
        <ButtonLink linkTo="dashboard" />
      </section>
    </main>
  );
}
