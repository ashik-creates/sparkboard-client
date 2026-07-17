import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { AddIdeaForm } from "@/components/ideas/AddIdeaForm";

export default function AddIdeaPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-3xl px-6 py-20">
        <div className="mb-10 space-y-3">
          <p className="text-[10px] uppercase tracking-[0.25em] text-accent">
            New Spark
          </p>

          <h1 className="font-heading text-4xl font-bold uppercase text-primary">
            Create Your Startup Idea
          </h1>

          <p className="max-w-xl text-secondary">
            Describe your startup idea and let SparkBoard help you validate,
            improve and explore its potential.
          </p>
        </div>

        <AddIdeaForm />
      </main>

      <Footer />
    </>
  );
}